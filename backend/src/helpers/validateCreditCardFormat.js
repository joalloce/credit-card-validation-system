const validateCreditCardFormat = ({ CVV, month, PAN, year }) => {
  if (!isCVVValid(CVV)) return false;

  if (!isMonthValid(month)) return false;

  if (!isPANValid(PAN)) return false;

  if (!isYearValid(year)) return false;

  return true;
};

const isCVVValid = (CVV) => {
  if (isNaN(CVV)) return false;

  if (CVV.length < 3 || 4 < CVV.length) return false;

  return true;
};

const isMonthValid = (month) => {
  let monthNumber = parseInt(month);
  if (isNaN(month)) return false;

  if (monthNumber < 1 || 12 < monthNumber) return false;

  return true;
};

const isPANValid = (PAN) => {
  let allDigitsNumber = PAN.split("").every((d) => {
    let number = parseInt(d);
    console.log(d, number);
    return Number.isInteger(number);
  });
  if (!allDigitsNumber) return false;

  if (PAN.length < 16 || 19 < PAN.length) return false;

  return true;
};

const isYearValid = (year) => {
  let yearNumber = parseInt(year);
  if (isNaN(year)) return false;

  if (yearNumber < 0 || 99 < yearNumber) return false;

  return true;
};

export {
  isCVVValid,
  isMonthValid,
  isPANValid,
  isYearValid,
  validateCreditCardFormat,
};
