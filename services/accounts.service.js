const db = require("../database/connection");

// Create An Account
exports.createAccount = async (accountCreationData) => {
  let newAccount = await db("accounts")
    .insert(accountCreationData)
    .catch((e) => {
      throw e;
    });

  if (newAccount) return newAccount[0];
};

// Fund An Account
exports.fundAccount = async (accountNumber, depositAmount) => {
  let result = await db("accounts")
    .where("account_number", "=", accountNumber)
    .increment({
      balance: depositAmount,
    })
    .catch((e) => {
      throw e;
    });

  return result;
};

// Transfer fund to an Account
exports.transferFund = async (
  accountNumber,
  receiverAccountNumber,
  transferAmount
) => {
  try {
    await db.transaction(async (trx) => {
      let decrementResult = await trx("accounts")
        .where("account_number", "=", accountNumber)
        .decrement({
          balance: transferAmount,
        });

      let incrementResult = await trx("accounts")
        .where("account_number", "=", receiverAccountNumber)
        .increment({
          balance: transferAmount,
        });
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Withdraw fund
exports.withdrawFund = async (accountNumber, withdrawAmount) => {
  let result = await db("accounts")
    .where("account_number", "=", accountNumber)
    .decrement({
      balance: withdrawAmount,
    })
    .catch((e) => {
      throw e;
    });

  return result;
};

// Get Account Balance
exports.getAccountBalance = async (accountNumber) => {
  let accountBalances = await db("accounts")
    .where({ account_number: accountNumber })
    .select("balance")
    .catch((e) => {
      console.log(e);
      throw e;
    });

  return accountBalances[0].balance;
};

// Find an account
exports.getAccount = async (accountNumber) => {
  let accounts = await db("accounts")
    .where({ account_number: accountNumber })
    .select("username", "firstname", "lastname")
    .catch((e) => {
      throw e;
    });

  if (accounts.length == 0) {
    return false;
  } else return accounts[0];
};

//  Find an account by Token
exports.getAccountByToken = async (token) => {
  let accounts = await db("accounts")
    .where({ token })
    .select("account_number", "username")
    .catch((e) => {
      throw e;
    });

  if (accounts.length == 0) {
    return false;
  } else return accounts[0];
};

// Get Account inclusive of Token
exports.getAccountPlusToken = async (accountNumber) => {
  let accounts = await db("accounts")
    .where({ account_number: accountNumber })
    .select("account_number", "username", "token")
    .catch((e) => {
      throw e;
    });

  if (accounts.length == 0) {
    return false;
  } else return accounts[0];
};
