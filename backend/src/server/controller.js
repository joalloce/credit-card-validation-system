import { validateCreditCardFormat } from "../helpers/checkCreditCardFormat";

export const validate = async (req, res) => {
  if (!req.body.PAN || !req.body.CVV || !req.body.month || !req.body.year) {
    return res.status(404).json({ error: "Invalid body" });
  }

  let { PAN, CVV, month, year } = req.body;

  let validFormat = validateCreditCardFormat({ CVV, PAN, month, year });

  if (!validFormat) {
    return res.status(404).json({ errorFormat: "Invalid input format" });
  }

  // validate credit card
  let validCredictCardInfo = true;
  if (!validCredictCardInfo) {
    return res.status(200).json({ valid: false });
  }

  res.status(200).json({ valid: true, PAN, CVV, month, year });
};
