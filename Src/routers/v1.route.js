import { Router } from "express";
import categoryRouter from '../modules/Product/routers/categoty.routes.js'
import productRouter from '../modules/Product/routers/product.routes.js'
import couponRouter from '../modules/Coupon/routers/coupon.routes.js'
import brandRouter from '../modules/Product/routers/brand.routes.js'
import ordersRouter from '../modules/Cart/routers/order.routes.js'
import userRouter from '../modules/User/routers/user.routes.js'
import cartRouter from '../modules/Cart/routers/cart.routes.js'
import authRouter from '../modules/Auth/routers/auth.routes.js'
const router = Router()

router.use('/categories', categoryRouter)
router.use('/products', productRouter)
router.use('/coupons', couponRouter)
router.use('/orders', ordersRouter)
router.use('/brands', brandRouter)
router.use('/users', userRouter)
router.use('/cart', cartRouter)
router.use('/auth', authRouter)


export default router