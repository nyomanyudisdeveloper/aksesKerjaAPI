import pool from "../config/db.js";

export const registrationUserService = async (email,full_name,password) => {
    const text = 'INSERT INTO users (email,full_name,password) VALUES ($1,$2,$3) RETURNING *'
    const values = [email,full_name,password]

    const res = await pool.query(text,values)
    return res.rows[0]
}


export const getUserByEmailService = async(email) => {
    const text = "SELECT * FROM users WHERE email = $1 and is_active = true"
    const values = [email]
    
    const res = await pool.query(text,values)
    return res.rows[0]
}