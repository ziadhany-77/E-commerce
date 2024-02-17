import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { catchAsyncError } from "../../../utils/errorhandeling.js";
import couponModel from "../models/coupon.model.js";

export const getAllCoupons = catchAsyncError(async (req, res) => {
    const apiFeatures = new ApiFeatures(
        couponModel.find(),
        req.query
    ).paginate(5)
    const coupons = await apiFeatures.query
    res.json({coupons})
})

export const addCoupon = catchAsyncError(async (req, res) => {
    const coupon = await couponModel.create(req.body)
    res.status(201).json({coupon})
})

export const getCoupon = catchAsyncError(async (req, res) => {
    const coupon = await couponModel.findById(req.params.couponId)
    if (!coupon) return res.status(404).json({ message: "coupon not found" })
    res.status(201).json({coupon})
})

export const updateCoupon = catchAsyncError(async (req, res) => {
    const coupon = await couponModel.findByIdAndUpdate(
        req.params.couponId,
        req.body,
        { new: true }
    )
    if (!coupon) return res.status(404).json({ message: "coupon not found" })
    res.status(201).json({coupon})
})

export const deleteCoupon = catchAsyncError(async (req, res) => {
    const coupon = await couponModel.findByIdAndDelete(
        req.params.couponId,
        req.body
    )
    if (!coupon) return res.status(404).json({ message: "coupon not found" })
    res.status(201).json({coupon})
})

