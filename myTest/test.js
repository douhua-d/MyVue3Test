class AgeCalc {
  constructor(windowSize) {
    this.windowSize = windowSize;
    this.ageVals = [];
    this.currentSum = 0;
  }

  addAge(age) {
    this.ageVals.push(age);
    this.currentSum += age;

    if (this.ageVals.length > this.windowSize) {
      let oldAge = this.ageVals.shift();
      this.currentSum -= oldAge;
    }

    const averageAge = this.currentSum / this.windowSize;
    return averageAge;
  }

}