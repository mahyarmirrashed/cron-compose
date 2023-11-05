import OffsetBaseSlot from "./OffsetBaseSlot";

class DummyOffsetSlot extends OffsetBaseSlot {
  constructor() {
    super(60);
  }
}

describe("OffsetBaseSlot", () => {
  let offsetSlot: DummyOffsetSlot;

  beforeEach(() => {
    offsetSlot = new DummyOffsetSlot();
  });

  test("should initialize correctly", () => {
    expect(offsetSlot.toString()).toBe("*");
  });

  test("should throw an error when adding single value 0", () => {
    expect(() => offsetSlot.addSingle(0)).toThrow("Value 0 is out of bounds.");
  });

  test("should throw an error when adding range starting with 0", () => {
    expect(() => offsetSlot.addRange(0, 10)).toThrow(
      "Value 0 is out of bounds.",
    );
  });

  test("should throw an error when adding step starting with 0", () => {
    expect(() => offsetSlot.addStep(10, 0)).toThrow(
      "Value 0 is out of bounds.",
    );
  });

  test("should throw an error when removing single value 0", () => {
    expect(() => offsetSlot.removeSingle(0)).toThrow(
      "Value 0 is out of bounds.",
    );
  });

  test("should throw an error when removing range starting with 0", () => {
    expect(() => offsetSlot.removeRange(0, 10)).toThrow(
      "Value 0 is out of bounds.",
    );
  });

  test("should throw an error when removing step starting with 0", () => {
    expect(() => offsetSlot.removeStep(10, 0)).toThrow(
      "Value 0 is out of bounds.",
    );
  });

  test("should manipulate series of slot operations correctly", () => {
    offsetSlot.addSingle(1);
    expect(offsetSlot.toString()).toBe("1");
    offsetSlot.addRange(1, 30);
    expect(offsetSlot.toString()).toBe("1-29");
    offsetSlot.addStep(10, 10);
    expect(offsetSlot.toString()).toBe("1-30,40,50");
    offsetSlot.removeSingle(1);
    expect(offsetSlot.toString()).toBe("2-30,40,50");
    offsetSlot.removeRange(1, 10);
    expect(offsetSlot.toString()).toBe("10-30,40,50");
    offsetSlot.removeStep(10, 10);
    expect(offsetSlot.toString()).toBe("11-19,21-29");
  });
});
