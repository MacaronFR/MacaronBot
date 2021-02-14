const fs = require("fs")
module.exports = {
	writeJSON: function(object){
		fs.writeFile("config.json", JSON.stringify(object), (err)=>{console.log(err)});
	},
	setSettings: function(object, id, name, value){
		if(object.settings[id]){
			object.settings[id][name] = value;
		}else{
			object.settings[id] = {"type": "text", "group": "none"};
			object.settings[id].name = value;
		}
	},
	channelExist(channelManager, name){
		return channelManager.cache.some((channel)=>channel.name === name)
	}
}