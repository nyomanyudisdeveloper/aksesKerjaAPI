import express from 'express'
import { getBalance, getProfile, login, registration, updateProfile, updateProfileImage } from '../controllers/membershipController.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import { checkEmailAndPasswordExists, checkFirstAndLastNameExists, validateEmailAndPassword } from '../middleware/membershipMiddleware.js'

import {checkFileIsImage} from '../middleware/fileUploadMiddleware.js'

const routes = express.Router()

/**
 * @swagger
 * /registration:
 *   post:
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Registration Public (Tidak perlu Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk melakukan registrasi User agar bisa Login kedalam aplikasi</p>
 *              <p><i>Ketentuan :</i></p>
 *              <ol>
 *                  <li>Parameter request <b>email</b> harus terdapat validasi format email</li>
 *                  <li>Parameter request <b>password</b> Length minimal 8 karakter</li>
 *              </ol>
 *          </div>
 *          
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: The user email 
 *                          example: test@mailinator.com
 *                      password:
 *                          type: string
 *                          description: The user password 
 *                          example: admin123
 *                      first_name:
 *                          type: string
 *                          description: The user role 
 *                          example: admin
 *                      last_name:
 *                          type: string
 *                          description: The user role 
 *                          example: admin
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
 *                   example: "Registrasi berhasil silahkan login"
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
 *                   example: "Parameter email tidak sesuai format"
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
routes.post("/registration",validateEmailAndPassword,registration)

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Login Public (Tidak perlu Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk melakukan login dan mendapatkan authentication berupa JWT (Json Web Token)</p>
 *          </div>
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      email:
 *                          type: string
 *                          description: The user email 
 *                          example: test@mailinator.com
 *                      password:
 *                          type: string
 *                          description: The user password 
 *                          example: admin123
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
 *                   example: "Login Sukses"
 *                 data:
 *                   type: object
 *                   example: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNTRVdXRjYTdCS0ZPX0ZUZGZ1bXlJem9zSTRKa1VxUGZVZ0ROSTUwelRTQlo2aHoyY0hKZ1VMb1loM09HUUd0ekQxV3dTX194aHBNZTE2SGFscVRzcEhjS21UclJ3S2FYYmZob3AzdzFFUHJ2NFdBQmk1c0RpdV9DSnZTSWt2MDFTbEU0QU5pbVB0bUx5azZoUzlOalVQNEZaVVpfRVBtcEk4Y3pNc3ZWa2JFPSIsImlhdCI6MTYyNjkyODk3MSwiZXhwIjoyNTU2MTE4Nzk4fQ.9C9NvhZYKivhGWnrjo4Wr1Rv-wur1wCm0jqfK9XDD8U"}
 *       401:
 *         description: Unathorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 103
 *                 message:
 *                   type: string
 *                   example: "Username atau password salah"
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
 *                   example: "Parameter email tidak sesuai format"
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
routes.post("/login",checkEmailAndPasswordExists,login)

/**
 * @swagger
 * /profile:
 *   get:
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Profile Private (memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk mendapatkan informasi profile User</p>
 *              <p><i>Ketentuan :</i></p>
 *              <ol>
 *                  <li>Service ini harus menggunakan <b>Bearer Token JWT</b> untuk mengaksesnya</li>
 *                  <li>Tidak ada parameter membership id di query param url ataupun request body, parameter membership id diambil dari payload JWT yang didapatkan dari hasil login</li>
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
 *                   example: "Registrasi berhasil silahkan login"
 *                 data:
 *                   type: object
 *                   example: {"email":"user@nutech-integrasi.com","first_name":"User","last_name":"Nutech","profile_image":"https://yoururlapi.com/profile.jpeg"}
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
routes.get("/profile",verifyToken,getProfile)

/**
 * @swagger
 * /profile/update:
 *   put:
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Update Profile Private (memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk mengupdate data profile User</p>
 *              <p><i>Ketentuan :</i></p>
 *              <ol>
 *                  <li>Service ini harus menggunakan <b>Bearer Token JWT</b> untuk mengaksesnya</li>
 *                  <li>Tidak ada parameter membership id di query param url ataupun request body, parameter membership id diambil dari payload JWT yang didapatkan dari hasil login</li>
 *              </ol>
 *          </div>
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      first_name:
 *                          type: string
 *                          description: The user email 
 *                          example: test@mailinator.com
 *                      last_name:
 *                          type: string
 *                          description: The user password 
 *                          example: admin123
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
 *                   example: "Update Profile Berhasil"
 *                 data:
 *                   type: object
 *                   example: {"email": "user@nutech-integrasi.com","first_name":"User Edited","last_name":"Nutech Edited","profile_image":"https://yoururlapi.com/profile.jpeg"}
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
 *                   example: "Parameter last_name harus diisi"
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
routes.put("/profile/update",verifyToken,checkFirstAndLastNameExists,updateProfile)

/**
 * @swagger
 * /profile/image:
 *   put:
 *     tags:
 *        - 1. Module Membership
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Upload Profile Image Private (memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk mengupdate / upload profile image User</p>
 *              <p><i>Ketentuan :</i></p>
 *              <ol>
 *                  <li>Service ini harus menggunakan <b>Bearer Token JWT</b> untuk mengaksesnya</li>
 *                  <li>Tidak ada parameter membership id di query param url ataupun request body, parameter membership id diambil dari payload JWT yang didapatkan dari hasil login</li>
 *                  <li>Format Image yang boleh di upload hanya <b>jpeg</b> dan <b>png</b></li>
 *              </ol>
 *          </div>
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
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
 *                   example: "Update Profile Berhasil"
 *                 data:
 *                   type: object
 *                   example: {"email": "user@nutech-integrasi.com","first_name":"User Edited","last_name":"Nutech Edited","profile_image":"https://yoururlapi.com/profile.jpeg"}
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
 *                   example: "Format Image tidak sesuai"
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
routes.put("/profile/image",verifyToken, checkFileIsImage,updateProfileImage)


/**
 * @swagger
 * /balance:
 *   get:
 *     tags:
 *        - 3. Module Transaction
 *     security:
 *       - BearerAuth: []
 *     description: 
 *          <div>
 *              <b>API Balance Private (memerlukan Token untuk mengaksesnya)</b>
 *              <p>Digunakan untuk mendapatkan informasi balance / saldo terakhir dari User</p>
 *              <p><i>Ketentuan :</i></p>
 *              <ol>
 *                  <li>Service ini harus menggunakan <b>Bearer Token JWT</b> untuk mengaksesnya</li>
 *                  <li>Tidak ada parameter membership id di query param url ataupun request body, parameter membership id diambil dari payload JWT yang didapatkan dari hasil login</li>
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
 *                   example: {"balance":100000}
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
routes.get("/balance",verifyToken,getBalance)


export default routes