# Lateral Stays

Lateral Stays is a small Booking.com-like travel booking app built as part of a Senior Frontend Engineer technical assessment.

The goal was to focus on product flow, clean architecture, and realistic frontend concerns, rather than building a large or overly complex system.

The app lets users browse stays, filter and sort results, open stay details, read and add reviews, complete a mocked checkout, and view a booking confirmation.

## Live Demo

- Frontend: https://lateral-stays-web.vercel.app
- API: https://lateral-stays.onrender.com

## Tech Stack

- **Monorepo:** npm workspaces
- **Frontend:** React, TypeScript, Vite, React Router, TailwindCSS
- **Server state:** TanStack Query
- **Forms and validation:** React Hook Form, Zod
- **Backend:** Node.js, Express, TypeScript, Zod
- **Testing:** Vitest, React Testing Library, Supertest
- **CI:** GitHub Actions

## Features Implemented

- Stay discovery page with search, price filters, guest filter, and sorting
- Responsive stay cards with loading, empty, and error states
- Stay details page with gallery, description, amenities, pricing, availability, and reviews
- Review creation flow with client and server validation
- Checkout page with mocked payment messaging
- Booking creation with server-side total price calculation
- Booking confirmation screen
- Backend endpoints for stays, reviews, bookings, and health checks
- Automated lint, test, and build validation

## Architecture Overview

The project uses a small monorepo so the frontend and backend can evolve together while keeping clear ownership boundaries.

The frontend follows a feature-based structure. Product areas such as stays, stay details, reviews, and booking own their pages, components, hooks, schemas, and types. Shared utilities and API primitives live under `shared`.

TanStack Query is used instead of Redux because the application mostly manages server state: fetching stays, loading details, reading reviews, and submitting reviews/bookings. Local state is kept limited to UI concerns such as filters and form state.

The backend is intentionally small. Express handles routing, controllers stay thin, services contain business logic, and Zod validates incoming requests. Data is stored in memory because the assessment focuses on frontend engineering, product thinking, and clean integration rather than persistence.

## Folder Structure

```txt
lateral-stays/
  apps/
    api/
      src/
        config/
        features/
          bookings/
          reviews/
          stays/
        middlewares/
        routes/
        shared/
        tests/
    web/
      src/
        app/
        features/
          booking/
          reviews/
          stay-details/
          stays/
        shared/
        tests/
  .github/
    workflows/
  package.json
  package-lock.json
  README.md
```

## Local Setup

Install dependencies from the repository root:

```bash
npm ci
```

Run both workspaces in development mode:

```bash
npm run dev
```

Run only the backend:

```bash
npm run dev --workspace @lateral-stays/api
```

Run only the frontend:

```bash
npm run dev --workspace @lateral-stays/web
```

By default, the API runs on `http://localhost:4000` and the web app runs on Vite's default `http://localhost:5173`.

## Environment Variables

Backend example: `apps/api/.env.example`

```bash
PORT=4000
CORS_ORIGIN=http://localhost:5173
```

Frontend example: `apps/web/.env.example`

```bash
VITE_API_URL=http://localhost:4000
```

For local development, copy the example files if custom values are needed:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

## Available Scripts

From the repository root:

```bash
npm run dev
npm run lint
npm run test
npm run build
npm run format
```

Workspace-specific examples:

```bash
npm run test --workspace @lateral-stays/api
npm run test --workspace @lateral-stays/web
```

At this stage, `lint` uses TypeScript checking through `tsc --noEmit`. A full ESLint setup would be a natural next hardening step.

## Testing Strategy

The backend uses Vitest and Supertest to test the API from the HTTP boundary. Coverage includes health checks, stay listing and filtering, stay details, review creation and validation, and booking creation and validation.

The frontend uses Vitest and React Testing Library. Tests focus on meaningful product behavior rather than snapshots: rendering API data, updating filters, showing stay details and reviews, submitting reviews, validating checkout fields, and creating a booking.

Run all tests:

```bash
npm run test
```

## CI Pipeline

GitHub Actions is configured in `.github/workflows/ci.yml`.

The pipeline runs on pushes to `main` and `feature/**`, and on pull requests targeting `main`.

It executes:

```bash
npm ci
npm run lint
npm run test
npm run build
```

This keeps the assessment flow straightforward: dependencies install from the lockfile, TypeScript is checked, tests run for both workspaces, and production builds must pass.

## API Endpoints

```txt
GET  /health
GET  /stays
GET  /stays/:id
GET  /stays/:stayId/reviews
POST /stays/:stayId/reviews
POST /bookings
```

`GET /stays` supports:

```txt
query
minPrice
maxPrice
guests
sort=price_asc | price_desc | rating_desc
```

`POST /bookings` validates stay existence, date order, guest capacity, and calculates `totalPrice` from nights multiplied by `pricePerNight`.

## Key Technical Decisions

- npm workspaces keep frontend and backend in one simple monorepo.
- TanStack Query handles server state instead of Redux.
- React Hook Form and Zod provide typed form validation with clear error messages.
- Express is kept small and explicit to avoid unnecessary framework complexity.
- In-memory data is used because persistence is not the focus of this challenge.
- Feature-based architecture keeps related UI, hooks, types, schemas, and API calls close together.
- Payment is mocked intentionally; the goal is to demonstrate checkout flow, validation, and booking creation without integrating a payment provider.
- CI runs lint, tests, and build to protect the main quality gates.

## Tradeoffs

- Data resets when the API restarts because there is no database.
- There is no authentication or user account model.
- Availability checks are simplified and do not prevent overlapping bookings.
- Styling is intentionally polished but lightweight; it avoids introducing a component library.
- Error handling is user-friendly but not yet backed by observability or structured logging.
- TypeScript checking is in place, while ESLint and Prettier could be added for stricter style consistency.

## LLM Usage Note

This project was built with assistance from an LLM acting as a coding partner. The implementation was guided step by step, with human review of scope, architecture, testing expectations, and commit boundaries. The LLM was mainly used to speed up setup, implementation, tests, and documentation, while keeping architectural decisions and tradeoffs explicit and reviewed.

## Release Process

Current release process:

1. Create a feature branch.
2. Make a focused change.
3. Run local validation:

   ```bash
   npm run lint
   npm run test
   npm run build
   ```

4. Open a pull request.
5. Wait for GitHub Actions to pass.
6. Review the diff and merge.

## Deployment

The application is deployed and available online:

- Frontend: https://lateral-stays-web.vercel.app
- API: https://lateral-stays.onrender.com

## What I Would Improve Next

- Add ESLint and Prettier for stricter code style enforcement.
- Add a database or lightweight persistence layer.
- Add availability validation for overlapping bookings.
- Improve error response mapping in the frontend.
- Add more accessibility checks and keyboard-flow testing.
- Add pagination or infinite loading for larger stay datasets.
- Add end-to-end tests for the critical booking journey.
