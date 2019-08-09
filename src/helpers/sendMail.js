import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const sendMail = (to, subject, html) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: to,
    from: process.env.SECP_EMAIL,
    subject: subject,
    text: 'and easy to do anywhere, even with Node.js',
    html: html,
  };
  sgMail.send(msg);
}

export default sendMail;
