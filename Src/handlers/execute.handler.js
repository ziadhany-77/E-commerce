import { catchAsyncError } from "../utils/errorhandeling.js"

export const executeQuery = ({ status = 200 } = {}) => {
    return catchAsyncError( async(req, res, next) => {
        const queryResulte = await req.query
        res.status(status).json(queryResulte)
    })
}