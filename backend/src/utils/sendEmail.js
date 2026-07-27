import nodeMailer from "nodemailer";
export const sendEmail = async (options) => {
  // Create a transporter object. This handles communication with the email service
  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_SERVICE,

    // Authentication credentials for the email account
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email configuration
  const mailOptions = {
    // Sender's email/service
    from: process.env.SMTP_SERVICE,

    // Recipient's email address
    to: options.email,

    // Email subject line
    subject: options.subject,

    // Plain text email content
    text: options.message,
  };
  // Send the email. Returns a promise that resolves when the email is sent
  await transporter.sendMail(mailOptions);
};
