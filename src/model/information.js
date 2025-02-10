import pool from "../config/db.js";

export const getBannersService = async () => {
    const text = "SELECT banner_name, banner_image, description FROM banners WHERE is_active=true"

    const res = await pool.query(text)
    return res.rows
}

export const getServicesModel = async () => {
    const text = "SELECT service_code,service_name,service_icon,service_tarif FROM services WHERE is_active=true"

    const res = await pool.query(text)
    return res.rows
}

export const getServiceByID = async (service_id) => {
    const text = "SELECT service_code,service_name,service_icon,service_tarif FROM services WHERE id=$1 AND is_active=true"
    const values = [service_id]

    const res = await pool.query(text,values)
    return res.rows[0]
}