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
  private selectedValues: boolean[];

  constructor(private maximumValue: number) {
    this.selectedValues = new Array(maximumValue).fill(false);
  }

  addSingle(value: number) {
    this.selectedValues[value] = true;
    return this;
  }

  addRange(start: number, end: number) {
    this.selectedValues.fill(true, start, end);
    return this;
  }

  addStep(step: number, start = 0): this {
    if (step <= 0) throw new Error("Step must be greater than 0.");

    Array.from(
      { length: Math.ceil((this.maximumValue - start) / step) },
      (_, i) => start + i * step,
    ).forEach((index) => (this.selectedValues[index] = true));
    return this;
  }

  removeSingle(value: number) {
    this.selectedValues[value] = false;
    return this;
  }

  removeRange(start: number, end: number) {
    this.selectedValues.fill(false, start, end);
    return this;
  }

  removeStep(step: number, start = 0) {
    if (step <= 0) throw new Error("Step must be greater than 0.");

    Array.from(
      { length: Math.ceil((this.maximumValue - start) / step) },
      (_, i) => start + i * step,
    ).forEach((index) => (this.selectedValues[index] = false));
    return this;
  }

  clear() {
    this.selectedValues.fill(false);
    return this;
  }

  toString() {
    return "";
  }
}
