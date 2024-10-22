import express from 'express'
import auth from '../../middlewares/auth.js'
import { ReviewController } from './review.controller.js'


const router = express.Router()


router.post(
  '/',
  auth(),
  ReviewController.postReview
)

router.get(
    '/:id',
    auth(),
    ReviewController.getReviewByServiceId
  );

// router.get(
//   '/:id',
//   // auth(),
//   RecipeController.getSingleRecipe
// )



export const ReviewRoute = router
