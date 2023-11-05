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
  constructor() {
    // Months are from 1 to 12 inclusive, so maximumValue is 13 to accommodate the offset
    super(13);
  }

  private convertToNumber(value: number | MonthString): number {
    if (typeof value === "number") return value;
    else return monthMapping[value.toLowerCase() as MonthString];
  }

  override addSingle<T extends number | MonthString>(value: T) {
    return super.addSingle(this.convertToNumber(value));
  }

  override addRange<T extends number | MonthString>(start: T, end: T) {
    return super.addRange(
      this.convertToNumber(start),
      this.convertToNumber(end),
    );
  }

  override addStep<T extends number | MonthString>(step: T, start: T = 1 as T) {
    return super.addStep(
      this.convertToNumber(step),
      this.convertToNumber(start),
    );
  }

  override removeSingle<T extends number | MonthString>(value: T) {
    return super.removeSingle(this.convertToNumber(value));
  }

  override removeRange<T extends number | MonthString>(start: T, end: T) {
    return super.removeRange(
      this.convertToNumber(start),
      this.convertToNumber(end),
    );
  }

  override removeStep<T extends number | MonthString>(
    step: T,
    start: T = 1 as T,
  ) {
    return super.removeStep(
      this.convertToNumber(step),
      this.convertToNumber(start),
    );
  }
}

export default MonthSlot;
