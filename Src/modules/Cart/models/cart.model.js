import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		products: [
			{
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true
				},
				quantity: {
					type: Number,
					required: true
				}
			}
		],
		coupon_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'coupon'
		}
	},
	{ timestamps: true }
)

cartSchema.pre(/find/i, function (next) {
	this.populate({
		path: 'products',
		populate: {
			path: 'product_id',
			model: 'Product',
		}
	})
	this.populate('coupon_id')
	next()
})

cartSchema.virtual('total_price').get(function () {
	const total = this.products.reduce(
		(acc, entry) => {
			acc + entry.product_id.discountedPrice * entry.quantity
		},
		0
	)
	return total - ((this.coupon_id?.discount || 0) /100 ) * total
})

const cartModel = mongoose.model('cart', cartSchema)

export default cartModel
