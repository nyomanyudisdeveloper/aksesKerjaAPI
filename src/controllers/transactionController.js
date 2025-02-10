import { paymentBalanceMembershipService, topUpBalanceMembershipService } from "../model/membership.js"
import { createNewTransactionService, getDataPaginationTransactionService, getDetailTransactionService } from "../model/transaction.js"
import { getResponseInternalServerError, ResponseStatus } from "../utils/responseHelper.js"
import { v1 as uuidv4} from "uuid"
import { TransactionStatus } from "../utils/transactionHelper.js"
import sendEmail from "../utils/sendEmail.js"
import { templateTopSuccess, templateTransactionServiceSuccess } from "../utils/templateHTML/index.js"
import { getFormatDateToString } from "../utils/stringHelper.js"

export const topUp = async (req,res,next) => {
    try{
        const invoice_number = uuidv4()
        const {top_up_amount} = req.body
        const membership_id = req.membership_id
        const email = req.email
        const membership = await topUpBalanceMembershipService(membership_id,top_up_amount)
        const transaction = await createNewTransactionService(invoice_number,TransactionStatus.TOPUP,null,top_up_amount,membership_id)

        const templateHTML = templateTopSuccess(membership.first_name,membership.last_name,top_up_amount,membership.balance)

        await sendEmail(membership.email,'Transaction Top Up Amount Success',templateHTML)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Top Up Balance berhasil",
            data:{
                balance:membership.balance
            }
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const transaction = async (req,res) => {
    try{
        const {service_id,amount} = req.data
        const membership_id = req.membership_id
        const invoice_number = uuidv4()

        const membership = await paymentBalanceMembershipService(membership_id,amount)
        const newTransaction = await createNewTransactionService(invoice_number,TransactionStatus.PAYMENT,service_id,amount,membership_id)

        const transactionDetail = await getDetailTransactionService(newTransaction.id)
        const templateHTML = templateTransactionServiceSuccess(
            membership.first_name,membership.last_name,
            transactionDetail.invoice_number,transactionDetail.service_code,
            transactionDetail.service_name,transactionDetail.total_amount,getFormatDateToString(transactionDetail.created_on))

        await sendEmail(membership.email,'Transaction Service Success',templateHTML)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Transaksi Berhasil",
            data:{
                invoice_number:transactionDetail.invoice_number,
                service_code:transactionDetail.service_code,
                service_name:transactionDetail.service_name,
                transaction_type:transactionDetail.transaction_type,
                total_amount:transactionDetail.total_amount,
                created_on: transactionDetail.created_on
            }
        })
    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}

export const getTransactionHistory = async(req,res,next) => {
    try{
        const {offset,limit} = req.query
        var param_offset = 0
        var param_limit = 5
        if(offset){
            param_offset = offset
        }
        if(limit){
            param_limit = limit
        }
        const membership_id = req.membership_id
        const transaction_history = await getDataPaginationTransactionService(membership_id,param_offset,param_limit)
        return res.status(200).send({
            status:ResponseStatus.SUCCESS,
            message:"Get History Berhasil",
            data:{
                offset:param_offset,
                limit:param_limit,
                records:transaction_history
            }
        })

    }
    catch(err){
        return res.status(500).send(getResponseInternalServerError())
    }
}