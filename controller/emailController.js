const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

module.exports.sendMail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "gloria64@ethereal.email", // ethereal user
      pass: "j86PmJcWFfbk521sS1", // ethereal password
    },
  });

  const msg = {
    from: '"Assurance Code" <Verification@code.com>', // sender address
    to: `${email}`, // list of receivers
    subject: "Verification required", // Subject line
    text: "this is your code 888566", // plain text body
  };
  // send mail with defined transport object
  const info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  res.send("Email Sent!");
});
