const crm = require("./Crm");

    function send_prospect() {
        const person = "firstName lastName";
        const phone = "06xxxxxxxx";
        const name = person.split(' ').slice(0, -1).join(' ');
        const last_name = person.split(' ').slice(-1).join(' ');

        try {
            crm.send_prospect(name, last_name, phone);
            console.log("Prospect sended !");
        } catch (err) {
            console.log("Error: " + err);
        }
    }