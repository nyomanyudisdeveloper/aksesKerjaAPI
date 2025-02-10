import express from 'express'
import { getBalance, getProfile, login, registration, updateProfile, updateProfileImage } from '../controllers/membershipController.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import { checkEmailAndPasswordExists, checkFirstAndLastNameExists, validateEmailAndPassword } from '../middleware/membershipMiddleware.js'

import {checkFileIsImage} from '../middleware/fileUploadMiddleware.js'
import { registrationUserController } from '../controllers/userController.js'

const routes = express.Router()

routes.post("/registration",validateEmailAndPassword,registrationUserController)

export default routes