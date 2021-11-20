const { gmail } = require("googleapis/build/src/apis/gmail");
const transporter = require("../../config/nodemailer");

module.exports.home = (req, res) => {
  res.status(200).json({
    message: "Ha kaam kr rhi hai!!",
  });
};

module.exports.sendMail = async (req, res) => {
    try {
        const result = await transporter.sendMail({
            from: "Ayush Yadav <ayushtest935@gmail.com>",
            to: "ayushyadav935@gmail.com",
            replyTo:"ayushtest935@gmail.com",
            subject: "This is only for testing",
            html: `<h1>Email test</h1>`,
          });
        
          return res.status(200).json({
            message: "Sent Successfully",
            data: result,
            success: true,
          });
    } catch (error) {
        return res.status(400).json({
            error: error,
            success: false,
        });
    }
  
};
