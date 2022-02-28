const isFieldLengthValid = (field, minimumExcl) => {
  if (field.length > minimumExcl) {
    return true;
  } else {
    return false;
  }
};

const isNewAccountDataNull = (newAccountData) => {
  if (
    newAccountData &&
    newAccountData.firstname &&
    newAccountData.lastname &&
    newAccountData.username &&
    newAccountData.password
  ) {
    return true;
  } else {
    return false;
  }
};

const checkIfFieldHasOnlyAlphabets = (_string) => {
  if (_string.match(/^[A-Za-z]+$/) != null) {
    return true;
  } else {
    return false;
  }
};

const isNewAccountDataValid = (newAccountData) => {
  if (isNewAccountDataNull(newAccountData)) {
    if (
      isFieldLengthValid(newAccountData.firstname, 2) &&
      isFieldLengthValid(newAccountData.lastname, 2)
    ) {
      if (isFieldLengthValid(newAccountData.username, 4)) {
        if (isFieldLengthValid(newAccountData.password, 7)) {
          if (
            checkIfFieldHasOnlyAlphabets(newAccountData.firstname) &&
            checkIfFieldHasOnlyAlphabets(newAccountData.lastname)
          ) {
            newAccountData.firstname = newAccountData.firstname.toLowerCase();
            newAccountData.lastname = newAccountData.lastname.toLowerCase();

            return {
              validity: true,
              message: "newAccountData is valid",
              creation_data: newAccountData,
            };
          } else {
            return {
              validity: false,
              message: "Names can only contain alphabet",
            };
          }
        } else {
          return {
            validity: false,
            message: "Password must be more than 7 characters",
          };
        }
      } else {
        return {
          validity: false,
          message: "Username must be more than 4 characters",
        };
      }
    } else {
      return {
        validity: false,
        message: "Firstname & lastname must be more than 2 characters",
      };
    }
  } else {
    return {
      validity: false,
      message: "One or more required fields are missen",
    };
  }
};

const isBelowMinimumDeposit = (numericDepositAmount) => {
  if (numericDepositAmount >= 100.0) {
    return { validity: true, message: "Amount is not less than 100.00" };
  } else {
    return {
      validity: false,
      message: "Minimum deposit amount is 100.00",
    };
  }
};

const isDepositAmountValid = (numericDepositAmount, accountBalance) => {
  let balanceInKobo = parseFloat(accountBalance) * 100;
  const depositLimitInKobo = 10000000000 - balanceInKobo;
  const depositLimit = depositLimitInKobo / 100;

  if (numericDepositAmount <= depositLimit) {
    return {
      validity: true,
      message: "Your balance is within allowable range",
    };
  } else {
    return {
      validity: false,
      message: "Your account balance can not exceed 100 Million",
    };
  }
};

const isBelowMinimumWithdraw = (numericWithdrawAmount) => {
  if (numericWithdrawAmount >= 100.0) {
    return { validity: true, message: "Amount is not less than 100.00" };
  } else {
    return {
      validity: false,
      message: "Minimum withdraw amount is 100.00",
    };
  }
};

const isWithdrawAmountValid = (numericWithdrawAmount, accountBalance) => {
  let numericAccountBalance = parseFloat(accountBalance);

  if (numericWithdrawAmount <= numericAccountBalance) {
    return {
      validity: true,
      message: "You have sufficient funds",
    };
  } else {
    return {
      validity: false,
      message: "Your withdrawal request exceeds your balance",
    };
  }
};

const isBelowMinimumTransfer = (numericTransferAmount) => {
  if (numericTransferAmount >= 50.0) {
    return { validity: true, message: "Amount is not less than 50.00" };
  } else {
    return {
      validity: false,
      message: "Minimum transfer amount is 50.00",
    };
  }
};

const isTransferNotToSelf = (accountNumber, receiverAccountNumber) => {
  if (accountNumber != receiverAccountNumber) {
    return { validity: true, message: "Transfer is not to self" };
  } else {
    return {
      validity: false,
      message: "Transfer to self is not possible",
    };
  }
};

const isTransferAmountValid = (numericTransferAmount, accountBalance) => {
  let numericAccountBalance = parseFloat(accountBalance);

  if (numericTransferAmount <= numericAccountBalance) {
    return {
      validity: true,
      message: "You have sufficient funds",
    };
  } else {
    return {
      validity: false,
      message: "Your transfer request exceeds your balance",
    };
  }
};

module.exports = {
  isNewAccountDataValid,
  isBelowMinimumDeposit,
  isDepositAmountValid,
  isBelowMinimumWithdraw,
  isWithdrawAmountValid,
  isBelowMinimumTransfer,
  isTransferNotToSelf,
  isTransferAmountValid,
};
