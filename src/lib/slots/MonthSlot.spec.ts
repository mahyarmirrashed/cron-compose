import MonthSlot from "./MonthSlot";

describe("MonthSlot", () => {
  let slot: MonthSlot;

  beforeEach(() => {
    slot = new MonthSlot();
  });

  it("should initialize correctly", () => {
    expect(slot.toString()).toBe("*");
  });

  it("should add single number value correctly", () => {
    slot.addSingle(1);
    expect(slot.toString()).toBe("1");
  });

  it("should add single month enum correctly", () => {
    slot.addSingle("jan");
    expect(slot.toString()).toBe("1");
  });

  it("should add number range correctly", () => {
    slot.addRange(1, 13);
    expect(slot.toString()).toBe("1-12");
  });

  it("should add number range correctly", () => {
    slot.addRange("jan", "dec");
    expect(slot.toString()).toBe("1-12");
  });

  it("should add step with no start correctly", () => {
    slot.addStep(2);
    expect(slot.toString()).toBe("1,3,5,7,9,11");
  });

  it("should add step with number start correctly", () => {
    slot.addStep(2, 2);
    expect(slot.toString()).toBe("2,4,6,8,10,12");
  });

  it("should add step with month enum start correctly", () => {
    slot.addStep(2, "feb");
    expect(slot.toString()).toBe("2,4,6,8,10,12");
  });

  it("should remove single number value correctly", () => {
    slot.addRange(1, 13);
    slot.removeSingle(1);
    expect(slot.toString()).toBe("2-12");
  });

  it("should remove single month enum correctly", () => {
    slot.addRange(1, 13);
    slot.removeSingle("jan");
    expect(slot.toString()).toBe("2-12");
  });

  it("should remove number range correctly", () => {
    slot.addRange(1, 13);
    slot.removeRange(3, 5);
    expect(slot.toString()).toBe("1-2,5-12");
  });

  it("should remove month enum range correctly", () => {
    slot.addRange(1, 13);
    slot.removeRange("mar", "may");
    expect(slot.toString()).toBe("1-2,5-12");
  });

  it("should remove step with no start correctly", () => {
    slot.addRange(1, 13);
    slot.removeStep(2);
    expect(slot.toString()).toBe("2,4,6,8,10,12");
  });

  it("should remove step with number start correctly", () => {
    slot.addRange(1, 13);
    slot.removeStep(2, 2);
    expect(slot.toString()).toBe("1,3,5,7,9,11");
  });

  it("should remove step with month enum start correctly", () => {
    slot.addRange(1, 13);
    slot.removeStep(2, "feb");
    expect(slot.toString()).toBe("1,3,5,7,9,11");
  });
});
