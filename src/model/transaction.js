import pool from "../config/db.js"

export const createNewTransactionService = async (invoice_number,transaction_type,service_id,total_amount,membership_id) => {
    const textInsert = " INSERT INTO transaction(invoice_number,transaction_type,service_id,total_amount,membership_id) VALUES($1,$2,$3,$4,$5) RETURNING *"
    const valuesInsert = [invoice_number,transaction_type,service_id,total_amount,membership_id]
    
    const newTransaction = await pool.query(textInsert,valuesInsert)
   
    return newTransaction.rows[0]
}

export const getDetailTransactionService = async(transaction_id) => {
    const text = `
        SELECT a.invoice_number, a.transaction_type,
            CASE 
                WHEN b.id = NULL THEN 'Top Up Balance'
            ELSE b.service_name
            END AS description, 
            a.total_amount,
            a.created_on,
            b.service_code,
            b.service_name
        FROM transaction a
        LEFT JOIN services b 
            ON a.service_id = b.id
        WHERE a.id = $1
        AND a.is_active = true
    `
    const values = [transaction_id]
    
    const transaction = await pool.query(text,values)
    return transaction.rows[0]
}

export const getDataPaginationTransactionService = async(membership_id,offset=0,limit=5) => {
    const offset_2 = offset * limit
    const text = `
        SELECT a.invoice_number, a.transaction_type,
            CASE 
                WHEN b.id IS NULL THEN 'Top Up Balance'
            ELSE b.service_name
            END AS description, 
            a.total_amount,
            a.created_on
        FROM transaction a
        LEFT JOIN services b 
            ON a.service_id = b.id
        WHERE a.membership_id = $1
        AND a.is_active = true
        ORDER BY a.created_on DESC
        LIMIT ${limit} OFFSET ${offset_2}
    `
    
    const values = [membership_id]

    const transaction = await pool.query(text,values)
    return transaction.rows
}