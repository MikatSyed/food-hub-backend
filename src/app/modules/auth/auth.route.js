import express from 'express'
import { AuthController } from './auth.controller.js'
import auth from '../../middlewares/auth.js'


const router = express.Router()


router.post(
  '/login',
  AuthController.socialLogin
)

// router.post(
//   '/refresh-token',
//   AuthController.refreshToken
// )

router.get(
  '/profile',
  auth(),
  AuthController.getLoggedUser
)

export const AuthRoute = router
