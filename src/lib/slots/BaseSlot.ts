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
    this.selectedValues = new Array(maximumValue).fill(true);
  }

  addSingle(_value: number) {
    return this;
  }

  addRange(_start: number, _end: number) {
    return this;
  }

  addStep(_step: number, _start?: number) {
    return this;
  }

  removeSingle(_value: number) {
    return this;
  }

  removeRange(_start: number, _end: number) {
    return this;
  }

  removeStep(_step: number, _start?: number) {
    return this;
  }

  clear() {
    return this;
  }

  toString() {
    return "";
  }
}
