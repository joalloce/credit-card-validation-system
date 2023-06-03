export const validate = async (req, res) => {
  let { creditCard } = req.body;
  //validate input
  let validInput = false;

  if (!validInput) {
    return res.status(404).json({ error: "Invalid input" }); // change code
  }

  // validate credit card
  let ok = false;
  if (!ok) {
    return res.status(200).json({ valid: false });
  }

  res.status(200).json({ valid: true });
};
