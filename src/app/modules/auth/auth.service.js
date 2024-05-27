import httpStatus from 'http-status'
// import ApiError from '../../../errors/ApiError.js'
import config from '../../../config/index.js';
import { jwtHelpers } from '../../../helpers/jwtHelpers.js';
import { User } from './auth.model.js';




const socialLogin = async (payload) => {
  const {  displayName, email,photoURL,coins } = payload;

  // Check if the user exists in the database
  let isUserExist = await User.findOne({ email });

  // If the user doesn't exist and the provider is 'google'
  if (!isUserExist) {
    // Create a new user with a default of 50 coins
    const newUser = await User.create({
     
      displayName,
      email,
      photoURL,
      coins,
     
    });

    isUserExist = newUser;
  } else if (!isUserExist) {
    // If the user doesn't exist 
   
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // Create access token and refresh token
  const { _id: userId, role } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret ,
    config.jwt.expires_in 
  )




  return {
    accessToken,
   
  };
};


// const refreshToken = async (token) => {
//   //verify token

//   let verifiedToken = null
//   try {
//     verifiedToken = jwtHelpers.verifyToken(
//       token,
//       config.jwt.refresh_secret 
//     )
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token')
//   }

//   const { userId } = verifiedToken

//   // checking deleted user's refresh token

//   const isUserExist = await User.isVarifiedUserExist(userId)

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
//   }
//   //generate new token
//   const { _id: id, role } = isUserExist
//   const newAccessToken = jwtHelpers.createToken(
//     {
//       id: id,
//       role: role,
//     },
//     config.jwt.secret ,
//     config.jwt.expires_in 
//   )

//   return {
//     accessToken: newAccessToken,
//   }
// }

const getLoggedUser = async (id)=> {
  const result = await User.findById(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  return result
}

export const authService = {
  socialLogin,
  // refreshToken,
  getLoggedUser
}