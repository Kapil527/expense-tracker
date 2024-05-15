import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { GMAIL, APP_PASSWORD } = process.env;

const sendEmail = async ({
  userEmail,
  otp,
}: {
  userEmail: string;
  otp: string;
}) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL,
      pass: APP_PASSWORD,
    },
  });

  const mailOption = {
    from: GMAIL,
    to: userEmail,
    subject: "Your OTP for verification",
    text: `Your OTP is ${otp}`,
  };

  await transport.sendMail(mailOption);
};

export default sendEmail;
