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
	if(msg.content.startsWith("!new")){
		let name = msg.content.substring(5);
		if(name !== ""){
			if(!msg.guild.channels.cache.some((channel)=>channel.name === name)){
				msg.guild.channels.create(name, {
					type: 'text',
					permissionOverwrites: [{id: msg.guild.id, allow: ['VIEW_CHANNEL']}]
				}).then(r=>{
					msg.channel.send("Channel créé");
				}).catch((r)=>{
					console.log(r);
					msg.channel.send("Erreur lors de la création");
				})
			}else{
				msg.channel.send("Ce channel existe déjà");
			}
		}else{
			msg.channel.send("Aucun titre de channel. Utilisation !new channelName");
		}
	}else if(msg.content.startsWith("!del")){
		let name = msg.content.substring(5);
		if(name !== ""){
			let chan = msg.guild.channels.cache.find(channel => channel.name === name);
			if(chan !== undefined){
				chan.delete().then(()=>{
					msg.channel.send("Channel supprimé");
				}).catch(()=>{
					msg.channel.send("Erreur lors de la suppression");
				})
			}else{
				msg.channel.send("Aucun channel nommé "+name);
			}
		}else{
			msg.channel.send("Aucun titre de channel. Utilisation !del channelName");
		}
	}else if(msg.content === '!help'){
		const helpEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle("Aide")
			.setURL("https://macaron-dev.fr")
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
	}
	if(msg.content === 'ping'){
		msg.reply("Pong le retour :)")
		.catch(console.error);
	}
});

client.login(config.token);