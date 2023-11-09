import BaseSlot from "./BaseSlot";

class DummySlot extends BaseSlot {
  constructor(size = 60) {
    super(size);
  }
}

describe("BaseSlot", () => {
  let slot: DummySlot;

  beforeEach(() => {
    slot = new DummySlot();
  });

  it("should initialize correctly", () => {
    expect(slot.toString()).toBe("*");
  });

  it("should add single value correctly", () => {
    slot.addSingle(0);
    expect(slot.toString()).toBe("0");
  });

  it("should add all single values and return *", () => {
    Array.from({ length: 60 }, (_, i) => slot.addSingle(i));
    expect(slot.toString()).toBe("*");
  });

  it("should throw an error when adding single value is less than lower bound", () => {
    expect(() => slot.addSingle(-1)).toThrow("Value -1 is out of bounds.");
  });

  it("should throw an error when adding single value is greater than upper bound", () => {
    expect(() => slot.addSingle(60)).toThrow("Value 60 is out of bounds.");
  });

  it("should add range correctly", () => {
    slot.addRange(0, 29);
    expect(slot.toString()).toBe("0-29");
  });

  it("should add terminating single value range correctly", () => {
    slot.addRange(59, 59);
    expect(slot.toString()).toBe("59");
  });

  it("should cover entire range and return *", () => {
    slot.addRange(0, 59);
    expect(slot.toString()).toBe("*");
  });

  it("should combine adjacent ranges correctly", () => {
    slot.addRange(0, 4);
    slot.addRange(5, 9);
    expect(slot.toString()).toBe("0-9");
  });

  it("should combine intersecting ranges correctly", () => {
    slot.addRange(0, 9);
    slot.addRange(5, 14);
    expect(slot.toString()).toBe("0-14");
  });

  it("should throw an error when adding starting value less than lower bound", () => {
    expect(() => slot.addRange(-1, 0)).toThrow("Value -1 is out of bounds.");
  });

  it("should throw an error when adding ending value is greater than upper bound", () => {
    expect(() => slot.addRange(0, 60)).toThrow("Value 60 is out of bounds");
  });

  it("should throw an error when adding upper bound is less than lower bound", () => {
    expect(() => slot.addRange(20, 10)).toThrow(
      "Start value must be less than or equal to end value.",
    );
  });

  it("should add steps correctly", () => {
    slot.addStep(15);
    expect(slot.toString()).toBe("0,15,30,45");
  });

  it("should add steps correctly with starting value", () => {
    slot.addStep(15, 5);
    expect(slot.toString()).toBe("5,20,35,50");
  });

  it("should combine add steps correctly and return *", () => {
    slot.addStep(2);
    slot.addStep(2, 1);
    expect(slot.toString()).toBe("*");
  });

  it("should throw an error when add step value is less than 1", () => {
    expect(() => slot.addStep(0)).toThrow("Step must be greater than 0.");
  });

  it("should remove single value correctly", () => {
    slot.addRange(0, 59);
    slot.removeSingle(0);
    expect(slot.toString()).toBe("1-59");
  });

  it("should remove only value correctly and return *", () => {
    slot.addSingle(0);
    slot.removeSingle(0);
    expect(slot.toString()).toBe("*");
  });

  it("should throw an error when removing single value is less than lower bound", () => {
    expect(() => slot.removeSingle(-1)).toThrow("Value -1 is out of bounds.");
  });

  it("should throw an error when removing single value is greater than upper bound", () => {
    expect(() => slot.removeSingle(60)).toThrow("Value 60 is out of bounds.");
  });

  it("should remove range correctly", () => {
    slot.addRange(0, 59);
    slot.removeRange(5, 24);
    expect(slot.toString()).toBe("0-4,25-59");
  });

  it("should remove adjacent ranges correctly", () => {
    slot.addRange(0, 59);
    slot.removeRange(5, 14);
    slot.removeRange(15, 24);
    expect(slot.toString()).toBe("0-4,25-59");
  });

  it("should remove intersecting ranges correctly", () => {
    slot.addRange(0, 59);
    slot.removeRange(5, 19);
    slot.removeRange(10, 24);
    expect(slot.toString()).toBe("0-4,25-59");
  });

  it("should throw an error when removing starting value less than lower bound", () => {
    expect(() => slot.removeRange(-1, 0)).toThrow("Value -1 is out of bounds.");
  });

  it("should throw an error when removing ending value is greater than upper bound", () => {
    expect(() => slot.removeRange(0, 60)).toThrow("Value 60 is out of bounds");
  });

  it("should throw an error when removing upper bound is less than lower bound", () => {
    expect(() => slot.removeRange(20, 10)).toThrow(
      "Start value must be less than or equal to end value.",
    );
  });

  it("should remove steps correctly", () => {
    slot.addRange(0, 59);
    slot.removeStep(15);
    expect(slot.toString()).toBe("1-14,16-29,31-44,46-59");
  });

  it("should remove steps correctly with starting value", () => {
    slot.addRange(0, 59);
    slot.removeStep(15, 5);
    expect(slot.toString()).toBe("0-4,6-19,21-34,36-49,51-59");
  });

  it("should combine remove steps correctly and return *", () => {
    slot.addRange(0, 59);
    slot.removeStep(2);
    slot.removeStep(2, 1);
    expect(slot.toString()).toBe("*");
  });

  it("should throw an error when add step value is less than 1", () => {
    expect(() => slot.removeStep(0)).toThrow("Step must be greater than 0.");
  });

  it("should clear correctly", () => {
    slot.addSingle(0);
    slot.clear();
    expect(slot.toString()).toBe("*");
  });

  it("should intersect normal selections correctly", () => {
    const res = slot.addStep(30).intersect(new DummySlot().addStep(20));

    expect(res[0]).toBe(true);

    res[0] = false;

    expect(res.every((val) => !val)).toBe(true);
  });

  it("should intersect a single wildcard correctly", () => {
    const res = slot.addStep(30).intersect(new DummySlot().addStep(1));

    expect(res[0]).toBe(true);
    expect(res[30]).toBe(true);

    res[0] = false;
    res[30] = false;

    expect(res.every((val) => !val)).toBe(true);
  });

  it("should intersect two wildcards correctly", () => {
    const res = slot.addStep(1).intersect(new DummySlot().addStep(1));
    expect(res.every((val) => val)).toBe(true);
  });

  it("should throw an error when intersecting different sized slots correctly", () => {
    expect(() => slot.intersect(new DummySlot(30))).toThrow(
      "Cannot intersect slots with different maximum values.",
    );
  });

  it("should clear correctly after multiple operations", () => {
    slot.addStep(2);
    slot.removeStep(3);
    slot.addSingle(1);
    slot.removeSingle(2);
    slot.addRange(20, 39);
    slot.removeRange(25, 34);
    slot.clear();
    expect(slot.toString()).toBe("*");
  });

  it("should handle complex series of operations", () => {
    slot.addStep(2);
    slot.removeStep(3);
    slot.addSingle(1);
    slot.removeSingle(2);
    slot.addRange(10, 59);
    slot.removeRange(20, 49);
    expect(slot.toString()).toBe("1,4,8,10-19,50-59");
  });
});
