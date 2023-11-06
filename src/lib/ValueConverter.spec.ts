import { ValueConverter } from "./ValueConverter";

type Keys = "a" | "b" | "c";

const mapping: Record<Keys, number> = {
  a: 1,
  b: 2,
  c: 3,
};

describe("ValueConverter", () => {
  const valueConverter = new ValueConverter(mapping);

  test("should convert correctly", () => {
    expect(valueConverter.convertToNumber("a")).toBe(1);
    expect(valueConverter.convertToNumber("b")).toBe(2);
    expect(valueConverter.convertToNumber("c")).toBe(3);
  });
});
