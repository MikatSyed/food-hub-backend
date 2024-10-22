
import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError.js'
import { jwtHelpers } from '../../helpers/jwtHelpers.js'
import config from '../../config/index.js'


const auth =
  () =>
  async (req, res, next) => {
    try {
      //get authorization token
      const token = req.headers.authorization
      console.log(token,'14')
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }
      // verify token
      let verifiedUser = null

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret )

      req.user = verifiedUser // role , userid

    
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
