import { ccValidationAlgorithm } from "#root/creditCardValidation/ccValidationAlgorithm";
import { validateCreditCardFormat } from "#root/helpers/checkCreditCardFormat";

export const validate = async (req, res) => {
  if (!req.body.PAN || !req.body.CVV || !req.body.month || !req.body.year) {
    return res.status(404).json({ error: "Invalid body" });
  }

  let { PAN, CVV, month, year } = req.body;

  let errorFields = validateCreditCardFormat({ CVV, PAN, month, year });

  if (errorFields.length) {
    return res
      .status(404)
      .json({ error: "Please fill the fields correctly", errorFields });
  }

  let errorsValidation = ccValidationAlgorithm({ CVV, month, PAN, year });
  if (errorsValidation.length) {
    return res.status(404).json({ valid: false, errorsValidation });
  }

  res.status(200).json({ valid: true });
};
