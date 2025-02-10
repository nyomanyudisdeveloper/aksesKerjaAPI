import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

async function sendEmail(targetEmail,subject,templateHTML) {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server of your email provider
    port: 465, // Port (use 465 for secure, 587 for TLS)
    secure: true, // true for 465, false for 587
    auth: {
      user: process.env.SMTP_EMAIL, // Your email address
      pass: process.env.SMTP_APP_PASSWORD, // Your email password or app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: `Contract SIM ${process.env.SMTP_EMAIL}`, // Sender's address
    to: targetEmail, // Receiver's address
    subject: subject, // Subject line
    html: templateHTML, // HTML body
  };

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export default sendEmail
