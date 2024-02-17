import Joi from "joi";

const modelId = Joi.string().hex().length(24)
const modelPhoneNumber = Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)

export const schemas = {
    modelId,
    modelPhoneNumber
}