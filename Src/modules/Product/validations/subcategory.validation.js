import Joi from "joi";

export const getSubcategoriesSchema = Joi.object({
    body: {},
	params: {
        categorySlug: Joi.string().required()
	},
	query: {},
})
export const getSubcategorySchema = Joi.object({
    body: {},
	params: {
        categorySlug: Joi.string().required(),
        subcategorySlug: Joi.string().required()
	},
	query: {},
})
export const addSubcategorySchema = Joi.object({
    body: {
        name: Joi.string().required().min(3).max(20).trim(),
	},
	params: {
		categorySlug: Joi.string().required()
	},
	query: {},
})

export const updateSubcategorySchema = Joi.object({
	body: {
		name: Joi.string().min(3).max(20).trim(),
	},
	params: {
		categorySlug: Joi.string().required(),
        subcategorySlug: Joi.string().required()},
	query: {},
})

export const deleteSubcategorySchema = Joi.object({
	body: {},
	params: {
		categorySlug: Joi.string().required(),
        subcategorySlug: Joi.string().required()},
	query: {},
})

