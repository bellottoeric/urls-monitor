const nodemailer = require("nodemailer");

async function gmail(message) {
    return (new Promise(async (resolve, reject) => {
        try {
            message = message.replace(/\n/g, "<br>")
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: config.gmailUsername,
                    pass: config.gmailPassword,
                },
            });

            for (let i of config.gmailTo.split(',')) {
                if (i.length < 2)
                    continue
                await transporter.sendMail({
                    from: config.gmailUsername,
                    to: i,
                    subject: config.gmailSubject.replace('|NUMBEROFALERTS|', message.split('\n').length),
                    text: message,
                    html: message,
                });
            }
            console.log("Mail(s) correctly sent.")
            resolve()
        } catch (e) {
            console.log('Error in function', arguments.callee.name, e)
            resolve()
        }
    }))
}

exports.gmail = gmail