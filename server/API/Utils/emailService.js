import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Validate SMTP credentials
const smtpUser = process.env.SMTP_USER || process.env.SMTP_EMAIL;
const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;


if (!smtpUser || !smtpPass) {
    throw new Error("SMTP credentials are missing. Please set SMTP_USER (or SMTP_EMAIL) and SMTP_PASS (or SMTP_PASSWORD) in your .env file");
  }
  // Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false, // true for 465, false for other ports
  auth: smtpUser && smtpPass ? {
    user: smtpUser,
    pass: smtpPass,
  } : undefined,
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email service error:", error);
  } else {
    console.log("Email service is ready to send messages");
  }
});


export const sendVerificationEmail = async (email, token, firstName) => {
  try {
    // Check if credentials are available
    if (!smtpUser || !smtpPass) {
      return {
        success: false,
        error: "SMTP credentials are not configured",
      };
    }

    const clientUrl = process.env.CLIENT_API_URL || "http://localhost:5173";
    const verificationUrl = `${clientUrl}/verify-token?token=${token}&email=${email}`;

    const mailOptions = {
      from: `"VEXO" <${smtpUser || process.env.FROM_EMAIL || "noreply@vexo.com"}>`,
      to: email,
      subject: "Verify Your VEXO Account",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Account</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">VEXO</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${firstName}!</h2>
            <p>Thank you for signing up with VEXO. To complete your registration and verify your email address, please click the button below:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Verify Email Address</a>
            </div>
            <p style="color: #666; font-size: 14px;">Or copy and paste this link into your browser:</p>
            <p style="color: #667eea; word-break: break-all; font-size: 12px;">${verificationUrl}</p>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">This link will expire in 24 hours. If you didn't create an account with VEXO, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">© ${new Date().getFullYear()} VEXO. All rights reserved.</p>
          </div>
        </body>
        </html>
      `,
      text: `
        Hello ${firstName}!
        
        Thank you for signing up with VEXO. To complete your registration and verify your email address, please click the link below:
        
        ${verificationUrl}
        
        This link will expire in 24 hours. If you didn't create an account with VEXO, please ignore this email.
        
        © ${new Date().getFullYear()} VEXO. All rights reserved.
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default transporter;

