const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;


let User = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	public_key: {
		type: String
	}
});

module.exports = mongoose.model('User', User); 