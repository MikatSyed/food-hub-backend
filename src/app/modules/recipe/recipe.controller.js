
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import {RecipeService} from "./recipe.service.js"
import pick from '../../../shared/pick.js'
import { RecipeFilterableFields, queryFields } from '../../../constants/pagination.js'

const createRecipe = catchAsync(async (req, res, next) => {
  try {
    console.log(req.body,'11')
    const { ...RecipeData } = req.body
    const id = req.user.userId

    const result = await RecipeService.createRecipe(RecipeData,id)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Recipe created successfully!',
      data: result,
    })
  } catch (err) {
    next(err)
  }
})

const getAllRecipes = catchAsync(async (req, res) => {
  const filters = pick(req.query, RecipeFilterableFields)
  const queryOptions = pick(req.query, queryFields)

  const result = await RecipeService.getAllRecipes(filters, queryOptions)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipes retrieved successfully !',
    meta: result?.meta,
    data: result?.data,
  })
})

const getSingleRecipe = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await RecipeService.getSingleRecipe(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully !',
    data: result,
  })
})

const getSuggestionedRecipe = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await RecipeService.getSuggestionedRecipe(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully !',
    data: result,
  })
})

const purchaseRecipe = catchAsync(async (req, res) => {
  const  recipeId  = req.params.recipeId;
  const userId = req.user.userId;

  const result = await RecipeService.purchaseRecipe(userId,recipeId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully !',
    data: result,
  })
})

const updateRecipe = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await RecipeService.updateRecipe(id, updatedData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe updated successfully !',
    data: result,
  })
})

const deleteRecipe = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await RecipeService.deleteRecipe(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe deleted successfully !',
    data: result,
  })
})

export const RecipeController = {
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
  getSuggestionedRecipe,
  purchaseRecipe,
  updateRecipe,
  deleteRecipe,
}
