const nodemailer = require("nodemailer");

async function gmail(dest, content) {
    return (new Promise(async (resolve, reject) => {
        try {
            console.log("waow")
            /*
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env, // generated ethereal user
                    pass: process.env, // generated ethereal password
                },
            });
            
            exports.wait = waitawait transporter.sendMail({
                from: process.env, // sender address
                to: dest, // list of receivers
                subject: "" + content, // Subject line
                text: content, // plain text body
                html: content, // html body
            });
            */
            resolve()
        } catch (e) {
            console.log('Error in function', arguments.callee.name, e)
            resolve()
        }
    }))
}
exports.gmail = gmail