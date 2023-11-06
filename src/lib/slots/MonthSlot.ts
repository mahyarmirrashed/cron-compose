import { ValueConverter } from "../ValueConverter";
import { IBaseSlot } from "./BaseSlot";
import OffsetBaseSlot from "./OffsetBaseSlot";

export type MonthString =
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec";

const monthMapping: Record<MonthString, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

class MonthSlot
  extends OffsetBaseSlot
  implements IBaseSlot<number | MonthString>
{
  private valueConverter = new ValueConverter(monthMapping);

  constructor() {
    // Months are from 1 to 12 inclusive, so maximumValue is 13 to accommodate the offset
    super(13);
  }

  override addSingle<T extends number | MonthString>(value: T) {
    return super.addSingle(this.valueConverter.convertToNumber(value));
  }

  override addRange<T extends number | MonthString>(start: T, end: T) {
    return super.addRange(
      this.valueConverter.convertToNumber(start),
      this.valueConverter.convertToNumber(end),
    );
  }

  override addStep<T extends number | MonthString>(
    step: number,
    start: T = 1 as T,
  ) {
    return super.addStep(step, this.valueConverter.convertToNumber(start));
  }

  override removeSingle<T extends number | MonthString>(value: T) {
    return super.removeSingle(this.valueConverter.convertToNumber(value));
  }

  override removeRange<T extends number | MonthString>(start: T, end: T) {
    return super.removeRange(
      this.valueConverter.convertToNumber(start),
      this.valueConverter.convertToNumber(end),
    );
  }

  override removeStep<T extends number | MonthString>(
    step: number,
    start: T = 1 as T,
  ) {
    return super.removeStep(step, this.valueConverter.convertToNumber(start));
  }
}

export default MonthSlot;
