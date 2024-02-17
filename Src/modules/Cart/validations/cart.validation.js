import Joi from 'joi'

export const addaCartSchema = Joi.object({
	body: {
		cartId: Joi.string().hex().length(24).required(),
	},
	params: {},
	query: {},
})

export const updateCartSchema = Joi.object({
	body: {
        cartId: Joi.string().hex().length(24).required(),
	},
	params: { 	cartId: Joi.string().hex().length(24).required(), },
	query: {},
})

export const deleteCartSchema = Joi.object({
	body: {},
    params: { cartId: Joi.string().hex().length(24).required() },
	query: {},
})
