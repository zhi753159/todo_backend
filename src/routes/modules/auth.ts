import express from 'express'

// Import middlewares
import auth from '../../middlewares/auth'

// Import controllers
import * as authController from '../../controllers/auth'

const router = express.Router()

router.post('/login', authController.login)
router.get('/logout', auth, authController.logout)
router.get('/test', auth, authController.test)

export default router