import express from 'express'
import {AuthRoute} from "../modules/auth/auth.route.js"
import { RecipeRoute } from '../modules/recipe/recipe.route.js'
import { paymentRoutes } from '../modules/payment/payment.route.js'



const router = express.Router()

const moduleRoutes = [

  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/recipe',
    route: RecipeRoute,
  },
  {
    path: '/payment',
    route: paymentRoutes,
  },

]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
