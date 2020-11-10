const Discord = require("discord.js");
const fs = require("fs");
const { mongo } = require("mongoose");
const Inventory = require('../modules/inventory');
var moment = require("moment");
moment.locale("fr")

module.exports.run = async (bot, message, args, prefix) => {
        let xEmbed = new Discord.MessageEmbed()
    .setColor("#FF9900")
    .addField(`:camping: Tu n'as pas commencer de compte !`, "Pour commencer ton compte merci de faire `!start`")
    .setFooter(`Demandé par ${message.author.tag}`,message.author.displayAvatarURL);
    Inventory.findOne({
        User_ID: message.author.id
}, (err, inventory) => {
    if(err) console.log(err)
    if(!inventory){
        message.channel.send(xEmbed)
    }else{
        let cooldown = 60000
        if(inventory.Time != null && cooldown - (Date.now() - inventory.Time) > 0){
            let timeObj = ms(cooldown - (Date.now() - inventory.Time ));

            let waitEmbed = new Discord.MessageEmbed()
    .setColor("#FF9900")
    .addField(`:camping: Tu as déjà fait un quiz !`, `Merci d'attendre ${timeObj.minutes}m et ${timeObj.seconds}s !`)
    .setFooter(`Demandé par ${message.author.tag}`,message.author.displayAvatarURL);
            message.channel.send(waitEmbed);
        }else{
        let questions = ['2+2 = ?', '4+4 = ?', 'Quel est la date de création de Epitech ?'];
        let reponses = ['b', 'c', 'a'];
        let a = ['3', '16', '1999']
        let b = ['4', '12', '2001']
        let c = ['7', '8', '1997']
        let d = ["L'amérique du Nord", '8,4', '2009']
        let aleatoire = Math.floor((Math.random() * questions.length));
            const collector = new Discord.MessageCollector(message.channel, m => inventory.User_ID === inventory.User_ID, { time: 300000 });
            let dejaEmbed = new Discord.MessageEmbed()
            .setColor("#FF9900")
            .setTitle(`La question est **${questions[aleatoire]}**`)
            .addField("Voici les réponses possible", `A : **${a[aleatoire]}**\nB : **${b[aleatoire]}**\nC : **${c[aleatoire]}**\nD : **${d[aleatoire]}**`)
            .setFooter(`Demandé par ${message.author.tag} | Tu as 1 minutes pour répondre !`,message.author.displayAvatarURL);
            message.channel.send(dejaEmbed);
            inventory.Quiz_NA=inventory.Quiz_NA+1
            inventory.Time = Date.now()
            inventory.save()
            collector.on('collect', message => {
                    if(inventory.User_ID === message.author.id){
                        if(message.content === "A"){
                            if(reponses[aleatoire] === "a"){
                                let reset = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle("Je vérifie ta réponse...")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset2 = new Discord.MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("J'ai trouver !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset3 = new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .addField("Ta réponse est juste !", "Félicitation, tu viens de gagner 1 <:carapuce:775788598947479572>")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                message.channel.send(reset).then(async msg => {
                                    setTimeout(() => {
                                      msg.edit(reset2);
                                    }, 1500);
                                    setTimeout(() => {
                                        inventory.User_Pioche_Opale=inventory.User_Pioche_Opale+1
                                        inventory.User_Pioche_Total=inventory.User_Pioche_Total+1
                                        inventory.Caisse_Bronze=inventory.Caisse_Bronze-1
                                        inventory.save()
                                      msg.edit(reset3);
                                      message.channel.stopTyping();
                                    }, 3000);
                                })
                                inventory.Quiz_NA=inventory.Quiz_NA-1
                                inventory.Quiz_Juste=inventory.Quiz_Juste+1
                                inventory.save()
                            }else{
                                let reset = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle("Je vérifie ta réponse...")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset2 = new Discord.MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("J'ai trouver !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset3 = new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .setTitle("Ta réponse est malheuresement fausse !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                message.channel.send(reset).then(async msg => {
                                    setTimeout(() => {
                                      msg.edit(reset2);
                                    }, 1500);
                                    setTimeout(() => {
                                        inventory.User_Pioche_Opale=inventory.User_Pioche_Opale+1
                                        inventory.User_Pioche_Total=inventory.User_Pioche_Total+1
                                        inventory.Caisse_Bronze=inventory.Caisse_Bronze-1
                                        inventory.save()
                                      msg.edit(reset3);
                                      message.channel.stopTyping();
                                    }, 3000);
                                })
                                inventory.Quiz_NA=inventory.Quiz_NA-1
                                inventory.Quiz_Faux=inventory.Quiz_Faux+1
                                inventory.save()
                            }

                        }
                        if(message.content === "B"){
                            if(reponses[aleatoire] === "b"){
                                let reset = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle("Je vérifie ta réponse...")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset2 = new Discord.MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("J'ai trouver !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset3 = new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .addField("Ta réponse est juste !", "Félicitation, tu viens de gagner 1 <:carapuce:775788598947479572>")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                message.channel.send(reset).then(async msg => {
                                    setTimeout(() => {
                                      msg.edit(reset2);
                                    }, 1500);
                                    setTimeout(() => {
                                        inventory.User_Pioche_Opale=inventory.User_Pioche_Opale+1
                                        inventory.User_Pioche_Total=inventory.User_Pioche_Total+1
                                        inventory.Caisse_Bronze=inventory.Caisse_Bronze-1
                                        inventory.save()
                                      msg.edit(reset3);
                                      message.channel.stopTyping();
                                    }, 3000);
                                })
                                inventory.Quiz_NA=inventory.Quiz_NA-1
                                inventory.Quiz_Juste=inventory.Quiz_Juste+1
                                inventory.save()
                            }else{
                                                                let reset = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle("Je vérifie ta réponse...")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset2 = new Discord.MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("J'ai trouver !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset3 = new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .setTitle("Ta réponse est malheuresement fausse !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                message.channel.send(reset).then(async msg => {
                                    setTimeout(() => {
                                      msg.edit(reset2);
                                    }, 1500);
                                    setTimeout(() => {
                                        inventory.User_Pioche_Opale=inventory.User_Pioche_Opale+1
                                        inventory.User_Pioche_Total=inventory.User_Pioche_Total+1
                                        inventory.Caisse_Bronze=inventory.Caisse_Bronze-1
                                        inventory.save()
                                      msg.edit(reset3);
                                      message.channel.stopTyping();
                                    }, 3000);
                                })
                                inventory.Quiz_NA=inventory.Quiz_NA-1
                                inventory.Quiz_Faux=inventory.Quiz_Faux+1
                                inventory.save()
                            }

                        }
                        if(message.content === "C"){
                            if(reponses[aleatoire] === "c"){
                                let reset = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle("Je vérifie ta réponse...")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset2 = new Discord.MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("J'ai trouver !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset3 = new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .addField("Ta réponse est juste !", "Félicitation, tu viens de gagner 1 <:carapuce:775788598947479572>")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                message.channel.send(reset).then(async msg => {
                                    setTimeout(() => {
                                      msg.edit(reset2);
                                    }, 1500);
                                    setTimeout(() => {
                                        inventory.User_Pioche_Opale=inventory.User_Pioche_Opale+1
                                        inventory.User_Pioche_Total=inventory.User_Pioche_Total+1
                                        inventory.Caisse_Bronze=inventory.Caisse_Bronze-1
                                        inventory.save()
                                      msg.edit(reset3);
                                      message.channel.stopTyping();
                                    }, 3000);
                                })
                                inventory.Quiz_NA=inventory.Quiz_NA-1
                                inventory.Quiz_Juste=inventory.Quiz_Juste+1
                                inventory.save()
                            }else{
                                let reset = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle("Je vérifie ta réponse...")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset2 = new Discord.MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("J'ai trouver !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset3 = new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .setTitle("Ta réponse est malheuresement fausse !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                message.channel.send(reset).then(async msg => {
                                    setTimeout(() => {
                                      msg.edit(reset2);
                                    }, 1500);
                                    setTimeout(() => {
                                        inventory.User_Pioche_Opale=inventory.User_Pioche_Opale+1
                                        inventory.User_Pioche_Total=inventory.User_Pioche_Total+1
                                        inventory.Caisse_Bronze=inventory.Caisse_Bronze-1
                                        inventory.save()
                                      msg.edit(reset3);
                                      message.channel.stopTyping();
                                    }, 3000);
                                })
                                inventory.Quiz_NA=inventory.Quiz_NA-1
                                inventory.Quiz_Faux=inventory.Quiz_Faux+1
                                inventory.save()
                            }

                        }
                        if(message.content === "D"){
                            if(reponses[aleatoire] === "d"){
                                let reset = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle("Je vérifie ta réponse...")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset2 = new Discord.MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("J'ai trouver !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset3 = new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .addField("Ta réponse est juste !", "Félicitation, tu viens de gagner 1 <:carapuce:775788598947479572>")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                message.channel.send(reset).then(async msg => {
                                    setTimeout(() => {
                                      msg.edit(reset2);
                                    }, 1500);
                                    setTimeout(() => {
                                        inventory.User_Pioche_Opale=inventory.User_Pioche_Opale+1
                                        inventory.User_Pioche_Total=inventory.User_Pioche_Total+1
                                        inventory.Caisse_Bronze=inventory.Caisse_Bronze-1
                                        inventory.save()
                                      msg.edit(reset3);
                                      message.channel.stopTyping();
                                    }, 3000);
                                })
                                inventory.Quiz_NA=inventory.Quiz_NA-1
                                inventory.Quiz_Juste=inventory.Quiz_Juste+1
                                inventory.save()
                            }else{
                                let reset = new Discord.MessageEmbed()
                                .setColor("RED")
                                .setTitle("Je vérifie ta réponse...")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset2 = new Discord.MessageEmbed()
                                .setColor("ORANGE")
                                .setTitle("J'ai trouver !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                let reset3 = new Discord.MessageEmbed()
                                .setColor("GREEN")
                                .setTitle("Ta réponse est malheuresement fausse !")
                                .setFooter(`worldaventure.fr | ${message.author.tag}`, message.author.displayAvatarURL);
                                message.channel.send(reset).then(async msg => {
                                    setTimeout(() => {
                                      msg.edit(reset2);
                                    }, 1500);
                                    setTimeout(() => {
                                        inventory.User_Pioche_Opale=inventory.User_Pioche_Opale+1
                                        inventory.User_Pioche_Total=inventory.User_Pioche_Total+1
                                        inventory.Caisse_Bronze=inventory.Caisse_Bronze-1
                                        inventory.save()
                                      msg.edit(reset3);
                                      message.channel.stopTyping();
                                    }, 3000);
                                })
                                inventory.Quiz_NA=inventory.Quiz_NA-1
                                inventory.Quiz_Faux=inventory.Quiz_Faux+1
                                inventory.save()
                            }

                        }
                        
                        }
                    
                })
        
            }
    }
    })
}

module.exports.help = {
    name: "!caraquiz"
}