const Discord = require("discord.js");

async function discord(dest, content) {
    return (new Promise(async (resolve, reject) => {
        try {
            console.log("waow")
            /*

            const client = new Discord.Client();
            client.login('')
            client.on('ready', () => {
                
            })

            client.channels.cache.get("").send("@everyone ")

            */
            resolve()
        } catch (e) {
            console.log('Error in function', arguments.callee.name, e)
            resolve()
        }
    }))
}
exports.discord = discord