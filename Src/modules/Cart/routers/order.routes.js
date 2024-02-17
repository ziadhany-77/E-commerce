import { Router } from "express";
import { authenticate, authorize } from "../../Auth/middlewares/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";
import { assertCart } from "../middlewares/cart.middleware.js";
import { getUserOrders, makeCODOrder, makeOnlineSession } from "../controllers/order.controller.js";
import { validate } from "../../../middlewares/validation.js";
import { addaOrderSchema } from "../validations/order.validation.js";


const router = Router()


router.route('/')
    .get(
        authenticate,
        authorize(ROLES.USER),
        getUserOrders
    )

router.route('/cash')
    .post(
        authenticate,
        authorize(ROLES.USER),
        validate(addaOrderSchema),
        assertCart,
        makeCODOrder
).post(
    authenticate,
    authorize(ROLES.USER),
    assertCart,
    makeOnlineSession
    )


export default router