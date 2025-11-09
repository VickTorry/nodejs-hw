import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'sandbox.smtp.mailtrap.io',
  port: Number(process.env.SMTP_PORT) || 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((err) => {
  if (err) console.error('SMTP connection failed:', err);
  else console.log('SMTP server ready');
});

export const sendEmail = async (options) => {
  return transporter.sendMail(options);
};
