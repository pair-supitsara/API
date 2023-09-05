import { createTransport } from "nodemailer";

const transporter = createTransport({
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
        const { receiver, subject, mailmessage, html } = req.body
        try {
            const message = {
                from: '"API 👻"',
                to: receiver ,
                subject: subject, // 
                text: mailmessage, 
                html: html || "",
            }
            const info = await transporter.sendMail(message);  
            res.send('Send mail success please check your email')
        } catch(err) {
            console.log(err)
            res.send(err)
        }
    }
}


export default emailsender