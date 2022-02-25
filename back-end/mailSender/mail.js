const mailer = require("nodemailer");
const { Confirmation } = require("./confirmation_template.js");

const getEmailData = (to, name, template) => {
    let data = null;

    switch (template) {
        case "confirmation":
            data = {
                from: "canhvtn@gmail.com",
                to,
                subject: `Confirmation Email`,
                html: Confirmation(Charles,"google.com")
            }
            break;
        default:
            data;
    }
    return data;
}


const sendEmail = (to, name, type) => {

    const smtpTransport = mailer.createTransport({
        service: "Gmail",
        auth: {
            user: "canhvtn@gmail.com",
            pass: "canh123456"
        }
    })

    const mail = getEmailData(to, name, type)

    smtpTransport.sendMail(mail, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log( " email sent successfully")
        }
        smtpTransport.close();
    })


}

module.exports = { sendEmail }