const {MessageEmbed} = require("discord.js");
const config = require("./config.json");
const fn = require("./function")
module.exports = {
	new: function(msg, command){
		if(command[1] !== ""){
			if(!msg.guild.channels.cache.some((channel)=>channel.name === command[1])){
				let chanType;
				if(config.settings[msg.guild.id]){
					chanType = config.settings[msg.guild.id].type;
				}else{
					chanType = 'text';
				}
				msg.guild.channels.create(command[1], {
					type: chanType,
					permissionOverwrites: [{id: msg.guild.id, allow: ['VIEW_CHANNEL']}]
				}).then(()=>{
					msg.channel.send("Channel créé");
				}).catch(()=>{
					msg.channel.send("Erreur lors de la création");
				})
			}else{
				msg.channel.send("Ce channel existe déjà");
			}
		}else{
			msg.channel.send("Aucun titre de channel. Utilisation !new channelName");
		}
	},
	del: function(msg, command){
		if(command[1] !== ""){
			let chan = msg.guild.channels.cache.find(channel => channel.name === command[1]);
			if(chan !== undefined){
				chan.delete().then(()=>{
					msg.channel.send("Channel supprimé");
				}).catch(()=>{
					msg.channel.send("Erreur lors de la suppression");
				})
			}else{
				msg.channel.send("Aucun channel nommé "+ command[1]);
			}
		}else{
			msg.channel.send("Aucun titre de channel. Utilisation !del channelName");
		}
	},
	help: function(msg){
		const helpEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle("Aide")
			.setURL("http://discord.macaron-dev.fr")
			.setAuthor("MacaronBot")
			.setDescription("Toute les commandes disponible")
			.addFields({
					name: "Commande :",
					value: "!help => Afficphe cette aide\n" +
						"!new <channelName> => Créer un nouveau channel nommé channelName\n" +
						"!del <channelName> => Supprime un channel nommé channelName"
				}
			)
			.setTimestamp()
			.setFooter("Copyrigth : Macaron macaron-dev.fr");
		msg.channel.send(helpEmbed);
	},
	set: function(msg, command){
		if(command[1] === "group"){
		
		}else if(command[1] === "type"){
			if(command[2] === "voice" && command[2] === "text"){
				fn.setSettings(config, msg.guild.id, "type", command[2]);
				fn.writeJSON(config);
				msg.channel.send("Type de Channel réglé à "+ command[2]);
			}
		}
	}
}