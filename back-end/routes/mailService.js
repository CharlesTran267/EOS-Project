const router = require('express').Router();
const { sendEmail } = require('../mailSender/mail');


router.route('/sendMail').post((req, res) => {

    console.log(req.body)
    sendEmail(req.body.email, req.body.name, "confirmation")
    return res.json({success:true})
})