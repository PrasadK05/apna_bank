const User = require("../../models/user.model");
const Account = require("../../models/account.model");
const jwt = require("jsonwebtoken");
const getDateAndTime = require("../../utils/getDateAndTime");

const token_secret = process.env.TOKEN_KEY;

let depositFunction = async (req, res) => {
  let { authorization } = req.headers;
  let { ammount, type, note } = req.body;
  authorization = authorization.split(" ");
  let token = authorization[1];
  let decode = jwt.decode(token, token_secret);
  let data = getDateAndTime();
  ammount = Number(ammount);
  if (type !== "deposit") {
    return res.status(400).send({ message: "wrong api" });
  }

  try {
    let user = await User.findOne(
      { _id: decode._id },
      { password: 0, role: 0, token: 0 }
    );
    let bal = Number(user.balance) + ammount;
    bal = bal.toString();
    ammount = ammount.toString();

    let dpst = await Account.create({
      userId: user._id,
      type,
      balance: bal,
      ammount,
      note,
      date: data.date,
      time: data.time,
    });
    let update = await User.updateOne({ _id: user._id }, { balance: bal });
    return res.status(200).send({ message: "Money deposited successfully" });
  } catch (error) {
    return res.status(400).send({ message: "Something went wrong" });
  }
};

module.exports = depositFunction;
