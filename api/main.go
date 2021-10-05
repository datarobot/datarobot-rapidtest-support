package main

import (
	"bufio"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"api/captcha"
	"net/http"
	"os"
	"strings"
	"github.com/gorilla/mux"
	"github.com/lithammer/fuzzysearch/fuzzy"
)

type School struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	Telephone string   `json:"phone"`
	County    string   `json:"county"`
	Latitude  string   `json:"lat"`
	Longitude string   `json:"lng"`
	Address   *Address `json:"address,omitempty"`
}

type Address struct {
	Address string `json:"address"`
	City    string `json:"city"`
	State   string `json:"state"`
	Zip     string `json:"zip"`
}

var allSchools []School

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func Contains(name string, matcher string) bool {
	return strings.Contains(strings.ToLower(matcher), strings.ToLower(name))
}

func getSchoolList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var schoolList []School
	var newSchool School
	var emptyList []string

	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		fmt.Fprintf(w, "Something went wrong")
	}

	json.Unmarshal(reqBody, &newSchool)

	for _, school := range allSchools {

		if len(schoolList) > 100 {
			break
		}

		isMatch := Contains(newSchool.Name, school.Name)

		if isMatch {
			schoolList = append(schoolList, school)
		}
	}

	w.WriteHeader(http.StatusOK)

	if len(schoolList) > 0 {
		json.NewEncoder(w).Encode(schoolList)
	} else {
		json.NewEncoder(w).Encode(emptyList)
	}
}

func getSchool(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	w.Header().Set("Content-Type", "application/json")

	for _, school := range allSchools {
		if fuzzy.MatchFold(vars["id"], school.ID) {
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(school)

			break
		}
	}
}

func readSample(rs io.ReadSeeker) ([][]string, error) {
	row1, err := bufio.NewReader(rs).ReadSlice('\n')
	if err != nil {
		return nil, err
	}
	_, err = rs.Seek(int64(len(row1)), io.SeekStart)
	if err != nil {
		return nil, err
	}

	r := csv.NewReader(rs)
	rows, err := r.ReadAll()
	if err != nil {
		return nil, err
	}
	return rows, nil
}

func setup() {
	isProd := os.Getenv("IS_PROD")
	var schoolsCsv *os.File
	var err error

	if isProd == "true" {
		schoolsCsv, err = os.Open("/api/schools.csv")
	} else {
		schoolsCsv, err = os.Open("schools.csv")
	}

	if err != nil {
		panic(err)
	}

	defer schoolsCsv.Close()

	schools, err := readSample(schoolsCsv)

	if err != nil {
		panic(err)
	}

	for _, school := range schools {
		allSchools = append(allSchools, School{
			ID:   school[0],
			Name: school[1],
			Address: &Address{
				Address: school[2],
				City:    school[3],
				State:   school[4],
				Zip:     school[5],
			},
			Telephone: school[6],
			County:    school[7],
			Latitude:  school[9],
			Longitude: school[10],
		})
	}

}

func main() {
	setup()

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homeLink)
	router.HandleFunc("/api/schools", getSchoolList).Methods("POST")
	router.HandleFunc("/api/schools/{id}", getSchool).Methods("GET")
	router.HandleFunc("/api/captcha", captcha.Captcha).Methods("POST")
	log.Fatal(http.ListenAndServe(":1337", router))

	fmt.Print("Api Service is listening on port 1337")

}
