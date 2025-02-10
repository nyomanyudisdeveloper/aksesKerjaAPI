import express from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { validateTopUpAmount } from "../middleware/membershipMiddleware.js"
import { getTransactionHistory, topUp, transaction } from "../controllers/transactionController.js"
import { validateServiceID } from "../middleware/transactionMiddleware.js"

const routes = express.Router()

/**
 * @swagger
 * /topup:
 *   post:
 *     tags:
 *        - 3. Module Transaction
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Topup Private (memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk melakukan top up balance / saldo dari User</p>
 *              <p><i>Ketentuan :</i></p>
 *              <ol>
 *                  <li>Service ini harus menggunakan <b>Bearer Token JWT</b> untuk mengaksesnya</li>
 *                  <li>Tidak ada parameter membership id di query param url ataupun request body, parameter membership id diambil dari payload JWT yang didapatkan dari hasil login</li>
 *                  <li>Setiap kali melakukan Top Up maka balance / saldo dari User otomatis bertambah</li>
 *                  <li>Parameter <b>amount</b> hanya boleh angka saja dan tidak boleh lebih kecil dari 0</li>
 *                  <li>Pada saat Top Up set transaction_type di database menjadi <b>TOPUP</b></li>
 *              </ol>
 *          </div>
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      top_up_amount:
 *                          type: int
 *                          description: amount
 *                          example: 10000
 *     responses:
 *       200:
 *         description: Berhasil Login
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
 *                   example: "Top Up Balance berhasil"
 *                 data:
 *                   type: object
 *                   example: {"balance": 2000000}
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
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: "Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0"
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
routes.post("/topup",verifyToken,validateTopUpAmount,topUp)

/**
 * @swagger
 * /transaction:
 *   post:
 *     tags:
 *        - 3. Module Transaction
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Transaction Private (memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk melakukan transaksi dari services / layanan yang tersedia</p>
 *              <p><i>Ketentuan :</i></p>
 *              <ol>
 *                  <li>Service ini harus menggunakan <b>Bearer Token JWT</b> untuk mengaksesnya</li>
 *                  <li>Tidak ada parameter membership id di query param url ataupun request body, parameter membership id diambil dari payload JWT yang didapatkan dari hasil login</li>
 *                  <li>Setiap kali melakukan Transaksi harus dipastikan balance / saldo mencukupi</li>
 *                  <li>Pada saat Transaction set transaction_type di database menjadi <b>PAYMENT</b></li>
 *              </ol>
 *          </div>
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      service_id:
 *                          type: int
 *                          description: service_id
 *                          example: 1
 *     responses:
 *       200:
 *         description: Berhasil Login
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
 *                   example: "Transaksi berhasil"
 *                 data:
 *                   type: object
 *                   example: {"invoice_number": "INV17082023-001","service_code": "PLN_PRABAYAR","service_name": "PLN Prabayar","transaction_type": "PAYMENT","total_amount": 10000,"created_on": "2023-08-17T10:10:10.000Z"}
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
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 102
 *                 message:
 *                   type: string
 *                   example: "Service ataus Layanan tidak ditemukan"
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
routes.post("/transaction",verifyToken,validateServiceID,transaction)

/**
 * @swagger
 * /transaction/history:
 *   get:
 *     tags:
 *        - 3. Module Transaction
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *           - name: offset
 *             in: query
 *             schema:
 *                 type: integer
 *                 example: 0
 *           - name: limit
 *             in: query
 *             schema:
 *                 type: integer
 *                 example: 3
 *     description: 
 *          <div>
 *              <b>API History Private (memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk mendapatkan informasi history transaksi</p>
 *              <p><i>Ketentuan :</i></p>
 *              <ol>
 *                  <li>Service ini harus menggunakan <b>Bearer Token JWT</b> untuk mengaksesnya</li>
 *                  <li>Tidak ada parameter membership id di query param url ataupun request body, parameter membership id diambil dari payload JWT yang didapatkan dari hasil login</li>
 *                  <li>Terdapat parameter limit yang bersifat opsional, jika limit tidak dikirim maka tampilkan semua data</li>
 *                  <li>Data di order dari yang paling baru berdasarkan transaction date (created_on)</li>
 *              </ol>
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
 *                   example: "Get Balance Berhasil"
 *                 data:
 *                   type: object
 *                   example: {"offset": 0, "limit": "1","records": [{ "invoice_number": "1733734518694","transaction_type": "PAYMENT","description": "Pulsa","total_amount": 40000,"created_on": "2024-12-09T08:55:18.694Z"}]}
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
routes.get("/transaction/history",verifyToken,getTransactionHistory)

export default routes