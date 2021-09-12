var crmclient = require('zcrmsdk');
const { Firestore } = require('@google-cloud/firestore');
let db = new Firestore();
let refresh = null;
var configJson = {
    "client_id": "1000.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "client_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "redirect_url": "https://yourredirecturl.com",
    "user_identifier": "your@user_identifier.com",
    "mysql_username": "",
    "mysql_password": "",
    "base_url": "www.zohoapis.com",
    "iamurl": "accounts.zoho.com",
    "version": "",
    "tokenmanagement": "/workspace/oauth.js"
};

function get_tokens() {
    return new Promise((resolve, reject) => {
        let data_token = null;
        db.collection("zoho").doc("tokens").get().then(function (doc) {
            data_token = doc.data();
            resolve(data_token);
        })
    })
}

class Crm {
    static async send_prospect(name, last_name, phone) {
        let token = await get_tokens();
        crmclient.initialize(configJson).then(function () {
            crmclient.generateAuthTokenfromRefreshToken("your@user_identifier.com", token.refresh_token).then(function (auth_response) {
                console.log("access token :" + auth_response.access_token);
                console.log("refresh token :" + auth_response.refresh_token);
                console.log("expires in :" + auth_response.expires_in);
            });
        });
        let input = {};

        name = name.toLowerCase();
        let first_name = name.charAt(0).toUpperCase() + name.slice(1);
        last_name = last_name.toUpperCase();

        input.module = 'Leads';
        input.body = {
            "data": [
                {
                    "Last_Name": last_name,
                    "First_Name": first_name,
                    "Phone": phone,
                },
            ],
            "trigger": []
        };

        crmclient.API.MODULES.post(input).then(function (response) {
            response = JSON.parse(response.body);
            response = response.data;

            for (let record in response) {

                var info = response[record];
                console.log("Status: " + info.code + ", message : " + info.message);
            }
        });
    }
}
module.exports = Crm;