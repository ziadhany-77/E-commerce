import { Router } from "express";
import { validate } from "../../../middlewares/validation.js";
import { updateUserSchema } from "../validations/user.validation.js";
import { authenticate, authorize } from "../../Auth/middlewares/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";
import { getAllUsers, getUser, updateUser } from "../controllers/user.controller.js";
import { getWishlist, updateWishlist } from "../controllers/wishlist.controller.js";
import { updateWishlistSchema } from "../validations/wishlist.validation.js";

const router = Router()

router.route('/')
    .get(
        authenticate,
        authorize(ROLES.USER),
        getUser
    )
    .put(
        authenticate,
        authorize(ROLES.USER),
        validate(updateUserSchema),
        updateUser
)
router.route('/all')
    .get(
        authenticate,
        authorize(ROLES.ADMIN),
        getAllUsers
    )

router.route('/wishlist')
    .get(
        authenticate,
        authorize(ROLES.USER),
        getWishlist
    ).put(
        authenticate,
        authorize(ROLES.USER),
        validate(updateWishlistSchema),
        updateWishlist
)


export default router