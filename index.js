require('dotenv').config()

global.config = require('./config.js').config
global.fs = require('fs')
global.path = require('path')
global.utils = require('./src/utils.js')

const verification = require('./src/verification.js').verification
const request = require('./src/request.js').request

const alerts = {}
alerts.mail = require('./src/alerts/mail.js').mail
alerts.discord = require('./src/alerts/discord.js').discord

console.log("START URLS MONITOR\nhttps://github.com/bellottoeric/urls-monitor")

async function start() {
    return (new Promise(async (resolve, reject) => {
        try {
            global.config = require('./config.js').config
            const errors = []
            let numberOfErrors = 0

            await verification()

            for (const i of JSON.parse(fs.readFileSync(path.resolve(config.pathUrlsListFile), "utf-8"))) {
                await request(i).catch((message) => {
                    numberOfErrors++
                    for (const j of i.alert) {
                        if (!errors[j])
                            errors[j] = []
                        errors[j].push(i.axiosConfiguration.baseURL ? message + " --> " + i.axiosConfiguration.baseURL : message + " --> " + i.axiosConfiguration.URL)
                    }
                })
                await utils.wait(config.delayURL * 1000)
            }
            for (const i in errors) {
                console.log("Launch alert " + i + " for " + errors[i].length + " error(s).")
                alerts[i](errors[i].join('\n'))
            }
            console.log(utils.getDate() + " SESSION FINISHED! Find", numberOfErrors, "errors.\n")
            await utils.wait(config.delaySession * 1000)
            start()
        } catch (e) {
            console.log('Error in function', arguments.callee.name, e)
        }
    }))
}

start()