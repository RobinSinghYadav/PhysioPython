import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "guptashivamsg02@gmail.com",
    pass: "nztc axhv geks lmjl",
  },
});


  
