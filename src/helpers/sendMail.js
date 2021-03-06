import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const sendMail = async (to, subject, html, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: to,
    from: process.env.SECP_EMAIL,
    subject: subject,
    text: text,
    html: html,
  };
  try {
    await sgMail.send(msg);
  } catch(error) {
    console.log(error);
  }
}

export default sendMail;
