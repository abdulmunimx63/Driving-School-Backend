const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const {
  forgotPasswordTemplate,
} = require("./../email_templates/forgot_password_template");

exports.sendEmail = (email, subject, password) => {
  let transporter = nodemailer.createTransport(
    smtpTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "faisalmahmood1196@gmail.com",
        pass: "Faisal@123",
      },
    })
  );

  let data = {
    email: email,
    token: password,
  };

  let mailOptions = {
    from: "faisalmahmood1196@gmail.com",
    to: email,
    subject: subject,
    html: forgotPasswordTemplate(data),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    console.log(info);
  });
};
