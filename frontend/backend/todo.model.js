const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;


let Todo = new Schema({
	trans_buyer_id: {
		type: String
	},
	trans_buyer: {
		type: String
	},
	trans_seller_id: {
		type: String
	},
	trans_seller: {
		type: String
	},
	property_id: {
		type: String
	},
	trans_docs: {
		type: String
	},
	trans_notary_id: {
		type: String
	},
	trans_completed: {
		type: Boolean
	}
});

module.exports = mongoose.model('Todo', Todo); 