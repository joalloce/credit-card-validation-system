import {
  isCVVValid,
  isMonthValid,
  isPANValid,
  isYearValid,
  validateCreditCardFormat,
} from "#root/helpers/checkCreditCardFormat";

describe("CVV", () => {
  test("321 is a valid CVV", () => {
    expect(isCVVValid("321")).toBe(true);
  });
  test("3345 is a valid CVV", () => {
    expect(isCVVValid("3345")).toBe(true);
  });
  test("94 is not a valid CVV", () => {
    expect(isCVVValid("94")).toBe(false);
  });
  test("65914 is not a valid CVV", () => {
    expect(isCVVValid("65914")).toBe(false);
  });
  test("er4 is not a valid CVV", () => {
    expect(isCVVValid("er4")).toBe(false);
  });
});

describe("Month", () => {
  test("02 is a valid Month", () => {
    expect(isMonthValid("02")).toBe(true);
  });
  test("11 is a valid Month", () => {
    expect(isMonthValid("11")).toBe(true);
  });
  test("d2 is not a valid Month", () => {
    expect(isMonthValid("d2")).toBe(false);
  });
  test("-1 is not a valid Month", () => {
    expect(isMonthValid("-1")).toBe(false);
  });
  test("14 is not a valid Month", () => {
    expect(isMonthValid("14")).toBe(false);
  });
});

describe("PAN", () => {
  test("5724851966483525 is a valid PAN. 16 digits", () => {
    expect(isPANValid("5724851966483525")).toBe(true);
  });
  test("8517589285827475172 is a valid PAN. 19 digits", () => {
    expect(isPANValid("8517589285827475172")).toBe(true);
  });
  test("12831729837127213682 is not a valid PAN. 20 digits", () => {
    expect(isPANValid("12831729837127213682")).toBe(false);
  });
  test("23718732187184 is not a valid PAN. 14 digits", () => {
    expect(isPANValid("23718732187184")).toBe(false);
  });
  test("1238712987398c34 is not a valid PAN", () => {
    expect(isPANValid("1238712987398c34")).toBe(false);
  });
});

describe("Year", () => {
  test("24 is a valid Year", () => {
    expect(isYearValid("24")).toBe(true);
  });
  test("35 is a valid Year", () => {
    expect(isYearValid("35")).toBe(true);
  });
  test("232 is not a valid Year", () => {
    expect(isYearValid("232")).toBe(false);
  });
  test("-6 is not a valid Year", () => {
    expect(isYearValid("-6")).toBe(false);
  });
  test("1b is not a valid Year", () => {
    expect(isYearValid("1b")).toBe(false);
  });
});

describe("Credit card information", () => {
  test("1853925719561745, 342, 03/34 is a valid Credit card information", () => {
    expect(
      validateCreditCardFormat({
        PAN: "1853925719561745",
        CVV: "342",
        month: "03",
        year: "34",
      }).length
    ).toBe(0);
  });
  test("936618593f692835968, 6574, 09/43 is not a valid Credit card information", () => {
    expect(
      validateCreditCardFormat({
        PAN: "936618593f692835968", //
        CVV: "6574",
        month: "09",
        year: "43",
      })
    ).toContain("PAN");
  });
  test("835816486937178543, 3b4, 01/27 is not a valid Credit card information", () => {
    expect(
      validateCreditCardFormat({
        PAN: "835816486937178543",
        CVV: "3b4", //
        month: "01",
        year: "27",
      })
    ).toContain("CVV");
  });
  test("6491839582817482, 8594, 14/75 is not a valid Credit card information", () => {
    expect(
      validateCreditCardFormat({
        PAN: "6491839582817482",
        CVV: "8594",
        month: "14", //
        year: "75",
      })
    ).toContain("month");
  });
  test("482756184927384595, 581, 05/203 is not a valid Credit card information", () => {
    expect(
      validateCreditCardFormat({
        PAN: "482756184927384595",
        CVV: "581",
        month: "05",
        year: "203", //
      })
    ).toContain("year");
  });
});
