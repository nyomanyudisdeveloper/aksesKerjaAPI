import { getServiceByID } from "../model/information.js"
import { getMembershipByIDService } from "../model/membership.js"
import { ResponseStatus } from "../utils/responseHelper.js"


export const validateServiceID = async (req,res,next) => {
    const {service_id} = req.body
    const membership_id = req.membership_id
    if(!service_id){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Parameter service_id harus diisi",
            data:null
        })
    }
    const service = await getServiceByID(service_id)
    if(!service){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Service atau layanan tidak ditemukan",
            data:null
        })
    }
    const {service_tarif} = service
    
    const membership = await getMembershipByIDService(membership_id)
    const {balance} = membership
    if(balance < service_tarif){
        return res.status(400).send({
            status:ResponseStatus.BAD_REQUEST,
            message:"Saldo balance tidak cukup untuk membayar service atau layanan ini",
            data:null
        })
    }
    req.data = {
        amount:service.service_tarif,
        service_id:service_id
    }
    next()
}