import { getBannersService, getServicesModel } from "../model/information.js"
import { getResponseInternalServerError, ResponseStatus } from "../utils/responseHelper.js"


export const getBanners = async (req,res) => {
    try{
        const banners = await getBannersService()
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Sukses",
            data:banners
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const getServices = async (req,res) => {
    try{
        const services = await getServicesModel()
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:'Sukses',
            data:services
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}