import BaseSlot from "./BaseSlot";

class DaySlot extends BaseSlot {
  constructor() {
    // Days are from 1 to 31 inclusive, so maximumValue is 32 to accommodate the offset
    super(32);
  }

  override addSingle(value: number) {
    this.checkNotZero(value);
    return super.addSingle(value - 1);
  }

  override addRange(start: number, end: number) {
    this.checkNotZero(start, end);
    return super.addRange(start - 1, end - 1);
  }

  override addStep(step: number, start = 1) {
    this.checkNotZero(start);
    return super.addStep(step, start - 1);
  }

  override removeSingle(value: number) {
    this.checkNotZero(value);
    return super.removeSingle(value - 1);
  }

  override removeRange(start: number, end: number) {
    this.checkNotZero(start, end);
    return super.removeRange(start - 1, end - 1);
  }

  override removeStep(step: number, start = 1) {
    this.checkNotZero(start);
    return super.removeStep(step, start - 1);
  }

  override toString() {
    let output = super.toString();

    if (output === "*") return output;
    else if (output.startsWith("0-1,")) return output.replace("0-1,", "1,");
    else if (output.startsWith("0-")) return output.replace("0-", "1-");
    else if (output.startsWith("0,")) return output.replace("0,", "1,");
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

export default DaySlot;
