import httpStatus from 'http-status'
import {Recipe} from "./recipe.model.js"
import ApiError from '../../../errors/ApiError.js';
import { queryHelpers } from '../../../helpers/paginationHelpers.js';
import { User } from '../auth/auth.model.js';
import { recipeSearchableFields } from './recipe.constant.js';

const createRecipe = async (user, userId) => {

  // Find the user by ID
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    throw new Error('User not found');
  }

  // Set the creatorEmail to the found user's email
  user.creatorEmail = foundUser.email;

  // Create the new recipe
  const newRecipe = await Recipe.create(user);
  return newRecipe;
};


const getAllRecipes = async (filters, queryOptions) => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, sortBy, sortOrder } = queryHelpers.calculateQuery(queryOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: recipeSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }


  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  // Specify the fields to include in the projection
  const projection = {
    recipeName: 1,
    recipeImage: 1,
    purchased_by: 1,
    creatorEmail: 1,
    country: 1,
    category:1
  };

  const result = await Recipe.find(whereConditions)
    .select(projection)
    .sort(sortConditions);

  // Implement pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResult = result.slice(startIndex, endIndex);

  const total = await Recipe.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: paginatedResult,
  };
};

const getSingleRecipe = async (id) => {
  const result = await Recipe.findById(id)
  return result;
};

const getSuggestionedRecipe = async (id) => {
 
  const result = await Recipe.findById(id);
  if (!result) {
    throw new Error('Recipe not found');
  }
  
  // Extract category and country from the result
  const { category, country } = result;
  console.log(category,category)

  // Find other recipes with the same category or country
  const suggestedRecipes = await Recipe.find({
    $or: [
      { category },
      { country }
    ],
   // Exclude the current recipe from suggestions
  }).limit(5); // Limiting to 5 suggestions
  
  return suggestedRecipes;
};


const purchaseRecipe = async (userId, recipeId) => {

  const userInfo = await User.findById(userId);
  console.log(userInfo,'122')

  const recipe = await Recipe.findById(recipeId);
  if (!recipe) {
    throw new Error('Recipe not found');
  }

  if (recipe.purchased_by.includes(userInfo.email)) {
    throw new Error('Recipe already purchased');
  }

  const user = await User.findOne({ email: userInfo.email });
  if (!user) {
    throw new Error('User not found');
  }

  if (user.coins < 10) {
    throw new Error('Insufficient coins');
  }

  // Deduct 10 coins from user
  user.coins -= 10;
  await user.save();

  // Add 1 coin to the creator
  const creator = await User.findOne({ email: recipe.creatorEmail });
  if (creator) {
    creator.coins += 1;
    await creator.save();
  }

  // Update the recipe
  recipe.purchased_by.push(userInfo.email);
  recipe.watchCount += 1;
  await recipe.save();

  return { user, recipe };
};

const updateRecipe = async (id, payload) => {
  const isExist = await Recipe.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Recipe not found !');
  }

  const { ...RecipeData } = payload;

  const updatedRecipeData = { ...RecipeData };

  const result = await Recipe.findOneAndUpdate({ _id: id }, updatedRecipeData, {
    new: true,
  }).populate('seller');

  return result;
};

const deleteRecipe = async (id) => {
  const result = await Recipe.findByIdAndDelete({ _id: id }).populate('seller');
  return result;
};

export const RecipeService = {
  createRecipe,
  getAllRecipes,
  getSingleRecipe,
  getSuggestionedRecipe,
  purchaseRecipe,
  updateRecipe,
  deleteRecipe,
};