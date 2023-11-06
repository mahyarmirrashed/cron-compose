import DayOfWeekSlot from "./DayOfWeekSlot";

describe("DayOfWeekSlot", () => {
  let slot: DayOfWeekSlot;

  beforeEach(() => {
    slot = new DayOfWeekSlot();
  });

  it("should initialize correctly", () => {
    expect(slot.toString()).toBe("*");
  });

  it("should add single number value correctly", () => {
    slot.addSingle(0);
    expect(slot.toString()).toBe("0");
  });

  it("should add single day of week enum correctly", () => {
    slot.addSingle("sun");
    expect(slot.toString()).toBe("0");
  });

  it("should add number range correctly", () => {
    slot.addRange(0, 3);
    expect(slot.toString()).toBe("0-2");
  });

  it("should add day of week enum range correctly", () => {
    slot.addRange("sun", "wed");
    expect(slot.toString()).toBe("0-2");
  });

  it("should add number range correctly and return *", () => {
    slot.addRange(0, 7);
    expect(slot.toString()).toBe("*");
  });

  it("should add step with no start correctly", () => {
    slot.addStep(2);
    expect(slot.toString()).toBe("0,2,4,6");
  });

  it("should add step with number start correctly", () => {
    slot.addStep(2, 2);
    expect(slot.toString()).toBe("2,4,6");
  });

  it("should add step with day of week enum start correctly", () => {
    slot.addStep(2, "mon");
    expect(slot.toString()).toBe("1,3,5");
  });

  it("should remove single number value correctly", () => {
    slot.addRange(0, 7);
    slot.removeSingle(0);
    expect(slot.toString()).toBe("1-6");
  });

  it("should remove single day of week enum correctly", () => {
    slot.addRange(0, 7);
    slot.removeSingle("sun");
    expect(slot.toString()).toBe("1-6");
  });

  it("should remove number range correctly", () => {
    slot.addRange(0, 7);
    slot.removeRange(3, 5);
    expect(slot.toString()).toBe("0-2,5-6");
  });

  it("should remove day of week enum range correctly", () => {
    slot.addRange(0, 7);
    slot.removeRange("tue", "thu");
    expect(slot.toString()).toBe("0-1,4-6");
  });

  it("should remove step with no start correctly", () => {
    slot.addRange(0, 7);
    slot.removeStep(2);
    expect(slot.toString()).toBe("1,3,5");
  });

  it("should remove step with number start correctly", () => {
    slot.addRange(0, 7);
    slot.removeStep(2, 2);
    expect(slot.toString()).toBe("0-1,3,5");
  });

  it("should remove step with day of week enum start correctly", () => {
    slot.addRange(0, 7);
    slot.removeStep(2, "tue");
    expect(slot.toString()).toBe("0-1,3,5");
  });
});
