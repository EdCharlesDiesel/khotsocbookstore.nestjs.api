import { TwoNumberSum } from "../src/twoNumberSum.array";

describe("TwoNumberSum", () => {
  let array = [3, 5, -4, 8, 11, 1, -1, 6];
  let targetSum = 10;
  const expected = [11, -1];
  let actual = new TwoNumberSum();
  actual.twoNumberSum(array,targetSum);

  it("should be defined", () => {
    expect(actual).toEqual(expected);
  });
});
