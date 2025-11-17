import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async (options) => {
  // Get SMTP credentials (support both naming conventions)
  const smtpUser = process.env.SMTP_USER || process.env.SMTP_EMAIL;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPass) {
    throw new Error("SMTP credentials are missing. Please set SMTP_USER (or SMTP_EMAIL) and SMTP_PASS (or SMTP_PASSWORD) in your .env file");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
  

  // Email message options
  const message = {
    from: `${process.env.FROM_NAME || "VEXO"} <${process.env.FROM_EMAIL || smtpUser}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // Send email
  const info = await transporter.sendMail(message);

  return {
    success: true,
    messageId: info.messageId,
  };
};

export default sendEmail;

