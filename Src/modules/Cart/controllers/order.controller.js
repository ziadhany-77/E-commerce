import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { AppError, catchAsyncError } from "../../../utils/errorhandeling.js";
import { stripe } from "../../../utils/onlinePayment.js";
import productModel from "../../Product/models/product.model.js";
import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";

export const getUserOrders = catchAsyncError(async (req, res) => {
    const apiFeatures = new ApiFeatures(
        orderModel.find({
            user_id: req.user.id
        }),
        req.query
    ).paginate(5)
    
    const orders = await apiFeatures.query
    
    res.json({ cart })
}) 

export const makeCODOrder = catchAsyncError(async (req, res) => {
    const cart = await cartModel.findOne({ user_id: req.user.id })

    cart.products.forEach((product) => {
        if (product.product_id.stock < product.quantity)
            throw new AppError('insufficient stock', 400)
    })
    const order = await orderModel.create({
        user_id: req.user.id,
        coupon: {
            discount: cart.coupon_id?.discount || 0
        },
        products: cart.products.map(({ product_id: { title, price, discountedPrice }, quantity }) => (
            {
                quantity,
                product: {
                    title,
                    price,
                    discountedPrice
                }
            }
        )),
        ...req.body
    })

    const bulkWriteOptions = cart.products.map(
        ({ product_id: { _id }, quantity }) => ({
            updateOne: {
                filter: { _id },
                update: {
                    $inc: {
                        stock: -quantity
                    }
                }
            }
        })
    )

    await productModel.bulkWrite(bulkWriteOptions)
    if (!order) throw new AppError('order failed', 400)
    res.json({ order })
}) 


export const makeOnlineSession = catchAsyncError(async (req, res) => {
    const cart = await cartModel.findOne({ user_id: req.user.id })
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'EGP',
                    unit_amount: cart.total_price * 100,
                    product_data: {
                        name: req.user.name
                    },
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: 'https://www.youtube.com/watch?v=RTP3wGflIOw',  //link after finishing the payment
        cancel_url: 'https://www.youtube.com/watch?v=RTP3wGflIOw',   //link if cancel the payment
        client_reference_id: cart._id,
        customer_email: req.user.email,
    })

    res.json({ session })
})