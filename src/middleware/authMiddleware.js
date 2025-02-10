import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ResponseStatus } from '../utils/responseHelper.js'

dotenv.config()

export const verifyToken = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace("Bearer","").replace(/ /g,'')
        if(token == undefined) {
            return res.status(401).send({
                status:ResponseStatus.INVALID_TOKEN,
                message:'Token tidak valid atau kadaluwarsa', 
                data:null
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.membership_id = decoded.membership_id
        req.email = decoded.email
        next()
    }
    catch(err){
        return res.status(401).send({
            status:ResponseStatus.INVALID_TOKEN,
            message:'Token tidak valid atau kadaluwarsa', 
            data:null
        })
    }
}