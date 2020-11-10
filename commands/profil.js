const Discord = require("discord.js");
const fs = require("fs");
const Inventory = require('../modules/inventory');

module.exports.run = async (bot, message, args, prefix) => {

    let xEmbed = new Discord.MessageEmbed()
    .setColor("#FF9900")
    .addField(`:camping: Tu n'as pas commencer de compte !`, "Pour commencer ton compte merci de faire `!start`")
    .setFooter(`Demandé par ${message.author.tag}`,message.author.displayAvatarURL);
    Inventory.findOne({
        User_ID: message.author.id,
}, (err, inventory) => {
    if(err) console.log(err)
    if(!inventory){
        message.channel.send(xEmbed);
    }else{
        let profilEmbed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .addField(`Profil de ${message.author.tag} <:carapuce:775788598947479572>`, `✅ Juste : ${inventory.Quiz_Juste}\n:x: Faux : ${inventory.Quiz_Faux}\n❔ Sans réponse : ${inventory.Quiz_NA}`)
        .setFooter(`!profil`,message.author.displayAvatarURL);
        message.channel.send(profilEmbed);
    }
    })

}

module.exports.help = {
    name: "!profil"
}