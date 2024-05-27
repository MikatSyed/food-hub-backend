


import { User } from '../auth/auth.model.js';
import { sslService } from '../ssl/ssl.service.js';

const initPayment = async (data,userId) => {

  const user = await User.findById(userId);

  function generateSixDigitId() {
    const timestamp = Date.now();
    const sixDigitId = timestamp % 1000000;
    const sixDigitIdString = sixDigitId.toString().padStart(6, '0');
    return sixDigitIdString;
  }

  const transactionId = generateSixDigitId();

  console.log(data, '22');
  const paymentSession = await sslService.initPayment({
    total_amount: data.total_amount,
    tran_id: transactionId,
    cus_name: user.displayName,
    cus_email: user.email,
  
  });
console.log(paymentSession,'28')


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.coins += data.coins; // Add 20 coins to the existing balance
    await user.save();

  return paymentSession.redirectGatewayURL;
  // return pdata;
};

// const paymentVerify = async (id: any) => {
//   const result = await prisma.payment.updateMany({
//     where: {
//       transactionId: id,
//     },
//     data: {
//       status: PaymentStatus.PAID,
//     },
//   });

//   // Return the result or use it in the calling function
//   return result;
// };

const paymentVerify = async () => {
  return " i am working"
};

export const PaymentService = {
  initPayment,
  paymentVerify
};
