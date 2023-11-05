import BaseSlot from "./BaseSlot";

class DummySlot extends BaseSlot {
  constructor() {
    super(60);
  }
}

describe("BaseSlot", () => {
  let slot: DummySlot;

  beforeEach(() => {
    slot = new DummySlot();
  });

  test("should initialize correctly", () => {
    expect(slot.toString()).toBe("*");
  });

  test("should add single value correctly", () => {
    slot.addSingle(0);
    expect(slot.toString()).toBe("0");
  });

  test("should add all single values and return *", () => {
    Array.from({ length: 60 }, (_, i) => slot.addSingle(i));
    expect(slot.toString()).toBe("*");
  });

  test("should throw an error when adding single value is less than lower bound", () => {
    expect(() => slot.addSingle(-1)).toThrow("Value -1 is out of bounds.");
  });

  test("should throw an error when adding single value is greater than upper bound", () => {
    expect(() => slot.addSingle(60)).toThrow("Value 60 is out of bounds.");
  });

  test("should add range correctly", () => {
    slot.addRange(0, 30);
    expect(slot.toString()).toBe("0-29");
  });

  test("should cover entire range and return *", () => {
    slot.addRange(0, 60);
    expect(slot.toString()).toBe("*");
  });

  test("should combine adjacent ranges correctly", () => {
    slot.addRange(0, 5);
    slot.addRange(5, 10);
    expect(slot.toString()).toBe("0-9");
  });

  test("should combine intersecting ranges correctly", () => {
    slot.addRange(0, 10);
    slot.addRange(5, 15);
    expect(slot.toString()).toBe("0-14");
  });

  test("should throw an error when adding starting value less than lower bound", () => {
    expect(() => slot.addRange(-1, 0)).toThrow("Value -1 is out of bounds.");
  });

  test("should throw an error when adding ending value is greater than upper bound", () => {
    expect(() => slot.addRange(0, 61)).toThrow("Value 60 is out of bounds");
  });

  test("should throw an error when adding upper bound is less than lower bound", () => {
    expect(() => slot.addRange(20, 10)).toThrow(
      "Start value must be less than or equal to end value.",
    );
  });

  test("should add steps correctly", () => {
    slot.addStep(15);
    expect(slot.toString()).toBe("0,15,30,45");
  });

  test("should add steps correctly with starting value", () => {
    slot.addStep(15, 5);
    expect(slot.toString()).toBe("5,20,35,50");
  });

  test("should combine add steps correctly and return *", () => {
    slot.addStep(2);
    slot.addStep(2, 1);
    expect(slot.toString()).toBe("*");
  });

  test("should throw an error when add step value is less than 1", () => {
    expect(() => slot.addStep(0)).toThrow("Step must be greater than 0.");
  });

  test("should remove single value correctly", () => {
    slot.addRange(0, 60);
    slot.removeSingle(0);
    expect(slot.toString()).toBe("1-59");
  });

  test("should remove only value correctly and return *", () => {
    slot.addSingle(0);
    slot.removeSingle(0);
    expect(slot.toString()).toBe("*");
  });

  test("should throw an error when removing single value is less than lower bound", () => {
    expect(() => slot.removeSingle(-1)).toThrow("Value -1 is out of bounds.");
  });

  test("should throw an error when removing single value is greater than upper bound", () => {
    expect(() => slot.removeSingle(60)).toThrow("Value 60 is out of bounds.");
  });

  test("should remove range correctly", () => {
    slot.addRange(0, 60);
    slot.removeRange(5, 25);
    expect(slot.toString()).toBe("0-4,25-59");
  });

  test("should remove adjacent ranges correctly", () => {
    slot.addRange(0, 60);
    slot.removeRange(5, 15);
    slot.removeRange(15, 25);
    expect(slot.toString()).toBe("0-4,25-59");
  });

  test("should remove intersecting ranges correctly", () => {
    slot.addRange(0, 60);
    slot.removeRange(5, 20);
    slot.removeRange(10, 25);
    expect(slot.toString()).toBe("0-4,25-59");
  });

  test("should throw an error when removing starting value less than lower bound", () => {
    expect(() => slot.removeRange(-1, 0)).toThrow("Value -1 is out of bounds.");
  });

  test("should throw an error when removing ending value is greater than upper bound", () => {
    expect(() => slot.removeRange(0, 61)).toThrow("Value 60 is out of bounds");
  });

  test("should throw an error when removing upper bound is less than lower bound", () => {
    expect(() => slot.removeRange(20, 10)).toThrow(
      "Start value must be less than or equal to end value.",
    );
  });

  test("should remove steps correctly", () => {
    slot.addRange(0, 60);
    slot.removeStep(15);
    expect(slot.toString()).toBe("1-14,16-29,31-44,46-59");
  });

  test("should remove steps correctly with starting value", () => {
    slot.addRange(0, 60);
    slot.removeStep(15, 5);
    expect(slot.toString()).toBe("0-4,6-19,21-34,36-49,51-59");
  });

  test("should combine remove steps correctly and return *", () => {
    slot.addRange(0, 60);
    slot.removeStep(2);
    slot.removeStep(2, 1);
    expect(slot.toString()).toBe("*");
  });

  test("should throw an error when add step value is less than 1", () => {
    expect(() => slot.removeStep(0)).toThrow("Step must be greater than 0.");
  });

  test("should clear correctly", () => {
    slot.addSingle(0);
    slot.clear();
    expect(slot.toString()).toBe("*");
  });

  test("should clear correctly after multiple operations", () => {
    slot.addStep(2);
    slot.removeStep(3);
    slot.addSingle(1);
    slot.removeSingle(2);
    slot.addRange(20, 40);
    slot.removeRange(25, 35);
    slot.clear();
    expect(slot.toString()).toBe("*");
  });

  test("should handle complex series of operations", () => {
    slot.addStep(2);
    slot.removeStep(3);
    slot.addSingle(1);
    slot.removeSingle(2);
    slot.addRange(10, 60);
    slot.removeRange(20, 50);
    expect(slot.toString()).toBe("1,4,8,10-19,50-59");
  });
});
