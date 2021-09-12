const { Firestore } = require('@google-cloud/firestore');
let db = new Firestore();
let tokenmanagement = {};

tokenmanagement.saveOAuthTokens = function (tokenobject) {
    return new Promise(function (resolve, reject) {
        let tokens = {}

        db.collection('zoho').doc('tokens').update({
            access_token: tokenobject.access_token,
            expires_in: tokenobject.expires_in,
            refresh_token: tokenobject.refresh_token,
        })
            // eslint-disable-next-line promise/always-return
            .then(function (docRef) {
                resolve()
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);

            })
    })
}

tokenmanagement.getOAuthTokens = function (user_identifier) {
    return new Promise(function (resolve, reject) {
        let tokens = {}

        // eslint-disable-next-line promise/always-return
        db.collection('zoho').doc('tokens').get().then((snapshot) => {
            let data = snapshot.data()
            tokens.access_token = data.access_token
            tokens.refresh_token = data.refresh_token
            tokens.expires_in = data.expires_in
            resolve(tokens)
        }).catch((err) => {
            console.log(err)
            resolve()
        })

    })
}

tokenmanagement.updateOAuthTokens = function (tokenobject) {
    return new Promise(function (resolve, reject) {

        db.collection('zoho').doc('tokens').update({
            access_token: tokenobject.access_token,
            expires_in: tokenobject.expires_in,
        })
            // eslint-disable-next-line promise/always-return
            .then(function (docRef) {
                resolve()
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);

            })
    })
}
module.exports = tokenmanagement;