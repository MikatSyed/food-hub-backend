import express from 'express';
import { PaymentController } from './payment.controller.js';
import auth from '../../middlewares/auth.js';


const router = express.Router();

router.post('/success', PaymentController.paymentVerify);
router.post('/init',auth(), PaymentController.initPayment);



export const paymentRoutes = router;
