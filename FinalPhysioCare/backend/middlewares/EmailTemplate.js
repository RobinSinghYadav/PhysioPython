export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f0f9ff;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #00796b;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 28px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              color: #333;
              line-height: 1.8;
          }
          .verification-code {
              display: block;
              margin: 20px 0;
              font-size: 22px;
              color: #00796b;
              background: #e0f2f1;
              border: 1px dashed #00796b;
              padding: 15px;
              text-align: center;
              border-radius: 5px;
              font-weight: bold;
              letter-spacing: 2px;
          }
          .footer {
              background-color: #f9f9f9;
              padding: 15px;
              text-align: center;
              color: #555;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Email Verification - PhysioCare</div>
          <div class="content">
              <p>Hello,</p>
              <p>Thank you for registering with <strong>PhysioCare</strong>. To access your account and explore our online physiotherapy services, please verify your email address using the code below:</p>
              <span class="verification-code">{verificationCode}</span>
              <p>If you didn’t sign up for PhysioCare, please ignore this email. For assistance, feel free to reach out to our support team.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} PhysioCare. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;
export const Welcome_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to PhysioCare</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f0f9ff;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 30px auto;
              background: #ffffff;
              border-radius: 10px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              border: 1px solid #ddd;
          }
          .header {
              background-color: #004d40;
              color: white;
              padding: 20px;
              text-align: center;
              font-size: 28px;
              font-weight: bold;
          }
          .content {
              padding: 25px;
              line-height: 1.8;
          }
          .welcome-message {
              font-size: 18px;
              margin: 20px 0;
              color: #00796b;
          }
          .button {
              display: inline-block;
              padding: 12px 25px;
              margin: 20px 0;
              background-color: #00796b;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s;
          }
          .button:hover {
              background-color: #005b4f;
              color: white;
          }
          .footer {
              background-color: #f9f9f9;
              padding: 15px;
              text-align: center;
              color: #555;
              font-size: 12px;
              border-top: 1px solid #ddd;
          }
          p {
              margin: 0 0 15px;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">Welcome to PhysioCare!</div>
          <div class="content">
              <p class="welcome-message">Hello {name},</p>
              <p>We’re delighted to have you join <strong>PhysioCare</strong>, your trusted platform for online physiotherapy consultation and posture correction. We’re committed to helping you on your journey to better health and wellness.</p>
              <p>Here’s how to get started:</p>
              <ul>
                  <li>Book appointments with top physiotherapy professionals.</li>
                  <li>Access posture correction tools and health tips.</li>
                  <li>Reach out to our support team for any assistance.</li>
              </ul>
              <a href="https://final-physio-care.vercel.app/" class="button">Explore PhysioCare</a>
              <p>If you have any questions or need help, feel free to contact us anytime. We’re here to ensure your experience with PhysioCare is seamless and effective.</p>
          </div>
          <div class="footer">
              <p>&copy; ${new Date().getFullYear()} PhysioCare. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;
