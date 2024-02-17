import { Router } from "express";
import { validate } from "../../../middlewares/validation.js";
import { addReviewSchema, deleteReviewSchema, getReviewsSchema, updateReviewSchema } from "../validations/review.validation.js";
import { addReview, deleteReview, getReviews, updateReview } from "../controllers/review.controllers.js";
import { authenticate, authorize } from "../../Auth/middlewares/auth.middlewares.js";
import { ROLES } from "../../../utils/enums.js";

const router = Router({ mergeParams: true })

router
	.route('/')
	.get(validate(getReviewsSchema), getReviews)
	.post(
		// authenticate,
		// authorize(ROLES.USER),
		validate(addReviewSchema),
		addReview
	)
	.put(
		// authenticate,
		// authorize(ROLES.USER),
		validate(updateReviewSchema),
		updateReview
	)
	.delete(
		// authenticate,
		// authorize(ROLES.USER),
		validate(deleteReviewSchema),
		deleteReview
	)
export default router