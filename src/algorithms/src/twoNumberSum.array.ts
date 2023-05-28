export class TwoNumberSum {
 // array_: number[];
 // targetSum_: number;
 //  constructor(array: number[], targetSum: number) {
 //    this.array_ = array;
 //    this.targetSum_ = targetSum;
 //  }
  public twoNumberSum(array_: number[], targetSum_: number): any[] {
    array_.sort((a, b) => a - b);
    let left = 0;
    let right = array_.length - 1;
    while (left < right) {
      const currentSum = array_[left] + array_[right];
      if (currentSum === targetSum_) {
        return [array_[left], array_[right]];
      } else if (currentSum < targetSum_) {
        left++;
      } else if (currentSum > targetSum_) {
        right--;
      }
    }
    return [];
  }
}
