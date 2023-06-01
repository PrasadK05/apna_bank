const Account = require("../../models/account.model");
const jwt = require("jsonwebtoken");

const token_secret = process.env.TOKEN_KEY;

let transactionsFunction = async (req, res) => {
  let { authorization } = req.headers;
  let { q } = req.query;
  authorization = authorization.split(" ");
  let token = authorization[1];
  let decode = jwt.decode(token, token_secret);

  if (q) {
    let regex = new RegExp(q, "i");
    try {
      let transact1 = await Account.find({
        userId: decode._id,
        $or: [
          { type: regex },
          { note: regex },
          { time: regex },
          { date: regex },
          { balance: regex },
          { ammount: regex },
        ],
      });

      return res.status(200).send({ transactions: transact1 });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Something went wrong" });
    }
  } else {
    try {
      let transact2 = await Account.find({ userId: decode._id }).sort({
        createdAt: -1,
      });
      return res.status(200).send({ transactions: transact2 });
    } catch (error) {
      return res.status(400).send({ message: "Something went wrong" });
    }
  }
};

module.exports = transactionsFunction;
