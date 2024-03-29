package captcha

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/kataras/hcaptcha"
)

type token struct {
	TokenStr string `json:"token"`
}

func Captcha(w http.ResponseWriter, r *http.Request) {

	var challengeToken token

	err := godotenv.Load()
	if err != nil {
		log.Println("Error loading .env file")
		log.Println(err)
	}

	var (
		secretKey = os.Getenv("HCAPTCHA_SECRET")
		client    = hcaptcha.New(secretKey)
	)

	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil {
		log.Fatal("Error parsing request body")
	}

	json.Unmarshal(reqBody, &challengeToken)

	verified := client.VerifyToken(challengeToken.TokenStr)

	if !verified.Success {

		log.Println(verified)

		w.WriteHeader(http.StatusUnauthorized)
		fmt.Fprint(w, "Are you a bot?")
		return
	}

	fmt.Fprint(w, "OK")

}
