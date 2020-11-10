const Discord = require("discord.js");
const fs = require("fs");
const Inventory = require('../modules/inventory');

module.exports.run = async (bot, message, args, prefix) => {

    let xEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`:camping: Ton compte est déjà fait !`)
    .setFooter(`Demandé par ${message.author.tag}`,message.author.displayAvatarURL);
    Inventory.findOne({
        User_ID: message.author.id,
}, (err, inventory) => {
    if(err) console.log(err)
    if(!inventory){
        Inventory.countDocuments().then((count) => {
        var inventaire_create = new Inventory({
            User_ID: message.author.id,
            Quiz_Juste:0,
            Quiz_Faux:0,
            Quiz_NA:0,
            Time:""
        })
        inventaire_create.save()

        let sEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .addField(`:camping: Ton compte commence maintenant, tu es le ${count}ème !`, "Tu peux faire `!carahelp`")
        .setFooter(`Demandé par ${message.author.tag}`,message.author.displayAvatarURL);

        message.channel.send(sEmbed);
    });
    }else{
            message.channel.send(xEmbed)
    }
    })

}

module.exports.help = {
    name: "!start"
}