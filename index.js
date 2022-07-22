require('dotenv').config()

global.config = require('./config.js').config;
global.fs = require('fs')
global.path = require('path')
global.utils = require('./src/utils.js')

const verification = require('./src/verification.js').verification;
const request = require('./src/request.js').request;

const alerts = {}
alerts.gmail = require('./src/alerts/gmail.js').gmail;
alerts.discord = require('./src/alerts/discord.js').discord;

async function start() {
    return (new Promise(async (resolve, reject) => {
        try {
            global.config = require('./config.js').config;
            const errors = []
            await verification()
            for (const i of JSON.parse(fs.readFileSync(path.resolve(config.pathUrlsListFile), "utf-8"))) {
                await request(i).catch((message) => {
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
            await utils.wait(config.delaySession * 1000)
            start()
        } catch (e) {
            console.log('Error in function', arguments.callee.name, e)
        }
    }))
}

start()