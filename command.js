const {MessageEmbed} = require("discord.js");
const config = require("./config.json");
const fn = require("./function")
module.exports = {
	/**
	 * execute the !new function
	 * @param {Message} msg
	 * @param {Array<string>} command
	 */
	new: function(msg, command){
		if(command[1] !== ""){
			if(!fn.channelExist(msg.guild.channels, command[1])){
				let options = {permissionOverwrites: [{id: msg.guild.id, allow: ['VIEW_CHANNEL']}]};
				if(config.settings[msg.guild.id]){
					options.type = config.settings[msg.guild.id].type;
					let channel = msg.guild.channels.cache.find(chan => chan.name === config.settings[msg.guild.id].group);
					msg.channel.send(channel.name);
					if(channel !== undefined)
						options.parent = channel
				}else{
					options.type = 'text';
				}
				msg.guild.channels.create(command[1], options).then(()=>{
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
	/**
	 * execute the !del function
	 * @param {Message} msg
	 * @param {Array<string>} command
	 */
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
	/**
	 * execute !help command
	 * @param {Message}msg
	 */
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
	/**
	 * execute !set command
	 * @param {Message} msg
	 * @param {Array} command
	 */
	set: function(msg, command){
		if(command[1] === "category"){
			if(command[2]){
				if(!fn.channelExist(msg.guild.channels, command[2])){
					msg.guild.channels.create(command[2], {
						type: "category",
						permissionOverwrites: [{
							id: msg.guild.id,
							deny: ['MANAGE_MESSAGES'],
							allow: ['SEND_MESSAGES']
						}]
					});
				}
				fn.setSettings(config, msg.guild.id, "group", command[2]);
			}
		}else if(command[1] === "type"){
			if(command[2] === "voice" || command[2] === "text"){
				fn.setSettings(config, msg.guild.id, "type", command[2]);
				fn.writeJSON(config);
				msg.channel.send("Type de Channel réglé à "+ command[2]);
			}
		}else{
			msg.channel.send("Utilisation de la commande : !set <category|type> <argument>");
		}
	}
}