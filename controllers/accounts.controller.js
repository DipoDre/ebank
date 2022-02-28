require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const util = require("../util/util");
const AccountService = require("../services/accounts.service");

// Create an account
exports.createAccount = async (req, res, next) => {
  try {
    const { newAccountData } = req.body;
    const validityResult = util.isNewAccountDataValid(newAccountData);
    if (!validityResult.validity) {
      return res.status(400).json({ message: validityResult.message });
    }

    const hashedPassword = await bcrypt.hash(
      validityResult.creation_data.password,
      saltRounds
    );

    const token = jwt.sign(
      { username: validityResult.creation_data.username },
      process.env.JWT_SECRET,
      { algorithm: "HS256" }
    );

    validityResult.creation_data.token = token;

    validityResult.creation_data.password = hashedPassword;

    const result = await AccountService.createAccount(
      validityResult.creation_data
    );

    const newAccountDetails = await AccountService.getAccountPlusToken(result);

    res.status(201).json({
      ...newAccountDetails,
      message: "The account was created successfully",
    });
  } catch (error) {
    if (error.errno == 1062) {
      return res.status(400).json({ message: "Username is not available" });
    }
    if (error.errno == 1364) {
      return res
        .status(400)
        .json({ message: "One or more required fields are missen" });
    }

    return res
      .status(400)
      .json({ message: "An error occurred, kindly try again" });
  }
};

// Fund account
exports.fundAccount = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;
    const { depositAmount } = req.body;

    const numericDepositAmount = parseFloat(depositAmount);

    const depositNotBelowMin = util.isBelowMinimumDeposit(numericDepositAmount);

    if (!depositNotBelowMin.validity) {
      return res.status(400).json({ message: depositNotBelowMin.message });
    }

    const accountBalance = await AccountService.getAccountBalance(
      accountNumber
    );

    const willBalanceExceedMax = util.isDepositAmountValid(
      numericDepositAmount,
      accountBalance
    );

    if (!willBalanceExceedMax.validity) {
      return res.status(400).json({ message: willBalanceExceedMax.message });
    }

    const result = await AccountService.fundAccount(
      accountNumber,
      depositAmount
    );
    res.status(200).json({
      message: "The account was funded successfully",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred, kindly try again" });
  }
};

// Transfer fund
exports.transferFund = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;
    const { receiverAccountNumber, transferAmount } = req.body;

    const numericTransferAmount = parseFloat(transferAmount);

    const transferNotBelowMin = util.isBelowMinimumTransfer(
      numericTransferAmount
    );

    if (!transferNotBelowMin.validity) {
      return res.status(400).json({ message: transferNotBelowMin.message });
    }

    const isTransferNotToSelf = util.isTransferNotToSelf(
      accountNumber,
      receiverAccountNumber
    );

    if (!isTransferNotToSelf.validity) {
      return res.status(400).json({ message: isTransferNotToSelf.message });
    }

    const doesAccountNumberExist = await AccountService.getAccount(
      receiverAccountNumber
    );

    if (!doesAccountNumberExist) {
      return res
        .status(400)
        .json({ message: "Receiver's account does not exist" });
    }

    const accountBalance = await AccountService.getAccountBalance(
      accountNumber
    );

    const isAmountNotAboveBalance = util.isTransferAmountValid(
      numericTransferAmount,
      accountBalance
    );

    if (!isAmountNotAboveBalance.validity) {
      return res.status(400).json({ message: isAmountNotAboveBalance.message });
    }

    const result = await AccountService.transferFund(
      accountNumber,
      receiverAccountNumber,
      transferAmount
    );
    res.status(200).json({ message: "Fund transfer was successful" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred, kindly try again" });
  }
};

// Withdraw fund
exports.withdrawFund = async (req, res, next) => {
  try {
    const { accountNumber } = req.params;
    const { withdrawAmount } = req.body;

    const numericWithdrawAmount = parseFloat(withdrawAmount);

    const withdrawNotBelowMin = util.isBelowMinimumWithdraw(
      numericWithdrawAmount
    );

    if (!withdrawNotBelowMin.validity) {
      return res.status(400).json({ message: withdrawNotBelowMin.message });
    }

    const accountBalance = await AccountService.getAccountBalance(
      accountNumber
    );

    const isBalanceSufficient = util.isWithdrawAmountValid(
      numericWithdrawAmount,
      accountBalance
    );

    if (!isBalanceSufficient.validity) {
      return res.status(400).json({ message: isBalanceSufficient.message });
    }

    const result = await AccountService.withdrawFund(
      accountNumber,
      withdrawAmount
    );
    res.status(200).json({
      result,
      message: "Fund withdraw was successful",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred, kindly try again" });
  }
};
