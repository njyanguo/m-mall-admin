import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	name     : String,
	remark   : String,
	quantity : Number,
	saleNum  : Number,
	images   : Array,
	goods_id : String,
	create_at: {
		type   : Date,
		default: Date.now(),
	},
	update_at: Date,
})

export default mongoose.model('goodsTypes', Schema)