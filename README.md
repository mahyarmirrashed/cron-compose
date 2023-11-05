# Cron Compose

[![npm](https://img.shields.io/npm/l/cron-compose.svg)](https://github.com/mahyarmirrashed/cron-compose/blob/master/LICENSE.md)

Cron Compose is a TypeScript library designed to make the creation of cron expressions simpler and less error-prone. With an intuitive API, it abstracts the complexities of cron syntax, allowing developers to build cron expressions through method chaining and clear function calls.

## Features

- **Ease of Use**: Construct cron expressions through easy-to-understand method calls.
- **Flexibility**: Add or remove specific time units or ranges effortlessly.
- **Type Safety**: Leveage TypeScript's type-checking to avoid invalid inputs.
- **Clean Output**: Automatically removes unnecessary elements and outputs clean cron strings.

## Installation

To install Cron Compose, run the following command:

```bash
npm install cron-compose
```

## Usage

Here's how to use Cron Compose:

```ts
import { CronComposer, SlotType } from "cron-compose";

const cronExpr = new CronComposer()
  .addSingle(SlotType.Minute, 1)
  .addRange(SlotType.Day, 1, 8)
  .addRange(SlotType.Day, 6, 14)
  .toString();

console.log(cronExpr); // Outputs the generated cron expression
```

## API Overview

- `addSingle(slot: SlotType, value: number | string)`: Adds a single value to the specified slot.
- `addRange(slot: SlotType, start: number | string, end: number | string)`: Adds a range of values to the specified slot.
- `addStep(slot: SlotType, step: number, start?: number | string)`: Adds a step value to the specified slot.
- `removeSingle(slot: SlotType, value: number | string)`: Removes a single value from the specified slot.
- `removeRange(slot: SlotType, start: number | string, end: number | string)`: Removes a range of values from the specified slot.
- `removeStep(slot: SlotType, step: number, start?: number | string)`: Removes a step value from the specified slot.
- `clear(slot: SlotType)`: Clears all values from the specified slot.
- `toString()`: Outputs the composed cron expression as a string.

## Testing

To run tests, use the following command:

```bash
pnpm run test
```

## Contributing

I welcome all contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the the [MIT License](./LICENSE).
