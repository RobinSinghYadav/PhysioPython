import express from 'express';
import { registerUser,VerifyEmail,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorPay, verifyRazorPay } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/verifyEmail',VerifyEmail); 


userRouter.post('/login', loginUser);

userRouter.get('/get-profile', authUser, getProfile);

userRouter.post('/update-profile',upload.single('image'),authUser, updateProfile);
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorPay)
userRouter.post('/verfiyRazorpay',authUser,verifyRazorPay)



export default userRouter;