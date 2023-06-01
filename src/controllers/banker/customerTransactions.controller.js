require("dotenv").config();
const Account = require("../../models/account.model");

let customerTransactionFunction = async (req, res) => {
  let { id } = req.params;
  let { q } = req.query;
  if (q) {
    let regex = new RegExp(q, "i");
    try {
      let transactions = await Account.find({
        userId: id,
        $or: [
          { type: regex },
          { note: regex },
          { time: regex },
          { date: regex },
          { balance: regex },
          { ammount: regex },
        ],
      }).sort({
        createdAt: -1,
      });
      return res.status(200).send({ transactions });
    } catch (error) {
      return res.status(400).send({ message: "Something went wrong" });
    }
  } else {
    try {
      let transactions = await Account.find({ userId: id }).sort({
        createdAt: -1,
      });
      return res.status(200).send({ transactions });
    } catch (error) {
      return res.status(400).send({ message: "Something went wrong" });
    }
  }
};

module.exports = customerTransactionFunction;
