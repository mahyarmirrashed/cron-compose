# Cron Compose

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/mahyarmirrashed/cron-compose/blob/master/LICENSE.md)
[![NodeJS](https://img.shields.io/badge/node-%3E%3D16-green)](https://nodejs.org/en/download/)
[![Codecov](https://img.shields.io/codecov/c/github/mahyarmirrashed/cron-compose)](https://codecov.io/gh/mahyarmirrashed/cron-compose)

Cron Compose is a TypeScript library designed to make the creation of cron expressions simpler and less error-prone. With an intuitive API, it abstracts the complexities of cron syntax, allowing developers to build cron expressions through method chaining and clear function calls.

## Features

- **Ease of Use**: Construct cron expressions through easy-to-understand method calls.
- **Manipulate Existing Strings**: Load existing cron expressions and manipulate them.
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

const cronComposer = new CronComposer()
  .addSingle(SlotType.Minute, 1)
  .addRange(SlotType.Day, 1, 8)
  .addRange(SlotType.Day, 6, 13);

console.log(cronComposer.toString()); // "1 * 1-13 * *"
```

You can also parse existing Cron strings with it:

```ts
import { CronComposer } from "cron-compose";

const cronComposer = new CronComposer().parse(
  "3-4,5,6-8 */30,*/20 5-8,10-12 1,1 5,3,5 *",
);

console.log(cronComposer.toString()); // "3-8 0,20,30,40 5-8,10-12 1 3,5 *"
```

## Testing

To run tests, use the following command:

```bash
pnpm run test
```

## Contributing

I welcome all contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the the [MIT License](./LICENSE).
