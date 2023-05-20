const nodemailer = require("nodemailer");

module.exports = async (email, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",

      auth: {
        user: "triptakea19@gmail.com",
        pass: "qvqvyugzcfysrjol",
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
