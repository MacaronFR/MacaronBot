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
	if(msg.content === 'ping'){
		msg.reply("Pong le retour")
		.catch(console.error);
	}
});

client.login(config.token);