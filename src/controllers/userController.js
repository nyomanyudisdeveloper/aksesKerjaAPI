import { getMembershipByEmailService,getMembershipByIDService, registrationService, updateMembershipLimitLoginService, updateProfileImageMembershipService, updateProfileMembershipService } from "../model/membership.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
// import { uploadImageToFirebaseStorage } from "../utils/firebaseStorage.js"
import {getResponseInternalServerError, ResponseStatus} from '../utils/responseHelper.js'
import { getUserByEmailService, registrationUserService } from "../model/users.js"

dotenv.config()


export const registrationUserController = async (req,res) => {
    try{
        const {email,full_name="",password} = req.body
        
        const membership = await getUserByEmailService(email)
        if(membership){
            return res.status(400).send({
                status:ResponseStatus.BAD_REQUEST,
                message:"Email sudah terdaftar",
                data:null
            })
        }

        const hashedPassowrd = await bcrypt.hash(password,10)
        const data = await registrationUserService(email,full_name,hashedPassowrd)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Registrasi berhasil silahkan login",
            data:null
        })
    }
    catch(err){
        console.log("registration err = ",err)
        return res.status(500).send(getResponseInternalServerError())
        
    }
}

export const loginUserController = async (req,res) => {
    try{
        const {email,password} = req.body

        const user = await getUserByEmailService(email)
        console.log(user)
        

        if(!user){
            return res.status(401).send({
                status:ResponseStatus.UNAUTHORIZED,
                message:"Username atau password salah",
                data:null
            })
        }

        // if(membership.limit_login >= 3){
        //     return res.status(401).send({
        //         status:ResponseStatus.UNAUTHORIZED,
        //         message:"Kamu tidak bisa login lagi dikarenakan gagal sebanyak 3x, Silahkan coba lagi 1 minggu ke depan",
        //         data:null
        //     })
        // }

        const hashedPassword = user.password
        const passwordMatch = await bcrypt.compare(password,hashedPassword)
        if(!passwordMatch){
            // await updateMembershipLimitLoginService(membership.limit_login+1,membership.id)
            return res.status(401).send({
                status:ResponseStatus.UNAUTHORIZED,
                message:"Username atau password salah",
                data:null
            })
        }

        const token = jwt.sign({
            userID:user.id,
            email:user.email
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'12h'
        })

        // await updateMembershipLimitLoginService(0,membership.id)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Login Sukses",
            data:{
                token
            }
        })

    }
    catch(err){
        console.log(err)
        return res.status(500).send(getResponseInternalServerError())
    }
}