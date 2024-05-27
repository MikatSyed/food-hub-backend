
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

  if(result){
    console.log('aaaa')
    res.redirect(`https://food-hub-eta.vercel.app/`);
  }
  // Return the result object
  return {
    result,
    redirectUrl: 'https://food-hub-eta.vercel.app/' // Include the redirect URL in the response
  };
};



export const PaymentController = {
  initPayment,
  paymentVerify
  
};
