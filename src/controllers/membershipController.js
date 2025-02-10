import { getMembershipByEmailService,getMembershipByIDService, registrationService, updateMembershipLimitLoginService, updateProfileImageMembershipService, updateProfileMembershipService } from "../model/membership.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
// import { uploadImageToFirebaseStorage } from "../utils/firebaseStorage.js"
import {getResponseInternalServerError, ResponseStatus} from '../utils/responseHelper.js'

dotenv.config()

export const registration = async (req,res) => {
    try{
        const {email,first_name="",last_name="",password} = req.body

        const membership = await getMembershipByEmailService(email)
        if(membership){
            return res.status(400).send({
                status:ResponseStatus.BAD_REQUEST,
                message:"Email sudah terdaftar",
                data:null
            })
        }

        const hashedPassowrd = await bcrypt.hash(password,10)
        const data = await registrationService(email,first_name,last_name,hashedPassowrd)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Registrasi berhasil silahkan login",
            data:null
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const login = async (req,res) => {
    try{
        const {email,password} = req.body

        const membership = await getMembershipByEmailService(email)
        console.log(membership)
        

        if(!membership){
            return res.status(401).send({
                status:ResponseStatus.UNAUTHORIZED,
                message:"Username atau password salah",
                data:null
            })
        }

        if(membership.limit_login >= 3){
            return res.status(401).send({
                status:ResponseStatus.UNAUTHORIZED,
                message:"Kamu tidak bisa login lagi dikarenakan gagal sebanyak 3x, Silahkan coba lagi 1 minggu ke depan",
                data:null
            })
        }

        const hashedPassword = membership.password
        const passwordMatch = await bcrypt.compare(password,hashedPassword)
        if(!passwordMatch){
            await updateMembershipLimitLoginService(membership.limit_login+1,membership.id)
            return res.status(401).send({
                status:ResponseStatus.UNAUTHORIZED,
                message:"Username atau password salah",
                data:null
            })
        }

        const token = jwt.sign({
            membership_id:membership.id,
            email:membership.email
        },process.env.JWT_SECRET_KEY,{
            expiresIn:'12h'
        })

        await updateMembershipLimitLoginService(0,membership.id)
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

export const getProfile = async (req,res) => {
    try{
        const membership_id = req.membership_id
        const membership = await getMembershipByIDService(membership_id)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:'Sukses',
            data:{
                email:membership.email,
                first_name:membership.first_name,
                last_name:membership.last_name,
                profile_image:membership.filename_image
            }
        })

    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const updateProfile = async(req,res) => {
    try{
        const membership_id = req.membership_id
        const {first_name,last_name} = req.body

        const membership = await updateProfileMembershipService(membership_id,first_name,last_name)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Update Profile berhasil",
            data:{
                email:membership.email,
                first_name: membership.first_name,
                last_name: membership.last_name,
                profile_image: membership.profile_image
            }
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const updateProfileImage = async(req,res) => {
    try{
        const membership_id = req.membership_id
        // const urlImage = await uploadImageToFirebaseStorage(req.file)

        const membership = await updateProfileImageMembershipService(membership_id,urlImage)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Update Profile Image berhasil",
            data:{
                email:membership.email,
                first_name: membership.first_name,
                last_name: membership.last_name,
                profile_image: membership.filename_image
            }
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const getBalance = async(req,res) => {
    try{
        const membership_id = req.membership_id
        const membership = await getMembershipByIDService(membership_id)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:'Get Balance Berhasil',
            data:{
                balance:membership.balance
            }
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}
