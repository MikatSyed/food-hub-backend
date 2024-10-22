
import { PaymentService } from './payment.service.js';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse.js'

const initPayment = async (req, res) => {
  const userId = req.user.userId
  const result = await PaymentService.initPayment(req.body,userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Recipe retrieved successfully !',
    data: result,
  })
};

const paymentVerify = async (req, res) => {
  const result = await PaymentService.paymentVerify();
  // Redirect the user to the specified URL

  const environment = process.env.NODE_ENV || 'development';
  console.log(environment,'222222222222222')

  const redirectUrl =
  environment === 'production'
    ? 'https://food-hub-eta.vercel.app/'
    : 'http://localhost:5173/';

  if(result){
    console.log('aaaa')
    res.redirect(redirectUrl);
  }
  // Return the result object
  return {
    result,
    redirectUrl: redirectUrl // Include the redirect URL in the response
  };
};



export const PaymentController = {
  initPayment,
  paymentVerify
  
};
