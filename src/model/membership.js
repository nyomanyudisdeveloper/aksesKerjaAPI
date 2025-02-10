import pool from "../config/db.js";

export const registrationService = async (email,first_name,last_name,password) => {
    const text = 'INSERT INTO membership (email,first_name,last_name,password) VALUES ($1,$2,$3,$4) RETURNING *'
    const values = [email,first_name,last_name,password]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const getMembershipByIDService = async(id) => {
    const text = "SELECT * FROM membership WHERE id = $1 and is_active = true"
    const values = [id]
    
    const res = await pool.query(text,values)
    return res.rows[0]
}

export const updateMembershipLimitLoginService = async(limit_login,id) => {
    const text = "UPDATE membership SET limit_login=$1 WHERE id=$2 AND is_active=true RETURNING *"
    const values= [limit_login,id]

    const res = await pool.query(text,values)
    return res.rows[0] 
}

export const resetLimitLogin = async() => {
    const text = "UPDATE membership SET limit_login = 0,block_account_date= NULL WHERE NOW() <= block_account_date + interval '1' day * 7 RETURNING *"

    const res = await pool.query(text)
    return res.rows
}

export const getMembershipByEmailService = async(email) => {
    const text = "SELECT * FROM membership WHERE email = $1 and is_active = true"
    const values = [email]
    
    const res = await pool.query(text,values)
    return res.rows[0]
}

export const updateProfileMembershipService = async(id,first_name,last_name) => {
    const text = "UPDATE membership SET first_name=$1,last_name=$2 WHERE id=$3 AND is_active=true RETURNING *"
    const values= [first_name,last_name,id]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const updateProfileImageMembershipService = async(id,filename) => {
    const text = "UPDATE membership SET fileName_image=$1 WHERE id=$2 AND is_active=true RETURNING *"
    const values = [filename,id]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const topUpBalanceMembershipService = async (id,amount) => {
    const text = "UPDATE membership SET BALANCE = (SELECT balance from membership WHERE id=$1 and is_active=true) + $2 WHERE id=$1 and is_active=true  RETURNING * "
    const values = [id,amount]

    const res = await pool.query(text,values)
    return res.rows[0]
}

export const paymentBalanceMembershipService = async (id,amount) => {
    const text = "UPDATE membership SET BALANCE = (SELECT balance from membership WHERE id=$1 and is_active=true) - $2 WHERE id=$1 and is_active=true  RETURNING * "
    const values = [id,amount]

    const res = await pool.query(text,values)
    return res.rows[0]
}