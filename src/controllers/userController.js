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