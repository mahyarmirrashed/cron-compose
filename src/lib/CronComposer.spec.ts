import { CronComposer, SlotType } from "./CronComposer";

describe("CronComposer", () => {
  let cronComposer: CronComposer;

  function prependWithStar(slotValues: string, withSeconds = true) {
    if (withSeconds) return `* ${slotValues}`;
    else return slotValues;
  }

  beforeEach(() => {
    cronComposer = new CronComposer();
  });

  it("should initialize correctly", () => {
    expect(cronComposer.toString()).toBe("* * * * *");
  });

  it("should enable and disable seconds correctly", () => {
    expect(cronComposer.enableSeconds().toString()).toBe("* * * * * *");
    expect(cronComposer.disableSeconds().toString()).toBe("* * * * *");
  });

  it("should manipulate second slot correctly", () => {
    cronComposer.addSingle(SlotType.Second, 1);
    expect(cronComposer.toString()).toBe("* * * * *");
    expect(cronComposer.enableSeconds().toString()).toBe("1 * * * * *");
  });

  it("should manipulate minute slot correctly", () => {
    cronComposer.addSingle(SlotType.Minute, 1);
    expect(cronComposer.toString()).toBe("1 * * * *");
    expect(cronComposer.enableSeconds().toString()).toBe("* 1 * * * *");
  });

  it("should manipulate hour slot correctly", () => {
    cronComposer.addSingle(SlotType.Hour, 1);
    expect(cronComposer.toString()).toBe("* 1 * * *");
    expect(cronComposer.enableSeconds().toString()).toBe("* * 1 * * *");
  });

  it("should manipulate day slot correctly", () => {
    cronComposer.addSingle(SlotType.Day, 1);
    expect(cronComposer.toString()).toBe("* * 1 * *");
    expect(cronComposer.enableSeconds().toString()).toBe("* * * 1 * *");
  });

  it("should manipulate month slot correctly", () => {
    cronComposer.addSingle(SlotType.Month, 1);
    expect(cronComposer.toString()).toBe("* * * 1 *");
    expect(cronComposer.enableSeconds().toString()).toBe("* * * * 1 *");
  });

  it("should manipulate day of week slot correctly", () => {
    cronComposer.addSingle(SlotType.DayOfWeek, 1);
    expect(cronComposer.toString()).toBe("* * * * 1");
    expect(cronComposer.enableSeconds().toString()).toBe("* * * * * 1");
  });

  [true, false].forEach((withSeconds) => {
    it("should perform complex slot operations correctly", () => {
      if (withSeconds) cronComposer.enableSeconds();

      cronComposer.addSingle(SlotType.Minute, 1);
      expect(cronComposer.toString()).toBe(
        prependWithStar("1 * * * *", withSeconds),
      );
      cronComposer.addRange(SlotType.Minute, 1, 29);
      expect(cronComposer.toString()).toBe(
        prependWithStar("1-29 * * * *", withSeconds),
      );
      cronComposer.addStep(SlotType.Minute, 10, 10);
      expect(cronComposer.toString()).toBe(
        prependWithStar("1-30,40,50 * * * *", withSeconds),
      );
      cronComposer.removeSingle(SlotType.Minute, 1);
      expect(cronComposer.toString()).toBe(
        prependWithStar("2-30,40,50 * * * *", withSeconds),
      );
      cronComposer.removeRange(SlotType.Minute, 1, 9);
      expect(cronComposer.toString()).toBe(
        prependWithStar("10-30,40,50 * * * *", withSeconds),
      );
      cronComposer.removeStep(SlotType.Minute, 10, 10);
      expect(cronComposer.toString()).toBe(
        prependWithStar("11-19,21-29 * * * *", withSeconds),
      );
      cronComposer.clear(SlotType.Minute);
      expect(cronComposer.toString()).toBe(
        prependWithStar("* * * * *", withSeconds),
      );
    });
  });

  it("should parse a simple cron string correctly", () => {
    cronComposer.parse("* * * * *");
    expect(cronComposer.toString()).toBe("* * * * *");
  });

  it("should parse a simple cron string with seconds correctly", () => {
    cronComposer.parse("* * * * * *");
    expect(cronComposer.toString()).toBe("* * * * * *");
  });

  it("should parse a simple cron string with single value correctly", () => {
    cronComposer.parse("0 * * * *");
    expect(cronComposer.toString()).toBe("0 * * * *");
    cronComposer.parse("0 * * * * *");
    expect(cronComposer.toString()).toBe("0 * * * * *");
  });

  it("should parse a simple cron string with single range correctly", () => {
    cronComposer.parse("0-2 * * * *");
    expect(cronComposer.toString()).toBe("0-2 * * * *");
    cronComposer.parse("0-2 * * * * *");
    expect(cronComposer.toString()).toBe("0-2 * * * * *");
  });

  it("should parse a simple cron string with single step correctly", () => {
    cronComposer.parse("*/30 * * * *");
    expect(cronComposer.toString()).toBe("0,30 * * * *");
    cronComposer.parse("*/30 * * * * *");
    expect(cronComposer.toString()).toBe("0,30 * * * * *");
  });

  it("should parse a complex cron string correctly", () => {
    cronComposer.parse("3-4,5,6-8 */30,*/20 5-8,10-12 1,1 5,3,5 *");
    expect(cronComposer.toString()).toBe("3-8 0,20,30,40 5-8,10-12 1 3,5 *");
  });

  it("should throw an error for an invalid cron string", () => {
    expect(() => cronComposer.parse("")).toThrow("Invalid cron string format.");
  });

  it("should throw an error for an unknown part sequence", () => {
    expect(() => cronComposer.parse("d * * * *")).toThrow(
      "Unknown segment sequence encountered: d",
    );
  });
});
