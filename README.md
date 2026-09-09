# Family Finance

A minimal, premium-feeling family finance dashboard: monthly income/expenses,
category budgets with limits, and savings goals — all client-side, persisted
to `localStorage`. Built with React (functional components + hooks) and Vite.

Supports Uzbek (default) and English, with light/dark themes.

## Running

```bash
npm install
npm run dev
```

Then open the printed local URL. Demo data (transactions, budgets, savings
goals) seeds automatically on first launch.

## Structure

- `src/context` — Language, Theme, Toast, and Finance (data) providers
- `src/pages` — Dashboard, Transactions, Budget, Savings, Settings
- `src/components` — reusable UI pieces (forms, lists, cards, chart, nav)
- `src/i18n/translations.js` — all user-facing strings, uz + en
- `src/data` — category definitions and demo data generation
- `src/utils` — currency/date formatting helpers
