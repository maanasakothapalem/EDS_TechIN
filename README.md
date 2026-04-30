# EDS TechIN Playwright Test Suite

This repository contains Playwright end-to-end tests for the Amazon India website.

## Project structure

- `playwright.config.ts` - Playwright test configuration
- `global-setup.ts` - Global setup script for tests
- `tests/` - Test files
- `pages/` - Page object files
- `commonUtils/` - Shared helper utilities
- `inputs_testData/` - Test data files
- `storageState.json` - Stored browser state for authenticated sessions

## Requirements

- Node.js 18+ or compatible
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. The project already includes TypeScript Node type definitions via `@types/node` and `tsconfig.json` is configured with `types: ["node"]`.

## Running tests

- Run all Playwright tests:

  ```bash
  npx playwright test
  ```

- Run a specific test file:

  ```bash
  npx playwright test tests/productPrices.spec.ts
  ```

- Run Chrome-only tests (project named `chrome` in `playwright.config.ts`):

  ```bash
  npx playwright test --project=chrome
  ```

## Playwright configuration notes

- `testDir` is set to `./tests`
- `fullyParallel` is disabled
- `headless` is disabled in `use` settings
- `storageState` is loaded from `storageState.json`
- `baseURL` is set to `https://www.amazon.in/`
- `trace` is enabled on first retry
- `globalSetup` points to `./global-setup`

## Notes

- If you encounter a TypeScript error about `process`, the repository already includes `@types/node` and `tsconfig.json` is configured to include Node types.
- If you add new test dependencies, update `package.json` and re-run `npm install`.

## Useful commands

- Install dependencies: `npm install`
- Run tests: `npx playwright test`
- Open the HTML report after running tests: `npx playwright show-report`
