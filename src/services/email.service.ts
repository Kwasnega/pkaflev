import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmailNotification = async (to: string, subject: string, messageHtml: string) => {
  try {
    await transporter.sendMail({
      from: `"Store Management" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: messageHtml,
    });
    console.log(`Email notification sent successfully to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
  }
};