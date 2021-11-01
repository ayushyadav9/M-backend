const Hints = require("../../models/Hints");
const User = require("../../models/User");
const Products = require("../../models/Product");

module.exports.sendScore = async (req, res) => {
  try {
    if (req.body.gametype === "sliding") {
      if (req.body.isSolused) {
        await User.updateOne({ _id: req.user._id },{ $unset: { currentHint: "" } });
        let user = await User.findById(req.user._id);
        return res.status(200).json({
          message: "Fetched Successfully",
          data: {score: user.score,},
          success: true,
        });
      } else {
        const { moves, time } = req.body;
        if (moves === 0 || time === 0) {
          return res.status(400).json({
            message: "Inavlid data",
            success: false,
          });
        }
        let score = 10000 / (moves * time);
        let user = await User.findById(req.user._id);
        score = score + user.score;
        await User.updateOne({ _id: req.user._id },{ $unset: { currentHint: "" }});
        await User.updateOne({ _id: req.user._id }, { $set: { score: score } });
        return res.status(200).json({
          message: "Updated Successfully",
          data: {score: score},
          success: true,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
      message: "Something went wrong",
      success: false,
    });
  }
};
