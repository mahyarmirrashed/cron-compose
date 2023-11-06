# Cron Compose

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/mahyarmirrashed/cron-compose/blob/master/LICENSE.md)
[![NodeJS](https://img.shields.io/badge/node-%3E%3D16-green)](https://nodejs.org/en/download/)

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

const cronComposer = new CronComposer()
  .addSingle(SlotType.Minute, 1)
  .addRange(SlotType.Day, 1, 8)
  .addRange(SlotType.Day, 6, 14);

console.log(cronComposer.toString()); // "1 * 1-13 * *"
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
