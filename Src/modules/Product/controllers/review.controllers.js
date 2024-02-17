import { ApiFeatures } from "../../../utils/apiFeatures.js";
import { AppError, catchAsyncError } from "../../../utils/errorhandeling.js";
import productModel from "../models/product.model.js";
import reviewModel from "../models/review.model.js";

export const getReviews = catchAsyncError(async (req, res) => {
    const product = await productModel.findOne({ slug: req.params.productSlug })
    if (!product) throw new AppError("invalid slug", 400)
    const apiFeatures = new ApiFeatures(reviewModel.find(
        { product_id: product._id }),
        req.query
    ).paginate(5)
    const reviews = await apiFeatures.query
    res.json({ reviews })
})

export const addReview = catchAsyncError(async (req, res) => {
    const product = await productModel.findOne({ slug: req.params.productSlug })
    if (!product) throw new AppError("invalid slug", 400)
    
    const addedReview = await reviewModel.findOne({
        user_id: req.user.id,
        product_id: product._id
    })
    if(addedReview) throw new AppError("review already exists", 400)
    const review = await reviewModel.create({
        ...req.body,
        user_id: req.user.id,
        product_id: product._id
    }) 
    res.status(201).json({ review })
})
export const updateReview = catchAsyncError(async (req, res) => {
    const product = await productModel.findOne({ slug: req.params.productSlug })
    if (!product) throw new AppError("invalid slug", 400)
    
    const review = await reviewModel.findOneAndUpdate({
        user_id: req.user.id,
        product_id: product._id
    }, req.body)
    res.status(201).json({ review })
})

export const deleteReview = catchAsyncError(async (req, res) => {
    const product = await productModel.findOne({ slug: req.params.productSlug })
    if (!product) throw new AppError("invalid slug", 400)
	const review = await reviewModel.findOneAndDelete({
		product_id: product._id,
		user_id: req.user.id,
	})
	res.json({ review })
})



