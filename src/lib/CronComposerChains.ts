import { CronComposer, SlotType } from "./CronComposer";
import { DayOfWeek } from "./slots/DayOfWeekSlot";
import { MonthOfYear } from "./slots/MonthSlot";

/**
 * Defines valid cron fields that can be manipulated in a cron expression.
 */
export type CronField =
  | "seconds"
  | "minutes"
  | "hours"
  | "days"
  | "months"
  | "weekdays";

/**
 * Defines valid time meridiems for 12-hour clock formats.
 */
export type TimeMeridiem = "am" | "pm";

/**
 * Maps high-level cron field names to the corresponding slot type used internally.
 */
export const fieldMap: { [key in CronField]: SlotType } = {
  seconds: SlotType.Second,
  minutes: SlotType.Minute,
  hours: SlotType.Hour,
  days: SlotType.Day,
  months: SlotType.Month,
  weekdays: SlotType.DayOfWeek,
};

/**
 * Interface for chaining methods to build or manipulate a cron expression.
 */
export interface ICronChain {
  in(...months: MonthOfYear[]): CronComposer;
  on(...daysOfWeek: DayOfWeek[]): CronComposer;
  at(hour: number, meridiem?: TimeMeridiem): CronComposer;
  every(step: number, field: CronField): CronComposer;
  from(hour: number, meridiem?: TimeMeridiem): FromChain;
}

/**
 * Converts a 12-hour clock format hour to a 24-hour clock format based on the
 * specified meridiem.
 * @param hour - The hour to convert.
 * @param meridiem - Optional. The meridiem to use for conversion (am/pm).
 * @returns The hour converted to 24-hour format.
 */
export function convertHourUsingMeridiem(
  hour: number,
  meridiem?: TimeMeridiem,
) {
  if (meridiem && hour === 12) hour -= 12;
  if (meridiem && meridiem === "pm") hour += 12;
  return hour;
}

/**
 * Base class for chaining cron expression manipulations.
 */
class Chain {
  constructor(protected composer: CronComposer) { }
}

/**
 * Class for chaining methods that remove values from cron fields, creating
 * exceptions in the schedule.
 */
export class ExceptChain extends Chain implements ICronChain {
  /**
   * Removes specific months from the cron expression, creating an exception.
   * @param months - Months to be removed from the cron schedule.
   * @returns The current instance of CronComposer for further chaining.
   */
  public in(...months: MonthOfYear[]) {
    months.forEach((month) =>
      this.composer.removeSingle(SlotType.Month, month),
    );
    return this.composer;
  }

  /**
   * Removes specific days of the week from the cron expression, creating an
   * exception.
   * @param daysOfWeek - Days of the week to be removed from the cron schedule.
   * @returns The current instance of CronComposer for further chaining.
   */
  public on(...daysOfWeek: DayOfWeek[]) {
    daysOfWeek.forEach((dayOfWeek) =>
      this.composer.removeSingle(SlotType.DayOfWeek, dayOfWeek),
    );
    return this.composer;
  }

  /**
   * Removes a specific hour from the cron expression, creating an exception.
   * @param hour - The hour to remove.
   * @param meridiem Optional. The meridiem to consider for conversion.
   * @returns The current instance of CronComposer for further chaining.
   */
  public at(hour: number, meridiem?: TimeMeridiem) {
    this.composer.removeSingle(
      SlotType.Hour,
      convertHourUsingMeridiem(hour, meridiem),
    );
    return this.composer;
  }

  /**
   * Removes a step interval from a specified cron field, creating an exception.
   * @param step - The step interval to remove.
   * @param field - The cron field from which to remove the step.
   * @returns The current instance of CronComposer for further chaining.
   */
  public every(step: number, field: CronField) {
    this.composer.removeStep(fieldMap[field], step);
    return this.composer;
  }

  /**
   * Initializes a range removal starting from a specific hour.
   * @param hour - The starting hour of the range to remove.
   * @param meridiem - Optional. The meridiem to consider for conversion.
   * @returns An instance of FromChain to specify the end of the removal range.
   */
  public from(hour: number, meridiem?: TimeMeridiem) {
    return new FromChain(this.composer, hour, meridiem, true);
  }
}

/**
 * Class for chaining a range-based manipulation of a cron expression.
 */
export class FromChain extends Chain {
  /**
   * Constructs an instance of FromChain for range operations.
   * @param composer - The CronComposer instance.
   * @param fromHour - The starting hour of the range.
   * @param fromMeridiem - Optional. The meridiem for the starting hour.
   * @param except - Optional. Flag indicating if the range is for an exception.
   */
  constructor(
    composer: CronComposer,
    private fromHour: number,
    private fromMeridiem?: TimeMeridiem,
    private except?: boolean,
  ) {
    super(composer);
  }

  /**
   * Completes the definition of a range operation by specifying the end hour.
   * @param toHour - The ending hour of the range.
   * @param toMeridiem - Optional. The meridiem for the ending hour.
   * @returns The current instance of CronComposer for further chaining.
   */
  to(toHour: number, toMeridiem?: TimeMeridiem) {
    toHour = convertHourUsingMeridiem(toHour, toMeridiem);
    this.fromHour = convertHourUsingMeridiem(this.fromHour, this.fromMeridiem);

    if (this.except)
      this.composer.removeRange(SlotType.Hour, this.fromHour, toHour);
    else this.composer.addRange(SlotType.Hour, this.fromHour, toHour);

    return this.composer;
  }
}
