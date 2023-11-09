import { IBaseSlot } from "./slots/BaseSlot";
import DayOfWeekSlot, { DayString } from "./slots/DayOfWeekSlot";
import DaySlot from "./slots/DaySlot";
import HourSlot from "./slots/HourSlot";
import MinuteSlot from "./slots/MinuteSlot";
import MonthSlot, { MonthString } from "./slots/MonthSlot";
import SecondSlot from "./slots/SecondSlot";

/// Different types of slots available in a Cron expression.
export enum SlotType {
  // Seconds slot (0-59).
  Second,
  // Minutes slot (0-59).
  Minute,
  // Hours slot (0-23).
  Hour,
  // Days slot (1-31).
  Day,
  // Months slot (1-12 or Jan-Dec).
  Month,
  // Day of the week slot (0-6 or Sun-Sat).
  DayOfWeek,
}

type SlotValueType = {
  [SlotType.Second]: number;
  [SlotType.Minute]: number;
  [SlotType.Hour]: number;
  [SlotType.Day]: number;
  [SlotType.Month]: number | MonthString;
  [SlotType.DayOfWeek]: number | DayString;
};

/// Main class to compose and manipulate a Cron expression.
/// All slots default to "*" which means that it fires for every value in that slot.
export class CronComposer {
  private slots: Map<SlotType, IBaseSlot<number | MonthString | DayString>>;

  // Constructor to initialize slots for the Cron expression.
  // Optionally declare whether to display seconds slot when printing here.
  constructor(private useSecond = false) {
    this.slots = new Map();
    this.slots.set(SlotType.Second, new SecondSlot());
    this.slots.set(SlotType.Minute, new MinuteSlot());
    this.slots.set(SlotType.Hour, new HourSlot());
    this.slots.set(SlotType.Day, new DaySlot());
    this.slots.set(SlotType.Month, new MonthSlot());
    this.slots.set(SlotType.DayOfWeek, new DayOfWeekSlot());
  }

  // Enables the seconds field in the Cron expression when being printed.
  enableSeconds() {
    this.useSecond = true;
    return this;
  }

  // Disables the seconds field in the Cron expression when being printed.
  disableSeconds() {
    this.useSecond = false;
    return this;
  }

  // Adds a single value to a specific slot type.
  addSingle<T extends SlotType>(slot: T, value: SlotValueType[T]) {
    this.slots.get(slot)!.addSingle(value);
    return this;
  }

  // Adds a range of values to a specific slot type.
  addRange<T extends SlotType>(
    slot: T,
    start: SlotValueType[T],
    end: SlotValueType[T],
  ) {
    this.slots.get(slot)!.addRange(start, end);
    return this;
  }

  // Adds a step value to a specific slot type, optionally starting from a given value.
  addStep<T extends SlotType>(slot: T, step: number, start?: SlotValueType[T]) {
    this.slots.get(slot)!.addStep(step, start);
    return this;
  }

  // Removes a single value to a specific slot type.
  removeSingle<T extends SlotType>(slot: T, value: SlotValueType[T]) {
    this.slots.get(slot)!.removeSingle(value);
    return this;
  }

  // Removes a range of values to a specific slot type.
  removeRange<T extends SlotType>(
    slot: T,
    start: SlotValueType[T],
    end: SlotValueType[T],
  ) {
    this.slots.get(slot)!.removeRange(start, end);
    return this;
  }

  // Removes a range of values to a specific slot type.
  removeStep<T extends SlotType>(
    slot: T,
    step: number,
    start?: SlotValueType[T],
  ) {
    this.slots.get(slot)!.removeStep(step, start);
    return this;
  }

  // Clears all values from a specific slot type.
  clear<T extends SlotType>(slot: T) {
    this.slots.get(slot)!.clear();
    return this;
  }

  // Converts the Cron expression into its string representation.
  toString() {
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

  // Parse a cron string and update the slots accodingly.
  parse(cronString: string) {
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

  // Helper method to parse each part of the cron string.
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
