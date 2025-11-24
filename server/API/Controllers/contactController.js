import { sendEmail } from "../Utils/emailService.js";

export const submitContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, topic, message } = req.body;

    if (!firstName || !lastName || !email || !topic || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const supportEmail = process.env.SMTP_EMAIL || email;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #111">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-line">${message}</p>
      </div>
    `;

    const emailResult = await sendEmail({
      email: supportEmail,
      subject: `[Contact Form] ${topic} - ${firstName} ${lastName}`,
      html: htmlContent,
      text: `
        New Contact Form Submission

        Name: ${firstName} ${lastName}
        Email: ${email}
        ${phone ? `Phone: ${phone}` : ""}
        Topic: ${topic}
        Message:
        ${message}
      `,
    });

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: emailResult.error || "Failed to send contact message",
      });
    }

    res.status(200).json({
      success: true,
      message: "Thanks for reaching out. We'll get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending contact message",
    });
  }
};


