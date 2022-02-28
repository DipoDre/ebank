const { Router } = require("express");
const router = Router();
const accountsController = require("../controllers/accounts.controller");
const { auth } = require("../middlewares/auth");

// Create an Account.
router.post("/", accountsController.createAccount);

// Fund Account.
router.patch("/:accountNumber/deposit", auth, accountsController.fundAccount);

// Transfer Fund.
router.patch("/:accountNumber/transfer", auth, accountsController.transferFund);

// Withdraw Fund.
router.patch("/:accountNumber/withdraw", auth, accountsController.withdrawFund);

module.exports = router;
