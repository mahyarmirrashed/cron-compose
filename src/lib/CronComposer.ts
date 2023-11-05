import { IBaseSlot } from "./slots/BaseSlot";
import DayOfWeekSlot, { DayString } from "./slots/DayOfWeekSlot";
import DaySlot from "./slots/DaySlot";
import HourSlot from "./slots/HourSlot";
import MinuteSlot from "./slots/MinuteSlot";
import MonthSlot, { MonthString } from "./slots/MonthSlot";
import SecondSlot from "./slots/SecondSlot";

export enum SlotType {
  Second,
  Minute,
  Hour,
  Day,
  Month,
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

export class CronComposer {
  private slots: Map<SlotType, IBaseSlot<number | MonthString | DayString>>;

  constructor(private useSecond = false) {
    this.slots = new Map();
    this.slots.set(SlotType.Second, new SecondSlot());
    this.slots.set(SlotType.Minute, new MinuteSlot());
    this.slots.set(SlotType.Hour, new HourSlot());
    this.slots.set(SlotType.Day, new DaySlot());
    this.slots.set(SlotType.Month, new MonthSlot());
    this.slots.set(SlotType.DayOfWeek, new DayOfWeekSlot());
  }

  enableSeconds() {
    this.useSecond = true;
    return this;
  }

  disableSeconds() {
    this.useSecond = false;
    return this;
  }

  addSingle<T extends SlotType>(slot: T, value: SlotValueType[T]) {
    this.slots.get(slot)?.addSingle(value);
    return this;
  }

  addRange<T extends SlotType>(
    slot: T,
    start: SlotValueType[T],
    end: SlotValueType[T],
  ) {
    this.slots.get(slot)?.addRange(start, end);
    return this;
  }

  addStep<T extends SlotType>(slot: T, step: number, start?: SlotValueType[T]) {
    this.slots.get(slot)?.addStep(step, start);
    return this;
  }

  removeSingle<T extends SlotType>(slot: T, value: SlotValueType[T]) {
    this.slots.get(slot)?.removeSingle(value);
    return this;
  }

  removeRange<T extends SlotType>(
    slot: T,
    start: SlotValueType[T],
    end: SlotValueType[T],
  ) {
    this.slots.get(slot)?.removeRange(start, end);
    return this;
  }

  removeStep<T extends SlotType>(
    slot: T,
    step: number,
    start?: SlotValueType[T],
  ) {
    this.slots.get(slot)?.removeStep(step, start);
    return this;
  }

  clear<T extends SlotType>(slot: T) {
    this.slots.get(slot)?.clear();
    return this;
  }

  toString() {
    const parts = [
      this.slots.get(SlotType.Minute)?.toString(),
      this.slots.get(SlotType.Hour)?.toString(),
      this.slots.get(SlotType.Day)?.toString(),
      this.slots.get(SlotType.Month)?.toString(),
      this.slots.get(SlotType.DayOfWeek)?.toString(),
    ];

    if (this.useSecond)
      parts.unshift(this.slots.get(SlotType.Second)?.toString());

    return parts.join(" ");
  }
}
