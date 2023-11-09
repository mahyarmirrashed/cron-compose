import { CronComposer } from "./CronComposer";

describe("CronComposerChains", () => {
  let cronComposer: CronComposer;

  beforeEach(() => {
    cronComposer = new CronComposer();
  });

  it("should remove a single month to slot correctly", () => {
    cronComposer.every(1, "months");
    cronComposer.except.in("jan");
    expect(cronComposer.toString()).toBe("* * * 2-12 *");
  });

  it("should remove consecutive months to the slot correctly", () => {
    cronComposer.every(1, "months");
    cronComposer.except.in("jan", "feb", "mar");
    expect(cronComposer.toString()).toBe("* * * 4-12 *");
  });

  it("should remove multiple months to the slot correctly", () => {
    cronComposer.every(1, "months");
    cronComposer.except.in("jan", "mar");
    expect(cronComposer.toString()).toBe("* * * 2,4-12 *");
  });

  it("should remove a single day of the week to the slot correctly", () => {
    cronComposer.every(1, "weekdays");
    cronComposer.except.on("sun");
    expect(cronComposer.toString()).toBe("* * * * 1-6");
  });

  it("should remove consecutive days of the week to the slot correctly", () => {
    cronComposer.every(1, "weekdays");
    cronComposer.except.on("sun", "mon", "tue");
    expect(cronComposer.toString()).toBe("* * * * 3-6");
  });

  it("should remove multiple days of the week to the slot correctly", () => {
    cronComposer.every(1, "weekdays");
    cronComposer.except.on("sun", "tue");
    expect(cronComposer.toString()).toBe("* * * * 1,3-6");
  });

  it("should set a specific hour to the slot correctly", () => {
    cronComposer.every(1, "hours");
    cronComposer.except.at(1);
    expect(cronComposer.toString()).toBe("* 0,2-23 * * *");
  });

  it("should set a specific hour with an AM meridiem correctly", () => {
    cronComposer.every(1, "hours");
    cronComposer.except.at(1, "am");
    expect(cronComposer.toString()).toBe("* 0,2-23 * * *");
  });

  it("should set a specific hour with an PM meridiem correctly", () => {
    cronComposer.every(1, "hours");
    cronComposer.except.at(1, "pm");
    expect(cronComposer.toString()).toBe("* 0-12,14-23 * * *");
  });

  it("should set midnight correctly", () => {
    cronComposer.every(1, "hours");
    cronComposer.except.at(12, "am");
    expect(cronComposer.toString()).toBe("* 1-23 * * *");
  });

  it("should set noon correctly", () => {
    cronComposer.every(1, "hours");
    cronComposer.except.at(12, "pm");
    expect(cronComposer.toString()).toBe("* 0-11,13-23 * * *");
  });

  it("should remove step value to each field correctly", () => {
    cronComposer.enableSeconds();
    cronComposer.every(1, "seconds");
    cronComposer.every(1, "minutes");
    cronComposer.every(1, "hours");
    cronComposer.every(1, "days");
    cronComposer.every(1, "months");
    cronComposer.every(1, "weekdays");
    cronComposer.except.every(30, "seconds");
    cronComposer.except.every(30, "minutes");
    cronComposer.except.every(12, "hours");
    cronComposer.except.every(15, "days");
    cronComposer.except.every(6, "months");
    cronComposer.except.every(2, "weekdays");
    expect(cronComposer.toString()).toBe(
      "1-29,31-59 1-29,31-59 1-11,13-23 2-15,17-30 2-6,8-12 1,3,5",
    );
  });

  it("should remove hour range correctly", () => {
    cronComposer.every(1, "hours").except.from(6, "am").to(4, "pm");
    expect(cronComposer.toString()).toBe("* 0-5,17-23 * * *");
  });
});
