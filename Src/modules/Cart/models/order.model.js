import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		products: [
			{
				product: {
					title: String,
					price: Number,
					discounted_price: Number
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		coupon: {
			discount: Number
		},
		address: String,
		phone_number: String,
		payment_type: {
			type: String,
			enum: ['COD', 'card'],
			default: 'COD'
		},
		isPaid: {
			type: Boolean,
			default: false
		},
		isDeliverd: {
			type: Boolean,
			default: false
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

orderSchema.virtual('total_price').get(function () {
	const total = this.products.reduce(
		(acc, entry) => {
			acc + entry.product.price * entry.quantity
		},
		0
	)
	return total 
})

orderSchema.virtual('total_discounted_price').get(function () {
	const total = this.products.reduce(
		(acc, entry) => {
			acc + entry.product.discounted_price * entry.quantity
		},
		0
	)
	return total - ((this.coupon.discount || 0) /100 ) * total
})

const orderModel = mongoose.model('order', orderSchema)

export default orderModel
