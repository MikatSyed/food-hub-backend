
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
  console.log(result, 'aaaaa');
  // Check if the update was successful
  if (result) {
    // Send a success response
    // sendResponse(res, {
    //   success: true,
    //   statusCode: httpStatus.OK,
    //   message: 'Payment verified!',
    //   data: result,
    // });
console.log("hitted")
    // Redirect after sending the response
    res.redirect(
      `http://home-crafter.vercel.app/`
    );
  } else {
    // Handle the case where the update failed
    sendResponse(res, {
      success: false,
      statusCode: 200,
      message: 'Payment verification failed',
    });
  }
};



export const PaymentController = {
  initPayment,
  paymentVerify
  
};
