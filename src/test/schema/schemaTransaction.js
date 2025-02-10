import Joi from 'joi'


export const responseSchemaGetBalanceSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Get Balance Berhasil").required(),
    data:Joi.object({balance: Joi.number().required() }).required()
})

export const responseSchemaTopUpSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Top Up Balance berhasil").required(),
    data:Joi.object({balance: Joi.number().required() }).required()
})

export const responseSchemaTransactionServiceSuccess = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Transaksi Berhasil").required(),
    data:Joi.object({
        invoice_number: Joi.string().required(),
        service_code: Joi.string().required(),
        service_name: Joi.string().required(),
        transaction_type: Joi.string().required(),
        total_amount: Joi.number().required(),
        created_on: Joi.string().required()
    }).required()
})

export const responseSchemaGetTransactionHistory = Joi.object({
    status: Joi.number().valid(0).required(),
    message: Joi.string().valid("Get History Berhasil").required(),
    data:Joi.object({
        offset:0,
        limit:5,
        records: Joi.array().items(Joi.object({
            invoice_number: Joi.string().required(),
            transaction_type: Joi.string().required(),
            description: Joi.string().required(),
            total_amount: Joi.number().required(),
            created_on: Joi.string().required()
        }).required()).required() 
    })
})