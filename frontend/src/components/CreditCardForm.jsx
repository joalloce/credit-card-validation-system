import axios from "axios";
import { useState } from "react";

const CreditCardForm = () => {
  const [cvv, setCvv] = useState("");
  const [month, setMonth] = useState("");
  const [pan, setPan] = useState("");
  const [year, setYear] = useState("");

  const [error, setError] = useState(null);
  const [errorDetails, setErrorDetails] = useState([]);
  const [success, setSuccess] = useState(false);

  const URI = import.meta.env.VITE_BACKEND_URI;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setErrorDetails([]);
    setSuccess(false);

    const ccInfo = { CVV: cvv, month, PAN: pan, year };

    try {
      const response = await axios.post(`${URI}credit-card/`, ccInfo);
      console.log(response);
      if (!response.data.valid) {
        setErrorDetails(response.data.errorsValidation);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.response.data.error);
      setErrorDetails(error.response.data.errorFields);
    }
  };

  const clearFields = (e) => {
    e.preventDefault();

    setCvv("");
    setMonth("");
    setPan("");
    setYear("");

    setError(null);
    setErrorDetails([]);
    setSuccess(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-96 m-0">
      <div className="flex flex-col pb-3">
        <label>Card Number</label>
        <input
          className={`text-gray-800 p-1 ring-1 focus:ring-2 ${
            errorDetails.includes("pan") ? "ring-red-600" : "ring-indigo-900"
          }`}
          type="text"
          id="cardNumber"
          value={pan}
          onChange={(e) => setPan(e.target.value)}
          placeholder="Enter card number"
        ></input>
      </div>
      <div className="flex pb-3">
        <div className="flex flex-col mr-2">
          <label>Month</label>
          <input
            className={`text-gray-800 p-1 w-full ring-1 focus:ring-2 ${
              errorDetails.includes("month")
                ? "ring-red-600"
                : "ring-indigo-900"
            }`}
            type="text"
            id="month"
            maxLength={2}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Month"
          ></input>
        </div>
        <div className="flex flex-col mr-3">
          <label>Year</label>
          <input
            className={`text-gray-800 p-1 w-full ring-1 focus:ring-2 ${
              errorDetails.includes("year") ? "ring-red-600" : "ring-indigo-900"
            }`}
            type="text"
            id="year"
            maxLength={2}
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
          ></input>
        </div>
        <div className="flex flex-col">
          <label>CVV</label>
          <input
            className={`text-gray-800 p-1 w-full ring-1 focus:ring-2 ${
              errorDetails.includes("cvv") ? "ring-red-600" : "ring-indigo-900"
            }`}
            type="text"
            id="cvv"
            maxLength={4}
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="CVV"
          ></input>
        </div>
      </div>
      <div className="flex mb-4">
        <button
          className="w-full m-1 p-2 bg-slate-400 hover:bg-slate-600 "
          type="submit"
        >
          Verify
        </button>
        <button
          className="w-full m-1 p-2 bg-slate-400 hover:bg-slate-600"
          onClick={clearFields}
        >
          Clear
        </button>
      </div>
      {error && <div className="pb-2 text-red-600">{error}</div>}
      {success && (
        <div className="pb-2 text-green-600">
          It's a valid credit card information.
        </div>
      )}
      {!success && errorDetails.includes("ExpiryDate") && (
        <div className="pb-2 text-red-600">Invalid expiry date.</div>
      )}
      {!success && errorDetails.includes("SecurityCode") && (
        <div className="pb-2 text-red-600">Invalid security code.</div>
      )}
      {!success && errorDetails.includes("LuhnAlgorithm") && (
        <div className="pb-2 text-red-600">
          Invalid by Luhm Algorithm checksum.
        </div>
      )}
    </form>
  );
};

export default CreditCardForm;
