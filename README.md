# Ocelloids Services Quickstart

To install dependencies, run:

```bash
bun install
```

To run the application, execute:

```bash
bun run index.ts
```

## Examples

You can find usage examples in the examples/ folder of this repository.

To run an example, execute:

```bash
OC_API_KEY=<YOUR_API_KEY> bun run examples/steward/assets-metadata.ts
```

Replace `YOUR_API_KEY` with your Ocelloids API key.

Alternatively, you can create a `.env` file in the project root directory to store the API key:

```bash
# .env file
OC_API_KEY=<YOUR_API_KEY>
```

After setting up your API key, you can execute any example by running:

```bash
bun run examples/steward/assets-metadata.ts
```
