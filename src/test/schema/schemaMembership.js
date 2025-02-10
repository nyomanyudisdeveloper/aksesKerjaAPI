import Joi from 'joi'

export const responseSchemaLoginSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Login Sukses").required(),
    data:Joi.object({
        token: Joi.string().required()
    }).required()
})

export const responseSchemaProfileSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Sukses").required(),
    data:Joi.object({
        email: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        profile_image: Joi.string().allow(null)
    })
})

export const responseSchemaUpdateProfileSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Update Profile berhasil").required(),
    data:Joi.object({
        email: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        profile_image: Joi.string().allow(null)
    })
})

export const responseSchemaUpdateProfileImageSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Update Profile Image berhasil").required(),
    data:Joi.object({
        email: Joi.string().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        profile_image: Joi.string().allow(null)
    })
})