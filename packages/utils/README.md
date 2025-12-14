# @hono-vite-turbo/utils

Shared utilities package for the hono-vite-turbo monorepo.

## Installation

This package is part of the monorepo and doesn't need to be installed separately. It's automatically available to all apps in the workspace.

## Usage

You can import the utilities using either a relative path or the package alias:

### Using the package alias (recommended):

```typescript
import { greet } from '@hono-vite-turbo/utils';

const message = greet('Alice');
console.log(message); // Output: "Hello, Alice!"

const defaultMessage = greet();
console.log(defaultMessage); // Output: "Hello, World!"
```

### Using a relative path:

```typescript
import { greet } from '../../packages/utils/src';

const message = greet('Bob');
console.log(message); // Output: "Hello, Bob!"
```

## API

### `greet(name?: string): string`

Returns a friendly greeting message.

- **Parameters:**
  - `name` (optional): The name to greet. Defaults to "World" if not provided.
- **Returns:** A greeting string in the format "Hello, [name]!"

## License

MIT
