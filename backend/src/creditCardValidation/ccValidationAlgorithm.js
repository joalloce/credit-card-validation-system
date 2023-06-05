const ccValidationAlgorithm = ({ cvv, month, pan, year }) => {
  let errors = [];

  if (!checkExpiryDate({ month, year })) errors.push("ExpiryDate");

  if (!checkSecurityCode({ pan, cvv })) errors.push("SecurityCode");

  if (!checkLuhnAlgorithm({ pan })) errors.push("LuhnAlgorithm");

  return errors;
};

// The expiry date of the credit card (year and month) must be AFTER present time
const checkExpiryDate = ({ month, year }) => {
  const date = new Date();

  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear() % 100;

  if (parseInt(year) > currentYear) {
    return true;
  } else if (parseInt(year) === currentYear && parseInt(month) > currentMonth) {
    return true;
  } else {
    return false;
  }
};

/**
 * The CVV (security code) of the credit card must be exactly 3 digits long
 * - Unless it’s an American Express card, in which case the CVV must be exactly 4 digits long
 * - American Express are cards whose PAN (card numbers) starts with either “34” or “37”
 */
const checkSecurityCode = ({ pan, cvv }) => {
  var firstTwoDigits = pan.substring(0, 2);
  let isAMEX =
    firstTwoDigits === "34" || firstTwoDigits === "37" ? true : false;

  if ((isAMEX && cvv.length === 4) || (!isAMEX && cvv.length === 3)) {
    return true;
  } else {
    return false;
  }
};

// Last digit of the PAN (card number) is checked using Luhn’s algorithm
const checkLuhnAlgorithm = ({ pan }) => {
  let sum = 0;
  let parity = pan.length % 2;
  for (let i = 0; i < pan.length; ++i) {
    let currentDigit = parseInt(pan[i]);
    if (i % 2 != parity) {
      sum += currentDigit;
    } else if (currentDigit > 4) {
      sum += 2 * currentDigit - 9;
    } else {
      sum += 2 * currentDigit;
    }
  }
  return sum % 10 === 0;
};

export {
  ccValidationAlgorithm,
  checkExpiryDate,
  checkLuhnAlgorithm,
  checkSecurityCode,
};
