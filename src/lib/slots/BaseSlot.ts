interface IBaseSlot {
  addSingle(value: number): this;
  addRange(start: number, end: number): this;
  addStep(step: number, start?: number): this;
  removeSingle(value: number): this;
  removeRange(start: number, end: number): this;
  removeStep(step: number, start?: number): this;
  clear(): this;
  toString(): string;
}

abstract class BaseSlot implements IBaseSlot {
  private isFresh = true;
  private selectedValues: boolean[];

  constructor(private maximumValue: number) {
    this.selectedValues = new Array(maximumValue).fill(false);
  }

  addSingle(value: number) {
    this.checkBounds(value);
    this.isFresh = false;
    this.selectedValues[value] = true;
    return this;
  }

  addRange(start: number, end: number) {
    this.checkBounds(start, end);
    this.isFresh = false;
    this.selectedValues.fill(true, start, end);
    return this;
  }

  addStep(step: number, start = 0) {
    this.checkBounds(start);
    if (step <= 0) throw new Error("Step must be greater than 0.");

    this.isFresh = false;
    Array.from(
      { length: Math.ceil((this.maximumValue - start) / step) },
      (_, i) => start + i * step,
    ).forEach((index) => (this.selectedValues[index] = true));
    return this;
  }

  removeSingle(value: number) {
    this.checkBounds(value);
    this.selectedValues[value] = false;
    return this;
  }

  removeRange(start: number, end: number) {
    this.checkBounds(start, end);
    this.selectedValues.fill(false, start, end);
    return this;
  }

  removeStep(step: number, start = 0) {
    this.checkBounds(start);
    if (step <= 0) throw new Error("Step must be greater than 0.");

    Array.from(
      { length: Math.ceil((this.maximumValue - start) / step) },
      (_, i) => start + i * step,
    ).forEach((index) => (this.selectedValues[index] = false));
    return this;
  }

  clear() {
    this.isFresh = true;
    this.selectedValues.fill(false);
    return this;
  }

  toString() {
    if (this.isFresh) return "*";
    return "";
  }

  private checkBounds(...values: number[]) {
    values.forEach((value) => {
      if (value < 0 || value >= this.maximumValue) {
        throw new Error(`Value ${value} is out of bounds.`);
      }
    });
  }
}
