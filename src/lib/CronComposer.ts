import { DayOfWeek, MonthOfYear, SlotType } from "./CronComposer.types";
import {
  CronField,
  ExceptChain,
  FromChain,
  ICronChain,
  TimeMeridiem,
  convertHourUsingMeridiem,
  fieldMap,
} from "./CronComposerChains";
import { IBaseSlot } from "./slots/BaseSlot";
import DayOfWeekSlot from "./slots/DayOfWeekSlot";
import DaySlot from "./slots/DaySlot";
import HourSlot from "./slots/HourSlot";
import MinuteSlot from "./slots/MinuteSlot";
import MonthSlot from "./slots/MonthSlot";
import SecondSlot from "./slots/SecondSlot";

type SlotValueType = {
  [SlotType.Second]: number;
  [SlotType.Minute]: number;
  [SlotType.Hour]: number;
  [SlotType.Day]: number;
  [SlotType.Month]: number | MonthOfYear;
  [SlotType.DayOfWeek]: number | DayOfWeek;
};

/**
 * Main class to compose and manipulate a Cron expression. All slots default to
 * "*", which signifies that it fires for every value in that slot.
 */
export class CronComposer implements ICronChain {
  private slots: Map<SlotType, IBaseSlot<number | MonthOfYear | DayOfWeek>>;

  /**
   * Constructs an instance of the CronComposer.
   * @param useSecond Optional. Indicates whether to include the seconds field
   * in the output.
   */
  constructor(private useSecond = false) {
    this.slots = new Map();
    this.slots.set(SlotType.Second, new SecondSlot());
    this.slots.set(SlotType.Minute, new MinuteSlot());
    this.slots.set(SlotType.Hour, new HourSlot());
    this.slots.set(SlotType.Day, new DaySlot());
    this.slots.set(SlotType.Month, new MonthSlot());
    this.slots.set(SlotType.DayOfWeek, new DayOfWeekSlot());
  }

  /**
   * Enables the seconds field in the Cron expression.
   * @returns The current instance for chaining.
   */
  public enableSeconds() {
    this.useSecond = true;
    return this;
  }

  /**
   * Disables the seconds field in the Cron expression.
   * @returns The current instance for chaining.
   */
  public disableSeconds() {
    this.useSecond = false;
    return this;
  }

  /**
   * Adds a single value to a specific slot type.
   * @param slot - The slot type to add the value to.
   * @param value - The value to add.
   * @returns The current instance for chaining.
   */
  public addSingle<T extends SlotType>(slot: T, value: SlotValueType[T]) {
    this.slots.get(slot)!.addSingle(value);
    return this;
  }

  /**
   * Adds a range of values to a specific slot type.
   * @param slot - The slot type to add the range to.
   * @param start - The start of the range.
   * @param end - The end of the range.
   * @returns The current instance for chaining.
   */
  public addRange<T extends SlotType>(
    slot: T,
    start: SlotValueType[T],
    end: SlotValueType[T],
  ) {
    this.slots.get(slot)!.addRange(start, end);
    return this;
  }

  /**
   * Adds a step value to a specific slot type.
   * @param slot - The slot type to add the step to.
   * @param step - The step value.
   * @param start - Optional. The value to start the step from.
   * @returns The current instance for chaining.
   */
  public addStep<T extends SlotType>(
    slot: T,
    step: number,
    start?: SlotValueType[T],
  ) {
    this.slots.get(slot)!.addStep(step, start);
    return this;
  }

  /**
   * Removes a single value from a specific slot type.
   * @param slot - The slot type to remove the value from.
   * @param value - The value to remove.
   * @returns The current instance for chaining.
   */
  public removeSingle<T extends SlotType>(slot: T, value: SlotValueType[T]) {
    this.slots.get(slot)!.removeSingle(value);
    return this;
  }

  /**
   * Removes a range of values from a specific slot type.
   * @param slot - The slot type to remove the range from.
   * @param start - The start of the range.
   * @param end - The end of the range.
   * @returns The current instance for chaining.
   */
  public removeRange<T extends SlotType>(
    slot: T,
    start: SlotValueType[T],
    end: SlotValueType[T],
  ) {
    this.slots.get(slot)!.removeRange(start, end);
    return this;
  }

  /**
   * Removes a step of values from a specific slot type.
   * @param slot - The slot type to remove the step from.
   * @param step - The step value.
   * @param start - Optional. The value to start the step from.
   * @returns The current instance for chaining.
   */
  public removeStep<T extends SlotType>(
    slot: T,
    step: number,
    start?: SlotValueType[T],
  ) {
    this.slots.get(slot)!.removeStep(step, start);
    return this;
  }

  /**
   * Clears all values from a specific slot type.
   * @param slot - The slot type to clear.
   * @returns The current instance for chaining.
   */
  public clear<T extends SlotType>(slot: T) {
    this.slots.get(slot)!.clear();
    return this;
  }

  /**
   * Adds specific months to the Cron expression.
   * @param months - The months to add to the Cron expression.
   * @returns The current instance for chaining.
   */
  public in(...months: MonthOfYear[]) {
    months.forEach((month) => this.addSingle(SlotType.Month, month));
    return this;
  }

