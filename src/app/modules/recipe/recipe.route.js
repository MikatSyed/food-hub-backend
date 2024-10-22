import express from 'express'
import {RecipeController} from "./recipe.controller.js"
import auth from '../../middlewares/auth.js'


const router = express.Router()

router.patch(
  '/update/:id',
  // validateRequest(RecipeValidation.updateRecipeZodSchema),
  auth(),
  RecipeController.updateRecipe
)

router.post(
  '/',
  // validateRequest(RecipeValidation.createRecipeZodSchema),
  auth(),
  RecipeController.createRecipe
)

router.get(
  '/',
  RecipeController.getAllRecipes
)
router.get(
  '/:id',
  // auth(),
  RecipeController.getSingleRecipe
)
router.get(
  '/suggestion/:id',
  
  RecipeController.getSuggestionedRecipe
)
router.post(
  '/:recipeId/purchase',
  auth(),
  RecipeController.purchaseRecipe
)
router.post(
  '/react/:recipeId/liked',
  auth(),
  RecipeController.reactRecipe
)
router.delete('/:id', auth(), RecipeController.deleteRecipe)

export const RecipeRoute = router
