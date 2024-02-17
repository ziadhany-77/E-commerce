import { catchAsyncError } from "../../../utils/errorhandeling.js";
import userModel from "../models/user.model.js";

export const getWishlist = catchAsyncError(async (req, res) => {
    const { wishlist } = userModel.findById(req.user.id)
    res.json({wishlist})
})

export const updateWishlist = catchAsyncError(async (req, res) => {
    const { product_id } = req.body
    const user = await userModel.findById(req.user.id)

    const indexOfProduct = user.wishList.findIndex((({ _id }) => _id.toString() === product_id))
    if (indexOfProduct === -1) user.wishList.push(product_id)
    else user.wishList.splice(indexOfProduct, 1)
    
    await user.save()

    res.json({message: 'wishlist updated '})
})