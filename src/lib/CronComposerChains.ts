import { CronComposer, SlotType } from "./CronComposer";
import { DayOfWeek } from "./slots/DayOfWeekSlot";
import { MonthOfYear } from "./slots/MonthSlot";

// Defines a valid cron fields that can be manipulated in a cron expression.
export type CronField =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "weekdays";
// Defines valid time meridiems for 12-hour clock formats.
export type TimeMeridiem = "am" | "pm";

export const fieldMap: { [key in CronField]: SlotType } = {
  seconds: SlotType.Second,
  minutes: SlotType.Minute,
  hours: SlotType.Hour,
  days: SlotType.Day,
  months: SlotType.Month,
  weekdays: SlotType.DayOfWeek,
};

export interface ICronChain {
  in(...months: MonthOfYear[]): CronComposer;
  on(...daysOfWeek: DayOfWeek[]): CronComposer;
  at(hour: number, meridiem?: TimeMeridiem): CronComposer;
  every(step: number, field: CronField): CronComposer;
  from(hour: number, meridiem?: TimeMeridiem): FromChain;
}

export function convertHourUsingMeridiem(
  hour: number,
  meridiem?: TimeMeridiem,
) {
  if (meridiem && hour === 12) hour -= 12;
  if (meridiem && meridiem === "pm") hour += 12;
  return hour;
}

class Chain {
  constructor(protected composer: CronComposer) { }
}

export class ExceptChain extends Chain implements ICronChain {
  // Removes specific months to the cron expression.
  public in(...months: MonthOfYear[]) {
    months.forEach((month) =>
      this.composer.removeSingle(SlotType.Month, month),
    );
    return this.composer;
  }

  // Removes specific days of the week to the cron expression.
  public on(...daysOfWeek: DayOfWeek[]) {
    daysOfWeek.forEach((dayOfWeek) =>
      this.composer.removeSingle(SlotType.DayOfWeek, dayOfWeek),
    );
    return this.composer;
  }

  // Removes a specific hour for the cron expression.
  public at(hour: number, meridiem?: TimeMeridiem) {
    this.composer.removeSingle(
      SlotType.Hour,
      convertHourUsingMeridiem(hour, meridiem),
    );
    return this.composer;
  }

  // Removes a step value for a specific cron slot.
  public every(step: number, field: CronField) {
    this.composer.removeStep(fieldMap[field], step);
    return this.composer;
  }

  // Initializes a range setting for hours, to be used with the `to` method.
  public from(hour: number, meridiem?: TimeMeridiem) {
    return new FromChain(this.composer, hour, meridiem, true);
  }
}

export class FromChain extends Chain {
  constructor(
    composer: CronComposer,
    private fromHour: number,
    private fromMeridiem?: TimeMeridiem,
    private except?: boolean,
  ) {
    super(composer);
  }

  // Completes the definition of a range by specifying the end hour.
  to(toHour: number, toMeridiem?: TimeMeridiem) {
    toHour = convertHourUsingMeridiem(toHour, toMeridiem);
    this.fromHour = convertHourUsingMeridiem(this.fromHour, this.fromMeridiem);

    if (this.except)
      this.composer.removeRange(SlotType.Hour, this.fromHour, toHour);
    else this.composer.addRange(SlotType.Hour, this.fromHour, toHour);

    return this.composer;
  }
}
