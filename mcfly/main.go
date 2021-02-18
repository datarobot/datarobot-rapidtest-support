package main

import (
	"bufio"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"

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

type Site struct {
	ID      string   `json:"id"`
	Name    string   `json:"name"`
	Enabled bool     `json:"enabled"`
	Contact string   `json:"contact"`
	Address *Address `json:"address,omitempty"`
}

type Account struct {
	ID             string `json:"id"`
	FirstName      string `json:"firstName"`
	LastName       string `json:"lastName"`
	Email          string `json:"email"`
	Phone          string `json:"phone"`
	RequestPending bool   `json:"requestPending"`
	Enabled        bool   `json:"enabled"`
	ApprovedBy     string `json:"approvedBy`
}

var allAccounts []Account
var allSchools []School
var allSites []Site

func homeLink(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
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
		if len(schoolList) > 9 {
			break
		}

		isMatch := fuzzy.MatchFold(newSchool.Name, school.Name)
		rankScore := fuzzy.RankMatchFold(newSchool.Name, school.Name) < 15

		if isMatch && rankScore {
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

func getSiteList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allSites)
}

func getAccountList(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allAccounts)
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
	schoolsCsv, err := os.Open("schools.csv")
	sitesCsv, err := os.Open("sites.csv")
	accountsCsv, err := os.Open("accounts.csv")

	if err != nil {
		panic(err)
	}

	defer schoolsCsv.Close()
	defer sitesCsv.Close()

	accounts, err := readSample(accountsCsv)
	schools, err := readSample(schoolsCsv)
	sites, err := readSample(sitesCsv)

	if err != nil {
		panic(err)
	}

	for _, account := range accounts {
		pending, _ := strconv.ParseBool(account[4])
		enabled, _ := strconv.ParseBool(account[5])

		allAccounts = append(allAccounts, Account{
			ID:             account[0],
			FirstName:      account[1],
			LastName:       account[1],
			Email:          account[2],
			Phone:          account[3],
			RequestPending: pending,
			Enabled:        enabled,
			ApprovedBy:     account[6],
		})
	}

	for _, site := range sites {
		enabled, _ := strconv.ParseBool(site[6])

		allSites = append(allSites, Site{
			ID:   site[0],
			Name: site[1],
			Address: &Address{
				Address: site[2],
				City:    site[3],
				State:   site[4],
				Zip:     site[5],
			},
			Enabled: enabled,
			Contact: site[7],
		})
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
	router.HandleFunc("/api/sites", getSiteList).Methods("GET")
	router.HandleFunc("/api/accounts", getAccountList).Methods("GET")
	log.Fatal(http.ListenAndServe(":1337", router))

}
