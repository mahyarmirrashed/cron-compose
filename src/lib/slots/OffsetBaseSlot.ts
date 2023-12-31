import BaseSlot from "./BaseSlot";

abstract class OffsetBaseSlot extends BaseSlot {
  constructor(maximumValue: number) {
    super(maximumValue);
  }

  override addSingle(value: number) {
    this.checkNotZero(value);
    return super.addSingle(value);
  }

  override addRange(start: number, end: number) {
    this.checkNotZero(start);
    return super.addRange(start, end);
  }

  override addStep(step: number, start = 1) {
    this.checkNotZero(start);
    return super.addStep(step, start);
  }

  override removeSingle(value: number) {
    this.checkNotZero(value);
    return super.removeSingle(value);
  }

  override removeRange(start: number, end: number) {
    this.checkNotZero(start);
    return super.removeRange(start, end);
  }

  override removeStep(step: number, start = 1) {
    this.checkNotZero(start);
    return super.removeStep(step, start);
  }

  override toString() {
    const output = super.toString();

    if (output === `1-${this.maximumValue - 1}`) return "*";
    else return output;
  }

  private checkNotZero(...values: number[]) {
    values.forEach((value) => {
      if (value === 0) {
        throw new Error(`Value ${value} is out of bounds.`);
      }
    });
  }
}

export default OffsetBaseSlot;
