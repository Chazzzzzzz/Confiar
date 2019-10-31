const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;


let Todo = new Schema({
	trans_buyer: {
		type: String
	},
	trans_seller: {
		type: String
	},
	trans_info: {
		type: String
	},
	trans_docs: {
		type: String
	},
	trans_completed: {
		type: Boolean
	}
});

module.exports = mongoose.model('Todo', Todo); 