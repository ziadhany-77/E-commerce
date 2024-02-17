import Joi from 'joi'
import { schemas } from '../../../utils/schemas.js'

export const addaOrderSchema = Joi.object({
	body: {
		phone_number: schemas.modelPhoneNumber.required(),
		address: Joi.string()
	},
	params: {},
	query: {},
})
export const deleteOrderSchema = Joi.object({
	body: {
		order_id: schemas.modelId.required()
	},
	params: {},
	query: {},
})


