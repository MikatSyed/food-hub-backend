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
router.get(
  '/users',
  auth(),
  AuthController.getAllUser
)
router.get(
  '/statistics',
  AuthController.getStatistics
)
router.delete(
  '/users/:id',
  auth(),
  AuthController.deleteUser
)


export const AuthRoute = router
