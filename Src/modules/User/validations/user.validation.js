import Joi from "joi";

export const updateUserSchema = Joi.object({
    body: {
        name: Joi.string().min(3).max(20).trim(),
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }),
        password: Joi.string()
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
},
	params: {},
	query: {},
})