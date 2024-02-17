import { Router } from "express";
import { authenticate, authorize } from "../../Auth/middlewares/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";
import { addToCart, applyCoupon, getCart, removeFromCart } from "../controllers/cart.controller.js";
import { assertCart } from "../middlewares/cart.middleware.js";

const router = Router()


router.route('/')
    .get(authenticate, authorize(ROLES.USER), assertCart, getCart)

router.route('/add')
    .put(authenticate, authorize(ROLES.USER), assertCart, addToCart)

router.route('/remove')
    .put(authenticate, authorize(ROLES.USER), assertCart, removeFromCart)

router.route('/coupon')
    .put(authenticate, authorize(ROLES.USER), assertCart, applyCoupon)


    
export default router