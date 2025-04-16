import nodemailer from "nodemailer";

export const SendEmail = async (EmailTo, EmailSubject, EmailText) => {
  
  let transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: { user: "info@teamrabbil.com", pass: "~sR5[bhaC[Qs" },
    tls: { rejectUnauthorized: false },
  });

  let mailOptions = {
    from: "MERN ECOM Solution <info@teamrabbil.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};
