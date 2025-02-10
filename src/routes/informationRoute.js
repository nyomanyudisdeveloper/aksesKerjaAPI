import express from 'express'
import { getBanners, getServices } from '../controllers/informationController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const routes = express.Router()

/**
 * @swagger
 * /banner:
 *   get:
 *     tags:
 *        - 2. Module Information
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Banner Public (tidak memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk mendapatkan list banner</p>
 *          </div>
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Sukses"
 *                 data:
 *                   type: object
 *                   example: [{"banner_name": "Banner 1","banner_image": "https://nutech-integrasi.app/dummy.jpg","description": "Lerem Ipsum Dolor sit amet"}]
 *       401:
 *         description: Unathorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: "Token tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   example: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 data:
 *                   type: object
 *                   example: null
 */
routes.get("/banner",verifyToken,getBanners)

/**
 * @swagger
 * /services:
 *   get:
 *     tags:
 *        - 2. Module Information
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Services Private (memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk mendapatkan list Service/Layanan PPOB</p>
 *          </div>
 *     responses:
 *       200:
 *         description: Request Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Sukses"
 *                 data:
 *                   type: object
 *                   example: [ {"service_code": "PAKET_DATA","service_name": "Paket data","service_icon": "https://nutech-integrasi.app/dummy.jpg","service_tariff": 50000}]
 *       401:
 *         description: Unathorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 108
 *                 message:
 *                   type: string
 *                   example: "Token tidak valid atau kadaluwarsa"
 *                 data:
 *                   type: object
 *                   example: null
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 data:
 *                   type: object
 *                   example: null
 */
routes.get("/services",verifyToken,getServices)
export default routes