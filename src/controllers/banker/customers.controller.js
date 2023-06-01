require("dotenv").config();
const User = require("../../models/user.model");

let customersFunction = async (req, res) => {
  let { q } = req.query;
  let customers;
  if (q) {
    let regex = new RegExp(q, "i");
    try {
      customers = await User.find(
        {
          role: "customer",
          $or: [{ name: regex }, { email: regex }, { mobileNumber: regex }],
        },
        { password: 0, role: 0, token: 0 }
      );
      return res.status(200).send({ customers });
    } catch (error) {
      return res.status(400).send({ message: "Something went wrong" });
    }
  } else {
    try {
      customers = await User.find(
        { role: "customer" },
        { password: 0, role: 0, token: 0 }
      );
      return res.status(200).send({ customers });
    } catch (error) {
      return res.status(400).send({ message: "Something went wrong" });
    }
  }
};

module.exports = customersFunction;
