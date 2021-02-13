#!/usr/bin/env node
const {Client} = require('discord.js');
const config = require("./config.json");

const client = new Client({
	partials: ['GUILD_MEMBER','CHANNEL','USER','REACTION']
});
client.on('ready', ()=>{
	client.user.setActivity('Bonjour', {type: 'STREAMING'});
});

client.on('message',(msg)=>{
	if(msg.content.startsWith("!new")){
		let name = msg.content.substring(5);
		if(name !== ""){
			if(!msg.guild.channels.cache.some((channel)=>channel.name === name)){
				msg.guild.channels.create(name, {
					type: 'voice',
					permissionOverwrites: [{id: msg.guild.id, allow: ['VIEW_CHANNEL']}]
				}).then(r=>{
					msg.channel.send("Channel créer");
				}).catch((r)=>{
					console.log(r);
					msg.channel.send("Erreur lors de la création");
				})
			}else{
				msg.channel.send("Channel already exist");
			}
		}else{
			msg.channel.send("No channel name. Usage !new channelName");
		}
	}else if(msg.content.startsWith("!del")){
		let name = msg.content.substring(5);
		if(name !== ""){
			let chan = msg.guild.channels.cache.find(channel => channel.name === name);
			if(chan !== undefined){
				chan.delete().then(()=>{
					msg.channel.send("Channel deleted");
				}).catch(()=>{
					msg.channel.send("Error while deleting channel");
				})
			}else{
				msg.channel.send("No channel named "+name);
			}
		}else{
			msg.channel.send("No channel name. Usage !del channelName");
		}
	}
	if(msg.content === 'ping'){
		msg.reply("Pong le retour :)")
		.catch(console.error);
	}
});

client.login(config.token);