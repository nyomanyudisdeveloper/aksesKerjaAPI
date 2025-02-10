import { ResponseStatus } from '../utils/responseHelper.js'
import {validateEmail} from '../utils/stringHelper.js'

export const validateEmailAndPassword = async (req,res,next) => {
    const {email,password} = req.body
    if(!email){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter email harus diisi",
            data:null
        })
    }
    else if (!password){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter password harus diisi",
            data:null
        })
    }
    else if(!validateEmail(email)) {
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter email tidak sesuai format",
            data:null
        })
    }
    else if(password.length < 8){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter password memiliki panjang kurang dari 8",
            data:null
        })
    }
    next()
}

export const checkEmailAndPasswordExists = async (req,res,next) => {
    const {email,password} = req.body
    if(!email){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter email harus diisi",
            data:null
        })
    }
    else if(!password){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter password harus diisi",
            data:null
        })
    }
    next()
}

export const checkFirstAndLastNameExists = async (req,res,next) => {
    const {first_name,last_name} = req.body
    if(!first_name){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter first_name harus diisi",
            data:null
        })
    }
    else if(!last_name){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter last_name harus diisi",
            data:null
        })
    }
    next()
}

export const validateTopUpAmount = async (req,res,next) => {
    const {top_up_amount} = req.body
    if(!top_up_amount){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter top_up_amount harus diisi",
            data:null
        })
    }
    else if(typeof top_up_amount != 'number'){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
            data:null
        })
    }
    else if(top_up_amount < 0){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter amount hanya boleh angka dan tidak boleh lebih kecil dari 0",
            data:null
        })
    }
    next()
}