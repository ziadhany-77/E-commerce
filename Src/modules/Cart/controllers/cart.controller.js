import { AppError, catchAsyncError } from "../../../utils/errorhandeling.js";
import couponModel from "../../Coupon/models/coupon.model.js";
import cartModel from "../models/cart.model.js";

export const getCart = catchAsyncError(async (req, res) => {
    const cart = await cartModel.findOne({ user_id: req.user.id })
    res.json({ cart })
}) 

export const addToCart = catchAsyncError(async (req, res) => {
    const {product_id} = req.body
    const cart = await cartModel.findOne({ user_id: req.user.id })

    const product = cart.products.find(
        (prod) => {
            prod.product_id._id.toString() === product_id
        }
    )
    
    if (!product) cart.products.push({ product_id, quantity: 1 })
    else product.quantity++
    
    await cart.save()
    res.json({ message: 'added' })
}) 

export const removeFromCart = catchAsyncError(async (req, res) => {
    const {product_id} = req.body
    const cart = await cartModel.findOne({ user_id: req.user.id })

    const product = cart.products.find(
        (prod) => {
            prod.product_id._id.toString() === product_id
        }
    )
    
    if (!product) throw new AppError('product not found', 404)
    product.quantity--
    
    if (product.quantity === 0) cart.products.remove(product)
    
    
    await cart.save()
    res.json({ message: 'removed' })
}) 

export const applyCoupon = catchAsyncError(async (req, res) => {
    const { code } = req.body
    const cart = await cartModel.findOne({ user_id: req.user.id })

    if (!code) {
        cart.coupon_id = null
        await cart.save()
        return res.json({ message: 'coupon removed ' })
    }

    const coupon = await couponModel.findOne({
        code,
        expiry: { $gte: Date.now }
    })

    if (!coupon) throw new AppError('invalid coupon', 400)
    
    cart.coupon_id = coupon._id
    await cart.save()
    res.json({ message: 'coupon added' })
})

