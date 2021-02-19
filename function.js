const fs = require("fs")
module.exports = {
	writeJSON: function(object){
		fs.writeFile("config.json", JSON.stringify(object), (err)=>{console.log(err)});
	},
	setSettings: function(object, id, name, value){
		if(object.settings[id]){
			object.settings[id][name] = value;
		}else{
			object.settings[id] = {"type": "text", "category": "none"};
			object.settings[id][name] = value;
		}
	},
	/**
	 * check if channel named `name` exist
	 * @param {GuildChannelManager} channelManager
	 * @param {string} name
	 * @returns {boolean}
	 */
	channelExist: function(channelManager, name){
		return channelManager.cache.some((channel)=>channel.name === name)
	}
}