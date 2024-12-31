import nodemailer from "nodemailer";

export const SendEmail = async (EmailTo, EmailSubject, EmailText) => {
  let transport = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: { user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs" },
    tls: { rejectUnauthorized: false },
  });

  let mailOption = {
    from: "MERN Ecommerce Solution <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transport.sendMail(mailOption);
};
