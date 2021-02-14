#!/usr/bin/env node
const {Client} = require('discord.js');
const config = require("./config.json");
const botcommand = require("./command");

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
		botcommand.new(msg, command);
	}else if(command[0] === "!del"){
		botcommand.del(msg,command);
	}else if(command[0] === '!help'){
		botcommand.help(msg);
	}else if(command[0] === "!set"){
		botcommand.set(msg, command);
	}
	if(msg.content === 'ping'){
		msg.reply("Pong le retour :)")
		.catch(console.error);
	}
});

client.login(config.token);