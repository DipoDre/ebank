require("dotenv").config();
const AccountService = require("../services/accounts.service");

let auth = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    const { accountNumber } = req.params;

    if (!token) {
      return res.status(403).json({
        message: "No token provided!",
      });
    }

    const doesAccountExist = await AccountService.getAccountByToken(token);

    if (!doesAccountExist) {
      return res.status(403).json({ message: "Kindly create an account" });
    }

    const tokenAccountNumber = doesAccountExist.account_number;

    if (tokenAccountNumber != accountNumber) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this account" });
    }

    req.token = token;
    req.account = doesAccountExist;
    next();
  } catch (error) {
    return res.status(400).json({ message: "An error occurred kindly retry" });
  }
};

module.exports = { auth };
