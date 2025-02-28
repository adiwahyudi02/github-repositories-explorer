import { updatedOnFormatDate } from "../date.utils";

describe("updatedOnFormatDate", () => {
  it("formats a valid ISO date string correctly", () => {
    const result = updatedOnFormatDate("2019-01-10T00:35:27Z");
    expect(result).toBe("Jan 10, 2019");
  });

  it('returns "-" for an invalid date string', () => {
    const result = updatedOnFormatDate("invalid-date");
    expect(result).toBe("-");
  });

  it('returns "-" for an empty string', () => {
    const result = updatedOnFormatDate("");
    expect(result).toBe("-");
  });

  it("formats a different valid ISO date string correctly", () => {
    const result = updatedOnFormatDate("2025-12-25T15:00:00Z");
    expect(result).toBe("Dec 25, 2025");
  });
});
