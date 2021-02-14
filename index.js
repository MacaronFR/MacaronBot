#!/usr/bin/env node
const {Client,MessageEmbed} = require('discord.js');
const config = require("./config.json");

const client = new Client({
	partials: ['GUILD_MEMBER','CHANNEL','USER','REACTION']
});
client.on('ready', ()=>{
	client.user.setActivity('!help', {type: 'STREAMING'});
});

client.on('message',(msg)=>{
	let command = msg.content.split(" ").filter(function(value){
		return value !== "";
	});
	if(command[0] === "!new"){
		if(command[1] !== ""){
			if(!msg.guild.channels.cache.some((channel)=>channel.name === command[1])){
				msg.guild.channels.create(command[1], {
					type: 'text',
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
	}else if(command[0] === "!del"){
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
	}else if(command[0] === '!help'){
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
	}else if(command[0] === "!set"){
		if(command[1] === "group"){
		
		}else if(command[1] === "type"){
			if(command[2] === "voice"){
				if(config.settings[msg.guild.id]){
					msg.channel.send("NIKK");
				}else{
					msg.channel.send("merde");
				}
			}else if(command[2] === "text"){
			
			}
		}
	}
	if(msg.content === 'ping'){
		msg.reply("Pong le retour :)")
		.catch(console.error);
	}
});

client.login(config.token);