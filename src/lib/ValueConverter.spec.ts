import { ValueConverter } from "./ValueConverter";

type Keys = "a" | "b" | "c";

const mapping: Record<Keys, number> = {
  a: 1,
  b: 2,
  c: 3,
};

describe("ValueConverter", () => {
  const valueConverter = new ValueConverter(mapping);

  test("should return the same number if a number is passed", () => {
    expect(valueConverter.convertToNumber(1)).toBe(1);
    expect(valueConverter.convertToNumber(2)).toBe(2);
    expect(valueConverter.convertToNumber(3)).toBe(3);
  });

  test("should return the mapped number if a string is passed", () => {
    expect(valueConverter.convertToNumber("a")).toBe(1);
    expect(valueConverter.convertToNumber("b")).toBe(2);
    expect(valueConverter.convertToNumber("c")).toBe(3);
  });

  test("should throw an error if an unmapped string is passed", () => {
    expect(() => valueConverter.convertToNumber("four" as any)).toThrow();
  });
});
