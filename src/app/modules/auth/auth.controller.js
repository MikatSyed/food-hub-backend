
import httpStatus from 'http-status'
import config from '../../../config/index.js'
import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import { authService } from './auth.service.js'



const socialLogin = catchAsync(async (req, res) => {
  const { ...loginData } = req.body
  const result = await authService.socialLogin(loginData)
  const { refreshToken, ...others } = result

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  })
})

// const refreshToken = catchAsync(async (req, res) => {
//   const { refreshToken } = req.cookies

//   const result = await authService.refreshToken(refreshToken)

//   // set refresh token into cookie

//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   }

//   res.cookie('refreshToken', refreshToken, cookieOptions)

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'User logged in successfully',
//     data: result,
//   })
// })

const getLoggedUser = catchAsync(async (req, res) => {
  const id = req.user.userId


  const result = await authService.getLoggedUser(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  })
})

export const AuthController = {

  socialLogin,
  // refreshToken,
  getLoggedUser
}
