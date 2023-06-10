package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/hex"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"math/big"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/sns"
	"github.com/ethereum/go-ethereum/params"
)

const (
	decryptionSecret = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCb7eZ8H97PnUS71+v/0Tipct/BSaWnOyF7JhnZYaNNv7vWq0AL
MF721ery3RL8j4SCFwvMtmiDzvfhPNirMw5ZtTj0j/hLSkdCpY1u/Imi+OKYRsWD
T1n8lizmKeOj3Iympe3yYaNRuQy/zgSmYckReX74gVONNW8pyLnFQW8TfQIDAQAB
AoGBAIAkV/+1qUPxOKUuYxHOfMQ0VVHhFjOCUpeDzkZpCO1CHjnibjVDwScU0YpY
x9uqjfjiu522YdnAYtFFUcIPqUAjWtM2ckJhJ9c5nlbLhRskv4nQ7CnDanVJqRdP
li4r5gusbAzWwNlMrvrp574Nw9w1PNKxdYjsSca5MXgOmEWBAkEAyVB2UBD9I53y
9bsVMxVr2fqsZWk87eZ5h8B72CDR4jFknjHTSuq5unzAhd/oKp2On5KGAT/bxkNs
VuVN9ppxrQJBAMZJVT38WURSDxozhiUT8KZeuw/2GJSYU8LTf7v4Rrx1cNjvjhUk
/II09w3zhMeaMflzo6XAAXhcPL3Gu5FKgxECQDaR5hBcGpJeDW8I8H0xcFPdPIAc
39RJJmZjCe8TLnGXHAQ502G6cPAZQwLHKCLtJK0ixcpu6f87ZZHEhLa1NN0CQBO8
WtKnmk71h/FIrZJlMK+ugBnvmbS4kKW0nWMdLBU37zp4ZYDvRH7FPM3TriSb0VuN
yf0GZl8PdzBAZozoiLECQFiypgSVy2HoxDTbdtd9/Vx0Ec8tnTI1gOy/S7f/9Uqi
RQsAweWz67PsAlX5Cddw4C1cyqkhrOUqSK7wyNDrcVM=
-----END RSA PRIVATE KEY-----`

	Success = "success"
	Error   = "error"
)

var (
	SenderNotProvided = errors.New("no sender provided")
	Unauthorized      = errors.New("unauthorized")
)

var (
	authSecret string
	//decryptionSecret string
	snsClient *sns.SNS
)

type ResponseMessage struct {
	Type    string `json:"type"`
	Message string `json:"message,omitempty"`
}

func init() {
	authSecret = os.Getenv("SECRET")
	//decryptionSecret = strings.ReplaceAll(os.Getenv("DECRYPTION_SECRET"), " ", "\n")

	snsClient = sns.New(session.Must(session.NewSession()))
}

func Failed(err error, status int) (events.APIGatewayProxyResponse, error) {
	errorMessage, _ := json.Marshal(ResponseMessage{
		Type:    Error,
		Message: err.Error(),
	})

	return events.APIGatewayProxyResponse{
		Headers: map[string]string{
			"Content-Type": "application/json",
		},
		StatusCode: status,
		Body:       string(errorMessage),
	}, nil
}

func Handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	if authSecret != "" {
		secret := request.Headers["x-nerifbridge-secret"]
		if secret != authSecret {
			return Failed(Unauthorized, http.StatusUnauthorized)
		}
	}

	phone, err := decryptPhone(request.Headers["x-nerifbridge-phone"])
	if err != nil {
		return Failed(err, http.StatusBadRequest)
	}

	amount := request.Headers["x-nerifbridge-amount"]
	if amount == "" {
		return Failed(SenderNotProvided, http.StatusBadRequest)
	}

	params := &sns.PublishInput{
		Message:     aws.String(fmt.Sprintf("Nerif Rechargex: your phone number has been topped up for %s USDT", weiToEther(amount))),
		PhoneNumber: aws.String(phone),
	}

	if _, err = snsClient.Publish(params); err != nil {
		return Failed(err, http.StatusInternalServerError)
	}

	successResponse, err := json.Marshal(ResponseMessage{
		Type: Success,
	})
	if err != nil {
		return Failed(err, http.StatusInternalServerError)
	}

	return events.APIGatewayProxyResponse{
		Body:       string(successResponse),
		StatusCode: http.StatusOK,
	}, nil
}

func decryptPhone(phone string) (string, error) {
	cipherText, err := hex.DecodeString(phone)
	if err != nil {
		return "", fmt.Errorf("failed to decode '%s': %w", phone, err)
	}

	originText, err := rsaDecrypt([]byte(decryptionSecret), cipherText)
	if err != nil {
		return "", err
	}

	return string(originText), nil
}

// rsaDecrypt is copied from https://segmentfault.com/q/1010000002505932
func rsaDecrypt(privateKey []byte, ciphertext []byte) ([]byte, error) {
	block, _ := pem.Decode(privateKey)
	if block == nil {
		return nil, errors.New("private key error!")
	}

	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}

	return rsa.DecryptPKCS1v15(rand.Reader, priv, ciphertext)
}

func weiToEther(weiRaw string) *big.Float {
	wei := new(big.Float)
	wei.SetString(weiRaw)

	return new(big.Float).Quo(wei, big.NewFloat(params.Ether))
}

func main() {
	lambda.Start(Handler)
}

/*func main() {
	fmt.Println(fmt.Sprintf("%x", []byte{1, 2, 3}))
	fmt.Println(fmt.Sprintf("%x", []string{"1", "2", "3"}))
	fmt.Println(fmt.Sprintf("%x", 2))
	fmt.Println(fmt.Sprintf("%x", big.NewInt(2)))
	fmt.Println(fmt.Sprintf("%x", "somestring"))
}
*/
