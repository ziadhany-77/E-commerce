export const filterCoupon = () => {
    return (req, res, next) => {
        req.query = req.query.where({ _id: req.params.id })
        next()
    }
}