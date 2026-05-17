# Full Stack Open - University of Helsinki

A consolidated monorepo of my Full Stack Open course work, covering parts 0 through 6. Each part is self-contained and focuses on a specific area of modern web development, from HTTP fundamentals to React, Node.js, testing, and Redux.

## Repository Structure

| Part | Focus | Highlights |
| --- | --- | --- |
| part0 | Fundamentals of web apps | HTTP basics and sequence diagrams (0.4, 0.5, 0.6) |
| part1 | React fundamentals | Component basics, props, state, and Vite-based apps (`courseinfo`, `unicafe`, `anecdotes`) |
| part2 | React + data fetching | Forms, CRUD, REST APIs with Axios (`phonebook`, `countries`, `courseinfo`) |
| part3 | Node.js + Express backend | REST API, middleware, MongoDB with Mongoose, env config |
| part4 | Backend testing + auth | Blog API, JWT auth, testing with Node test + Supertest |
| part5 | Full stack testing | Bloglist frontend + backend, component tests, and Playwright E2E tests |
| part6 | State management | Redux basics with React (`anecdotes`, `unicafe`) |

## Tech Stack

- Frontend: React, Vite, ESLint
- Backend: Node.js, Express
- Data: MongoDB, Mongoose
- State Management: Redux, React-Redux
- Testing: Vitest, React Testing Library, Supertest, Playwright
- Utilities: Axios, JWT, dotenv

## Getting Started

Each part is an independent project. Navigate into the part you want to explore and run the usual install and dev commands.

```bash
# Example: Part 2 phonebook app
cd part2/phonebook
npm install
npm run dev
```

Notes:
- Some backend parts require an `.env` file (for example, MongoDB connection strings).
- Part 5 contains separate `backend` and `frontend` folders; install and run each independently.
