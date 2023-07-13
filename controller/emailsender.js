const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: process.env.USERNAME_SEND_EMAIL,
        pass: process.env.PASSWORD_EMAIL
    }
});

const emailsender = {
    async fnSendEmail(req, res) {
        try {
            const message = {
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: 'pair.supit001@gmail.com', // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
            }
            const info = await transporter.sendMail(message);  
            res.send('Send mail success please check your email')
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }
}


module.exports = emailsender