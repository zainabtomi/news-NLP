import { validateURL } from "../URLChecker";

describe("URL Validation Tests", () => {
  test("should return true for a valid URL with http", () => {
    expect(validateURL("http://example.com")).toBe(true);
  });

  test("should return true for a valid URL with https", () => {
    expect(validateURL("https://example.com")).toBe(true);
  });

  test("should return false for a URL without protocol", () => {
    expect(validateURL("example.com")).toBe(false);
  });

  test("should return false for a URL with an incorrect format", () => {
    expect(validateURL("http://")).toBe(false);
  });

  test("should return false for a random invalid string", () => {
    expect(validateURL("invalid-url")).toBe(false);
  });
});





