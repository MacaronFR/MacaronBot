const {Client} = require('discord.js');
const config = require("./config.json");

const client = new Client({
	partials: ['GUILD_MEMBER','CHANNEL','USER','REACTION']
});

client.on('ready', ()=>{
	
	client.user.setActivity('Manager', {type: 'STREAMING'});
});

client.on('message',(msg)=>{
	if(msg.content === 'ping'){
		msg.reply("pong")
		.catch(console.error);
	}
});

client.login(config.token);