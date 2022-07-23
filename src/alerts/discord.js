const { Client, GatewayIntentBits } = require('discord.js')

async function discord(message) {
    return (new Promise(async (resolve, reject) => {
        try {
            const client = new Client({ intents: [GatewayIntentBits.Guilds] })
            client.login(config.discordBotToken)
            client.on('ready', async () => {
                await sendInPrivateMessage(client, message)
                await sendToChannels(client, message)
                console.log("Discord alert(s) correctly sent.")
                client.destroy()
            })
        } catch (e) {
            console.log('Error in function', arguments.callee.name, e)
            resolve()
        }
    }))
}

async function sendInPrivateMessage(client, message) {
    return (new Promise(async (resolve, reject) => {
        try {
            if (!config.discordAlertReceivers || config.discordAlertReceivers.length === 0)
                return (resolve())
            for (let i of config.discordAlertReceivers.split(',')) {
                if (i.length < 2)
                    continue
                await client.users.fetch(i.replace(/ /g, ""), false).then(async (user) => {
                    let resMessage = config.discordPrivateAdditionnalMessage ? config.discordPrivateAdditionnalMessage : "|ALERTMESSAGE|"
                    resMessage = resMessage.replace('|ALERTMESSAGE|', message)
                    await user.send(utils.getDate() + "\n" + resMessage).catch((error) => {
                        console.log("Error when send discord message", message, error)
                    })
                })
            }
            resolve()
        } catch (e) {
            console.log('Error in function', arguments.callee.name, e)
            resolve()
        }
    }))
}

async function sendToChannels(client, message) {
    return (new Promise(async (resolve, reject) => {
        try {
            if (!config.discordAlertChannels || config.discordAlertChannels.length === 0)
                return (resolve())
            for (let i of config.discordAlertChannels.split(',')) {
                if (i.length < 2)
                    continue
                let resMessage = config.discordChannelAdditionnalMessage ? config.discordChannelAdditionnalMessage : "|ALERTMESSAGE|"
                resMessage = resMessage.replace('|ALERTMESSAGE|', message)
                await client.channels.cache.get(i.replace(/ /g, "")).send(resMessage)
            }
            resolve()
        } catch (e) {
            console.log('Error in function', arguments.callee.name, e)
            resolve()
        }
    }))
}

exports.discord = discord