  /**
   * Adds specific days of the week to the Cron expression.
   * @param daysOfWeek - The days of the week to add to the Cron expression.
   * @returns The current instance for chaining.
   */
  public on(...daysOfWeek: DayOfWeek[]) {
    daysOfWeek.forEach((dayOfWeek) =>
      this.addSingle(SlotType.DayOfWeek, dayOfWeek),
    );
    return this;
  }

  /**
   * Adds a specific hour for the Cron expression.
   * @param hour - The hour to add.
   * @param meridiem - Optional. The time meridiem to convert the hour if
   * necessary.
   * @returns The current instance for chaining.
   */
  public at(hour: number, meridiem?: TimeMeridiem) {
    this.addSingle(SlotType.Hour, convertHourUsingMeridiem(hour, meridiem));
    return this;
  }

  /**
   * Adds a step value for a specific Cron slot.
   * @param step - The step value.
   * @param field - The field to apply the step to.
   * @returns The current instance for chaining.
   */
  public every(step: number, field: CronField) {
    this.addStep(fieldMap[field], step);
    return this;
  }

  /**
   * Initializes a range setting for hours, to be used with the `to` method.
   * @param hour - The hour to start the range from.
   * @param meridiem - Optional. The time meridiem to convert the hour if
   * necessary.
   * @returns An instance of `FromChain` to define the end of the range.
   */
  public from(hour: number, meridiem?: TimeMeridiem) {
    return new FromChain(this, hour, meridiem);
  }

  /**
   * Provides access to define exclusion rules.
   * @returns An instance of `ExceptChain` to define exclusion rules.
   */
  public get except() {
    return new ExceptChain(this);
  }

  public intersect(other: CronComposer) {
    if (this.useSecond !== other.useSecond)
      throw new Error(
        "Cannot intersect composers with different second settings.",
      );

    const result = new CronComposer(this.useSecond);

    this.slots.forEach((slot, slotType) => {
      const otherSlot = other.slots.get(slotType)!;
      const resultSlot = result.slots.get(slotType)!;
      const intersection = slot.intersect(otherSlot);

      intersection.forEach((isSelected, index) => {
        if (isSelected) resSlot.addSingle(index);
      });
    });

    return result;
  }

  /**
   * Converts the Cron expression into its string representation.
   * @returns The string representation of the Cron expression.
   */
  public toString() {
    const parts = [
      this.slots.get(SlotType.Minute)!.toString(),
      this.slots.get(SlotType.Hour)!.toString(),
      this.slots.get(SlotType.Day)!.toString(),
      this.slots.get(SlotType.Month)!.toString(),
      this.slots.get(SlotType.DayOfWeek)!.toString(),
    ];

    if (this.useSecond)
      parts.unshift(this.slots.get(SlotType.Second)!.toString());

    return parts.join(" ");
  }

  /**
   * Parses a cron string and updates the slots accordingly.
   * @param cronString - The cron string to parse.
   * @returns The current instance for chaining.
   * @throws Error if the cron string format is invalid.
   */
  public parse(cronString: string) {
    const parts = cronString.trim().split(/\s+/);
    const validCronString = parts.length === 5 || parts.length === 6;

    if (!validCronString) throw new Error("Invalid cron string format.");

    if (parts.length === 6) {
      this.enableSeconds();
      this.parsePart(SlotType.Second, parts[0]);
    } else {
      this.disableSeconds();
    }

    this.parsePart(SlotType.Minute, parts[this.useSecond ? 1 : 0]);
    this.parsePart(SlotType.Hour, parts[this.useSecond ? 2 : 1]);
    this.parsePart(SlotType.Day, parts[this.useSecond ? 3 : 2]);
    this.parsePart(SlotType.Month, parts[this.useSecond ? 4 : 3]);
    this.parsePart(SlotType.DayOfWeek, parts[this.useSecond ? 5 : 4]);

    return this;
  }

  /**
   * Helper method to parse each part of the cron string and update slots.
   * @param slotType = The type of the slot to update.
   * @param part - The string part of the cron expression for the slot.
   * @throws Error if an unknown segment sequence is encountered.
   */
  private parsePart(slotType: SlotType, part: string) {
    const slot = this.slots.get(slotType)!;
    const num = "(0|([1-9]\\d*))";

    // Using RegExp constructor to use the `num` variable in the pattern
    const matchAll = new RegExp(`^\\*$`);
    const matchSingle = new RegExp(`^${num}$`);
    const matchRange = new RegExp(`^${num}\\-${num}$`);
    const matchStep = new RegExp(`^\\*/${num}$`);

    part.split(/,/).forEach((segment) => {
      if (matchAll.test(segment)) {
        slot.clear();
      } else if (matchSingle.test(segment)) {
        const value = parseInt(segment);
        slot.addSingle(value);
      } else if (matchRange.test(segment)) {
        const [start, end] = segment.split("-").map(Number);
        slot.addRange(start, end);
      } else if (matchStep.test(segment)) {
        const step = parseInt(segment.split("/")[1]);
        slot.addStep(step);
      } else {
        throw new Error(`Unknown segment sequence encountered: ${segment}`);
      }
    });
  }
}
