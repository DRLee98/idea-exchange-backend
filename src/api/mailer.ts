import nodemailer from "nodemailer";

export const sendMail = async (to: string) => {
  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD
    }
  });

  const req = await transporter.sendMail({
    from: process.env.MAIL_ID,
    to,
    subject: "Hello",
    text: "Hello world?",
    html: "<b>Hello world?</b>"
  });

  console.log(req);
};
