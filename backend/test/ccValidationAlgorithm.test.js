import {
  ccValidationAlgorithm,
  checkExpiryDate,
  checkSecurityCode,
  checkLuhnAlgorithm,
} from "#root/creditCardValidation/ccValidationAlgorithm";

//month and year formats are correct
describe("Expiry Date", () => {
  test("03/28 is a valid Date", () => {
    expect(checkExpiryDate({ month: "03", year: "28" })).toBe(true);
  });
  test("12/23 is a valid Date", () => {
    expect(checkExpiryDate({ month: "12", year: "23" })).toBe(true);
  });
  test("04/19 is not a valid Date", () => {
    expect(checkExpiryDate({ month: "04", year: "19" })).toBe(false);
  });
  test("03/23 is not a valid Date", () => {
    expect(checkExpiryDate({ month: "03", year: "23" })).toBe(false);
  });
  test("18/05 is not a valid Date", () => {
    expect(checkExpiryDate({ month: "18", year: "05" })).toBe(false);
  });
});

// PAN and CVV formats are correct
describe("Security Code", () => {
  test("5724851966483525, 342 is a valid Security Code", () => {
    expect(checkSecurityCode({ PAN: "5724851966483525", CVV: "342" })).toBe(
      true
    );
  });
  test("3717589285827475172, 3253 is a valid Security Code", () => {
    expect(checkSecurityCode({ PAN: "3717589285827475172", CVV: "3253" })).toBe(
      true
    );
  });
  test("34123871298739834, 1349 is a valid Security Code", () => {
    expect(checkSecurityCode({ PAN: "34123871298739834", CVV: "1349" })).toBe(
      true
    );
  });
  test("341238712987398343, 771 is not a valid Security Code", () => {
    expect(checkSecurityCode({ PAN: "34123871298739834", CVV: "771" })).toBe(
      false
    );
  });
  test("5724851966483525, 8234 is not a valid Security Code", () => {
    expect(checkSecurityCode({ PAN: "5724851966483525", CVV: "8234" })).toBe(
      false
    );
  });
});

// Expect PAN format to be correct
describe("Luhm algorithm", () => {
  test("79927398713 is valid", () => {
    expect(checkLuhnAlgorithm({ PAN: "79927398713" })).toBe(true);
  });
  test("45320151128336 is valid", () => {
    expect(checkLuhnAlgorithm({ PAN: "45320151128336" })).toBe(true);
  });
  test("378734493671000 is valid", () => {
    expect(checkLuhnAlgorithm({ PAN: "378734493671000" })).toBe(true);
  });
  test("4309678002102088 is valid", () => {
    expect(checkLuhnAlgorithm({ PAN: "4309678002102088" })).toBe(true);
  });
  test("378734493671000 is valid", () => {
    expect(checkLuhnAlgorithm({ PAN: "378734493671000" })).toBe(true);
  });
});

describe("Credit Card Validation Algorithm", () => {
  test("79927398713, 342, 03/34 is valid", () => {
    expect(
      ccValidationAlgorithm({
        PAN: "79927398713",
        CVV: "342",
        month: "03",
        year: "34",
      }).length
    ).toBe(0);
  });
  test("378734493671000, 9562, 03/34 is valid", () => {
    expect(
      ccValidationAlgorithm({
        PAN: "378734493671000",
        CVV: "9562",
        month: "03",
        year: "34",
      }).length
    ).toBe(0);
  });
  test("371449635398430, 3432, 03/34 is not valid (Luhm Algorithm)", () => {
    expect(
      ccValidationAlgorithm({
        PAN: "371449635398430",
        CVV: "3432",
        month: "03",
        year: "34",
      })
    ).toContain("LuhnAlgorithm");
  });
  test("45320151128336, is not valid (year)", () => {
    expect(
      ccValidationAlgorithm({
        PAN: "45320151128336",
        CVV: "432",
        month: "08",
        year: "05",
      })
    ).toContain("ExpiryData");
  });
  test("4309678002102088, 7284, 05/45 is not valid (Security Code)", () => {
    expect(
      ccValidationAlgorithm({
        PAN: "4309678002102088",
        CVV: "7284",
        month: "05",
        year: "45",
      })
    ).toContain("SecurityCode");
  });
});
