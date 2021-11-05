const Hints = require("../../models/Hints");
const User = require("../../models/User");
const Products = require("../../models/Product");

module.exports.sendScore = async (req, res) => {
  try {
    if (req.body.gametype === "sliding" || req.body.gametype === "memory-flip") {
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
    else if (req.body.gametype === "guess-price") {
      const { data, correct } = req.body;
      let user = await User.findById(req.user._id);
      await User.updateOne({ _id: req.user._id },{ $unset: { currentHint: "" }});
        if (data[0] > correct || data[1]< correct) {
          return res.status(400).json({
            message: "Your guess was not correct",
            data: {totalScore: user.score,currentScore: 0},
            success: true,
          });
        }
        else{
          let median = (data[0]+data[1])/2;
          let score = 1000/Math.abs(median-correct);
          await User.updateOne({ _id: req.user._id }, { $set: { score: score+user.score } });
          return res.status(200).json({
            message: "You guessed correctly",
            data: {
              totalScore: score + user.score,
              currentScore: score
            },
            success: true
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
