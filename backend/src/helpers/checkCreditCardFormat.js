const validateCreditCardFormat = ({ cvv, month, pan, year }) => {
  let errors = [];
  if (!isCVVValid(cvv)) errors.push("CVV");

  if (!isMonthValid(month)) errors.push("month");

  if (!isPANValid(pan)) errors.push("PAN");

  if (!isYearValid(year)) errors.push("year");

  return errors;
};

const isCVVValid = (cvv) => {
  if (isNaN(cvv)) return false;

  if (cvv.length < 3 || 4 < cvv.length) return false;

  return true;
};

const isMonthValid = (month) => {
  let monthNumber = parseInt(month);
  if (isNaN(month)) return false;

  if (monthNumber < 1 || 12 < monthNumber) return false;

  return true;
};

const isPANValid = (pan) => {
  let allDigitsNumber = pan.split("").every((d) => {
    let number = parseInt(d);
    return Number.isInteger(number);
  });
  if (!allDigitsNumber) return false;

  if (pan.length < 15 || 19 < pan.length) return false;

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
