import BaseSlot from "./BaseSlot";

type DayString = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

const dayMapping: Record<DayString, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

class DayOfWeekSlot extends BaseSlot {
  constructor() {
    super(7);
  }

  private convertToNumber(value: number | DayString) {
    if (typeof value === "number") return value;
    else return dayMapping[value.toLowerCase() as DayString];
  }

  override addSingle<T extends number | DayString>(value: T) {
    return super.addSingle(this.convertToNumber(value));
  }

  override addRange<T extends number | DayString>(start: T, end: T) {
    return super.addRange(
      this.convertToNumber(start),
      this.convertToNumber(end),
    );
  }

  override addStep<T extends number | DayString>(step: T, start: T = 0 as T) {
    return super.addStep(
      this.convertToNumber(step),
      this.convertToNumber(start),
    );
  }

  override removeSingle<T extends number | DayString>(value: T) {
    return super.removeSingle(this.convertToNumber(value));
  }

  override removeRange<T extends number | DayString>(start: T, end: T) {
    return super.removeRange(
      this.convertToNumber(start),
      this.convertToNumber(end),
    );
  }

  override removeStep<T extends number | DayString>(
    step: T,
    start: T = 0 as T,
  ) {
    return super.removeStep(
      this.convertToNumber(step),
      this.convertToNumber(start),
    );
  }
}

export default DayOfWeekSlot;
