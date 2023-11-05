import { CronComposer, SlotType } from "./CronComposer";

describe("CronComposer", () => {
  let cronComposer: CronComposer;

  beforeEach(() => {
    cronComposer = new CronComposer();
  });

  test("should initialize correctly", () => {
    expect(cronComposer.toString()).toBe("* * * * *");
  });

  test("should enable and disable seconds correctly", () => {
    expect(cronComposer.enableSeconds().toString()).toBe("* * * * * *");
    expect(cronComposer.disableSeconds().toString()).toBe("* * * * *");
  });

  test("should manipulate second slot correctly", () => {
    cronComposer.addSingle(SlotType.Second, 1);
    expect(cronComposer.toString()).toBe("* * * * *");
    expect(cronComposer.enableSeconds().toString()).toBe("1 * * * * *");
  });

  test("should manipulate minute slot correctly", () => {
    cronComposer.addSingle(SlotType.Minute, 1);
    expect(cronComposer.toString()).toBe("1 * * * *");
    expect(cronComposer.enableSeconds().toString()).toBe("* 1 * * * *");
  });

  test("should manipulate hour slot correctly", () => {
    cronComposer.addSingle(SlotType.Hour, 1);
    expect(cronComposer.toString()).toBe("* 1 * * *");
    expect(cronComposer.enableSeconds().toString()).toBe("* * 1 * * *");
  });

  test("should manipulate day slot correctly", () => {
    cronComposer.addSingle(SlotType.Day, 1);
    expect(cronComposer.toString()).toBe("* * 1 * *");
    expect(cronComposer.enableSeconds().toString()).toBe("* * * 1 * *");
  });

  test("should manipulate month slot correctly", () => {
    cronComposer.addSingle(SlotType.Month, 1);
    expect(cronComposer.toString()).toBe("* * * 1 *");
    expect(cronComposer.enableSeconds().toString()).toBe("* * * * 1 *");
  });

  test("should manipulate day of week slot correctly", () => {
    cronComposer.addSingle(SlotType.DayOfWeek, 1);
    expect(cronComposer.toString()).toBe("* * * * 1");
    expect(cronComposer.enableSeconds().toString()).toBe("* * * * * 1");
  });
});
