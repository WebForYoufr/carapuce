const Discord = require('discord.js');
const botconfig = require("./botconfig.json");
const mongoose = require('mongoose');
const fs = require("fs");
const Inventory = require('./modules/inventory');
const cooldowns = new Set();
const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection();


mongoose.connect("mongodb://localhost/carapuce", {useUnifiedTopology: true, useNewUrlParser: true}).then(() => console.log("MongoDB connecté"));



fs.readdir("./commands", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Je n'ai pas trouvé de commandes");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} en ligne ! (Catégorie commands)`);
        if (props.help && props.help.name) {
          bot.commands.set(props.help.name, props);
        } else {
          console.error(`Dossier ${f} n'a pas la propriété .help ou .help.name!`);
      }});

});

bot.on("ready", () => {
    console.log(`${bot.user.tag} en ligne`);
    function changing_status() {
        let status = [`Carapuce 👋`, `Epitech 👋`]
        let random = status[Math.floor(Math.random() * status.length)]
        bot.user.setActivity(random)
    }
        setInterval(changing_status, 60000);
        bot.user.setActivity()
    })

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] ={
            prefixes: "!"
        };
    }

    let prefix = prefixes[message.guild.id].prefixes;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix));
    if(commandfile) commandfile.run(bot,message,args);
          
    
});

bot.login(botconfig.token);