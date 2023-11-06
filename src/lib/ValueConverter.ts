export class ValueConverter<T extends Record<string, number>> {
  constructor(private mapping: T) {}

  convertToNumber(value: number | keyof T): number {
    if (typeof value === "number") return value;
    return this.mapping[value];
  }
}
