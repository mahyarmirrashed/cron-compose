import { ValueConverter } from "../ValueConverter";
import BaseSlot, { IBaseSlot } from "./BaseSlot";

export type DayString = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

const dayMapping: Record<DayString, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

class DayOfWeekSlot extends BaseSlot implements IBaseSlot<number | DayString> {
  private valueConverter = new ValueConverter(dayMapping);

  constructor() {
    super(7);
  }

  override addSingle<T extends number | DayString>(value: T) {
    return super.addSingle(this.valueConverter.convertToNumber(value));
  }

  override addRange<T extends number | DayString>(start: T, end: T) {
    return super.addRange(
      this.valueConverter.convertToNumber(start),
      this.valueConverter.convertToNumber(end),
    );
  }

  override addStep<T extends number | DayString>(
    step: number,
    start: T = 0 as T,
  ) {
    return super.addStep(step, this.valueConverter.convertToNumber(start));
  }

  override removeSingle<T extends number | DayString>(value: T) {
    return super.removeSingle(this.valueConverter.convertToNumber(value));
  }

  override removeRange<T extends number | DayString>(start: T, end: T) {
    return super.removeRange(
      this.valueConverter.convertToNumber(start),
      this.valueConverter.convertToNumber(end),
    );
  }

  override removeStep<T extends number | DayString>(
    step: number,
    start: T = 0 as T,
  ) {
    return super.removeStep(step, this.valueConverter.convertToNumber(start));
  }
}

export default DayOfWeekSlot;
