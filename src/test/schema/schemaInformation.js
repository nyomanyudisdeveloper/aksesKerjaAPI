import Joi from 'joi'


export const responseSchemaGetBannerSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Sukses").required(),
    data:Joi.array().items(
        Joi.object({
            banner_name: Joi.string().required(),
            banner_image: Joi.string().required(),
            description: Joi.string().required()
        })
    ).required()
})

export const responseSchemaGetServiceSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Sukses").required(),
    data:Joi.array().items(
        Joi.object({
            service_code: Joi.string().required(),
            service_name: Joi.string().required(),
            service_icon: Joi.string().required(),
            service_tarif: Joi.number().required()
        })
    ).required()
})