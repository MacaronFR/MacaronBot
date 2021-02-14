const fs = require("fs")
module.exports = {
	writeJSON: function(object){
		fs.writeFile("config.json", JSON.stringify(object));
	},
	setSettings: function(object, id, name, value){
		if(object.settings[id]){
			object.settings[id].name = value;
		}else{
			object.settings[id] = {"type": "text", "group": "none"};
			object.settings[id].name = value;
		}
	}
}