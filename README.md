# Tenor API Wrapper

[![Node Current](https://img.shields.io/badge/node-%3E%3D22.11.0-brightgreen)](https://github.com/nodejs/node)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4)](https://github.com/prettier/prettier)

A Node.js package that provides a wrapper for simplifying interactions with [Tenor's API (v2)](https://developers.google.com/tenor/guides/quickstart). It handles getting GIFs, GIF categories, search terms, and registering GIF share events.

## Installation

> [!IMPORTANT]
> My packages are available in GitHub packages, **NOT** npm; therefore, you must define the registry of the `@cielsachen` namespace in a `.npmrc` file:
>
> ```properties
> @cielsachen:registry=https://npm.pkg.github.com
> ```

```bash
pnpm add @cielsachen/tenor-api-wrapper
```

## Usage

> [!WARNING]
> Because this package does not have validations for the parameters passed onto the methods, [TypeScript](https://www.typescriptlang.org/) is required.

This package exports the `TenorApi` class; you must create a new instance of this class and passing your Tenor API key as its first argument:

```ts
import { TenorApi } from "@cielsachen/tenor-api-wrapper";

const tenorApi = new TenorApi(process.end.TENOR_KEY);
```

You can also set global parameters by passing an object containing the parameters as the second argument:

```ts
const tenorApi = new TenorApi(process.end.TENOR_KEY, {
  clientKey: "my_test_app",
  locale: "ko",
});
```

### Example

Here's a simple example of getting eight GIFs:

```ts
import { TenorApi } from "@cielsachen/tenor-api-wrapper";

const tenorApi = new TenorApi(process.end.TENOR_KEY, {
  clientKey: "my_test_app",
});

try {
  const { results: gifs } = tenorApi.getGifsBySearch("excited", {
    limit 8,
  });

  // Handle the gifs.
} catch (error) {
  // Handle any thrown errors.
}
```
