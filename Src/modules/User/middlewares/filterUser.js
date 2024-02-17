import { catchAsyncError } from "../../../utils/errorhandeling.js"
import userModel from "../models/user.model.js"

export const filterUser = () => {
    return catchAsyncError( async(req, res, next) => {
        const { id } = req.user
        const user = await userModel.findOne({ _id: id })
        req.query = req.query.where({ _id: user._id })
        next()
    })
}