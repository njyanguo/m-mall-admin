import mongoose from 'mongoose'

const Schema = mongoose.Schema({
	name     : String,
	remark   : String,
	is_show  : Boolean,
	sort	 : Number,
	create_at: {
		type   : Date,
		default: Date.now(),
	},
	update_at: Date,

})

export default mongoose.model('classify', Schema)