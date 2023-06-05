import { ccValidationAlgorithm } from "#root/creditCardValidation/ccValidationAlgorithm";
import { validateCreditCardFormat } from "#root/helpers/checkCreditCardFormat";

export const validate = async (req, res) => {
  let { PAN: pan, CVV: cvv, month, year } = req.body;

  let errorFields = [];

  if (!pan) {
    errorFields.push("pan");
  }
  if (!cvv) {
    errorFields.push("cvv");
  }
  if (!month) {
    errorFields.push("month");
  }
  if (!year) {
    errorFields.push("year");
  }

  if (errorFields.length) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields.", errorFields });
  }

  errorFields = validateCreditCardFormat({ cvv, month, pan, year });

  if (errorFields.length) {
    return res
      .status(400)
      .json({ error: "Please fill the fields correctly.", errorFields });
  }

  let errorsValidation = ccValidationAlgorithm({ cvv, month, pan, year });
  if (errorsValidation.length) {
    return res.status(200).json({ valid: false, errorsValidation });
  }

  res.status(200).json({ valid: true });
};
