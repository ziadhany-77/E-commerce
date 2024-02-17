import { Router } from 'express'
import { signin, signup, validateEmail } from '../controllers/auth.controller.js'
import { assertUniqueEmail } from '../middlewares/auth.middlewares.js'
import { validate } from '../../../middlewares/validation.js'
import {
	signinSchema,
	signupSchema,
	validateEmailSchema,
} from '../validations/auth.validate.js'

const router = Router()

router.post('/signin', validate(signinSchema), signin)
router.post('/signup', validate(signupSchema), assertUniqueEmail, signup)
router.get('/validate/:token', validate(validateEmailSchema), validateEmail)

export default router
