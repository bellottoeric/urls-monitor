
exports.config = {


    // *** GENERAL SETTINGS *** //

    // Delay between each verification URLs in seconds
    delayURL: 1,

    // Delay between each verification session in seconds
    delaySession: 1 * 60,

    // Path of the file
    pathUrlsListFile: "sampleList.json",




    // *** DISCORD SETTINGS *** //

    // Discord bot token : OTn7ODm0MDA7ODk5ODIYnjap.YmTeOi.NTsuYN7QLjOdz2jyiODASZMuFTd
    discordBotToken: process.env.discordBotToken,

    // Receivers ID separate by a comma : 320471445121172197,210471445621132197
    discordAlertReceivers: "210491445621161984",

    // |ALERTMESSAGE| add this in your custom private message
    discordPrivateAdditionnalMessage: "URLS Monitor \n|ALERTMESSAGE|",

    // Channels ID separate by a comma : 999686079177314334,749686079177414935
    discordAlertChannels: "999686079177314334",

    // |ALERTMESSAGE| add this in your custom channel message
    discordChannelAdditionnalMessage: "@everyone \n|ALERTMESSAGE|",




    // *** GMAIL SETTINGS *** //

    // Gmail username taken from environnement variables, you can add them in the .env
    gmailUsername: process.env.gmailUsername,

    // Gmail application password taken from environnement variables, you can add them in the .env
    gmailPassword: process.env.gmailPassword,

    // Gmail subject from the emails sent
    gmailSubject: "URLS Monitor Alert - |NUMBEROFALERTS| alert(s) received",

    // Receivers of the alerts
    gmailTo: "bellottoeric@gmail.com",


}
