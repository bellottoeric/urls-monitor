const { config } = require("../config")

async function verification() {
    return (new Promise(async (resolve, reject) => {
        try {
            if ([undefined, null].some(el => [config, config.delayURL, config.delaySession, config.pathUrlsListFile].includes(el)))
                process.exit(console.log("CHECK FAILED! One of the configuration variables is not defined."))

            if ([config.delayURL, config.delaySession].filter(variable => typeof variable !== "number").length)
                process.exit(console.log("CHECK FAILED! One of the configuration variable types is not correctly defined. (INT)"))

            if ([config.pathUrlsListFile].filter(variable => typeof variable !== "string").length)
                process.exit(console.log("CHECK FAILED! One of the configuration variable types is not correctly defined. (STRING)"))


            if (!fs.existsSync(path.resolve(config.pathUrlsListFile)))
                process.exit(console.log("CHECK FAILED! Path to the urls list file is not valid."))

            const contentPathUrlsListFile = fs.readFileSync(path.resolve(config.pathUrlsListFile), "utf-8")
            try {
                JSON.parse(contentPathUrlsListFile)
            } catch (e) {
                console.log(e)
                process.exit(console.log("CHECK FAILED! Content of the path urls list is not a valid array of objects."))
            }


            if (config.discordBotToken && !config.discordAlertReceivers && !config.discordAlertChannels) {
                process.exit(console.log("CHECK FAILED! DIscord is configured but discordAlertReceivers variable and discordAlertChannels variable are not defined."))
            }

            if (config.gmailUsername && config.gmailPassword && (!config.gmailTo || !config.gmailTo.includes('@'))) {
                process.exit(console.log("CHECK FAILED! Gmail is configured but gmailTo variable is not correctly defined."))
            }

            console.log("\n" + utils.getDate() + " VERIFICATION COMPLETED! Start checking URLS...")
            resolve()
        } catch (e) {
            process.exit(console.log('Error in function', arguments.callee.name, e))
        }
    }))
}

exports.verification = verification