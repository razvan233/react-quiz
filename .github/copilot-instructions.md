# GitHub Copilot Instructions — React Quiz

This file tells an AI coding assistant how this repo is structured and how to be immediately productive.

High-level summary

- Create React App single-page client app located in `src/`.
- The app fetches question data from a local JSON API served by `json-server` (script: `npm run server`) at `http://localhost:8000/questions`.
- Application state is managed centrally in `src/components/App.js` using `useReducer`. UI is composed from small presentational components in `src/components/`.

Why this structure

- The project is a small interactive quiz — business logic (questions, score, timer) is kept in `App.js` so child components remain presentational and receive `dispatch` and pieces of state as props.

Key files and responsibilities

- `src/index.js` — app entry.
- `src/components/App.js` — central state (useReducer), data fetching, routes between states (loading, ready, active, finished, error). Read this file first to understand app behavior.
- `src/components/Question.js` — handles per-question lifecycle and timer effect; dispatches `updateTimer` and `timeFinished` actions.
- `src/components/Option.js` — renders answer buttons, formats timer, dispatches `newAnswer` and `nextQuestion` actions.
- `src/components/StartScreen.js`, `FinishScreen.js`, `Progress.js`, `Header.js`, `Loader.js`, `Error.js` — presentational UI.
- `data/questions.json` — authoritative question data used by `json-server`. Edit this file to add/change questions or points.
- `package.json` — scripts of interest:
  - `npm start` — run CRA development server
  - `npm run server` — run `json-server --watch data/questions.json --port 8000` (API endpoint `/questions`)
  - `npm test`, `npm run build`, `npm run eject`

Data flow and state model (practical notes)

- App's reducer initial state and important keys:

  - `questions` — array of question objects (see `data/questions.json`).
  - `status` — one of `loading`, `ready`, `active`, `error`, `finished`.
  - `currentQuestionIndex` — zero-based index used to pick `questions[currentQuestionIndex]`.
  - `answer` — `null` or the selected option index for the current question.
  - `points` — accumulated points.
  - `timer` — seconds remaining (initial `15 * 60`).
  - `highScore` — read from `localStorage` on load and updated at quiz end.

- Reducer action names and payloads (source of truth: `App.js`):
  - `dataReceived` — payload: array of questions (sets `questions`, `status: 'ready'`).
  - `dataFailed` — payload: error (sets `status: 'error'`).
  - `start` — no payload (sets `status: 'active'`).
  - `newAnswer` — payload: selected option index (updates `answer` and `points` if correct).
  - `nextQuestion` — no payload (increments `currentQuestionIndex`, sets `status: 'finished'` on last question, persists `highScore` to `localStorage` if beaten).
  - `updateTimer` — no payload (decrements `timer` by 1).
  - `timeFinished` — no payload (sets `status: 'finished'`).
  - `reset` — no payload (resets state to ready, clears points/timer/answer).

Patterns and conventions

- Presentational components accept props and avoid their own state; `App.js` holds the single source of truth.
- `dispatch` is passed down to components that cause state changes (`Question`, `Option`). Use existing action names above when dispatching.
- Timer is stored as seconds in global state and formatted inside `Option.js` (`formatTime`). Tests and UI expect `timer` in seconds.
- Question object shape (examples in `data/questions.json`):
  - `question`: string
  - `options`: array of strings
  - `correctOption`: integer index into `options`
  - `points`: integer

Developer workflows (common tasks)

- Run locally (two terminals):
  1. `npm install` (first time)
  2. In one terminal: `npm run server` — starts `json-server` at `http://localhost:8000` and makes `/questions` available.
  3. In another terminal: `npm start` — starts the CRA dev server and opens the app at `http://localhost:3000`.
- If fetching fails, check that `npm run server` is running and reachable at port 8000. `json-server` enables CORS by default.
- To edit questions: update `data/questions.json` (the server automatically reloads because `json-server` watches the file).
- To change initial timer or scoring, update values in `src/components/App.js` (`initialState.timer`, reducer logic for scoring).

Useful examples for the agent

- Dispatch a new answer:
  - `dispatch({ type: 'newAnswer', payload: 2 })` — selects option index 2.
- Move to next question:
  - `dispatch({ type: 'nextQuestion' })`.
- Handle timer reaching zero (in `Question.js`): the component currently uses `window.alert` and dispatches `timeFinished` — keep behavior consistent.

Testing and build

- Tests use CRA defaults: run `npm test`. There are no repository-specific tests included.
- Build for production: `npm run build`.

When modifying code

- Prefer changing `App.js` reducer for state semantics instead of scattering state across child components.
- Keep presentational components pure (no side-effects) unless the UI requires it (e.g., `Question.js` uses `useEffect` for timer). Mirror existing prop names when adding props.

What _not_ to change without asking

- The reducer action names and `data/questions.json` object schema — many components rely on these exact names/fields.
- The API endpoint URL (`http://localhost:8000/questions`) — if you must change it, update the fetch in `App.js` and mention the change in this file.

If anything in this file is unclear or you'd like more detail (example edits, tests, or a suggested refactor plan), ask and I'll iterate.
