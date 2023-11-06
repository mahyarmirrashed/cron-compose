export class ValueConverter<T extends Record<string, number>> {
  constructor(private mapping: T) {}

  convertToNumber(value: number | keyof T) {
    if (typeof value === "number") return value;
    const mappedValue = this.mapping[value];

    if (mappedValue === undefined)
      throw new Error("Value is not in the mapping.");
    return mappedValue;
  }
}
