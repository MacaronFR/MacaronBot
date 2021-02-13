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
		let name = msg.content.substring(6);
		if(name !== ""){
			let test = new Guild
			msg.guild.channels.create(name, {
				type: 'voice',
				permissionOverwrites: {id: msg.guild.id, allow: ['VIEW_CHANNEL']}
	 		}).then(r=>{
				msg.channel.send("OK");
			}).catch(()=>{
				msg.channel.send("NIKK");
			})
		}
	}
	if(msg.content === 'ping'){
		msg.reply("Pong le retour :)")
		.catch(console.error);
	}
});

client.login(config.token);