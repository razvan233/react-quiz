# React Quiz

Small single-page React quiz application used in the "Ultimate React" course.

This repository contains a Create React App client that fetches question data from a local JSON API (served with `json-server`). Tests for UI components are provided under `src/components/__tests__`.

## Quick Start

1. Install dependencies:

```powershell
npm install
```

2. Start the local JSON API (serves `data/questions.json` at `http://localhost:8000/questions`):

```powershell
npm run server
```

3. In a separate terminal start the React dev server:

```powershell
npm start
```

Open `http://localhost:3000` in your browser.

## Scripts

- `npm start` — Runs the app in development mode.
- `npm run server` — Starts `json-server --watch data/questions.json --port 8000` (local API).
- `npm test` — Runs the test suite (Jest + React Testing Library).
- `npm run build` — Builds the app for production.

## Tests

Component tests live in `src/components/__tests__` and cover presentation and basic interactions. Key points:

- `Question.test.js` uses fake timers to assert timer behavior and that `timeFinished` dispatch happens when time reaches zero.
- `Option.test.js` verifies option buttons, dispatch calls for `newAnswer`, and that the "Next" button appears after answering.
- `App.test.js` stubs `fetch` to validate the app's initial loading behavior.

Run tests:

```powershell
npm test
```

If you prefer a single run (not watch mode):

```powershell
CI=true npm test -- --watchAll=false
```

## Data

Edit `data/questions.json` to add or modify quiz questions. When `npm run server` is running, `json-server` will auto-reload the endpoint.

## Notes

- The central application state and reducer live in `src/components/App.js`.
- Presentational components are in `src/components/` and are intentionally small and stateless where possible.
- If fetching questions fails, ensure the JSON server is running on port `8000`.
