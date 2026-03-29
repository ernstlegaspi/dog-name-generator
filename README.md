# Dog Name Generator

React + TypeScript + Tailwind app for browsing pet names by gender, category, subcategory, and alphabet letter.

## Setup

### Prerequisites

- Node.js 20+
- npm 10+

### Install

```bash
npm install
```

### Run the app

```bash
npm run dev
```

### Run the production build

```bash
npm run build
```

### Run tests

```bash
npm run test
```

## Architecture

### App structure

- `src/App.tsx`
  Holds the shared filter state for gender, active top-level category group, and selected subcategories.
- `src/components/Header.tsx`
  Renders the gender selector.
- `src/components/nav/*`
  Handles the category navigation bar and subcategory checkboxes.
- `src/components/body/*`
  Handles the alphabet filter, hero state, selected-letter view, carousel, and description panel.
- `src/hooks/useNamesData.ts`
  Lazy-loads the names dataset only when the selected-letter experience is opened.
- `src/lib/names.ts`
  Shared names data loader and filtering helpers.
- `src/constants/*`
  Static JSON for categories, letters, and names metadata.

### State management

This project uses React Hooks for state management:

- `App.tsx` owns cross-component filter state.
- `Body.tsx` owns the selected alphabet letter state.
- `SelectedLetterNamesSection.tsx` owns the active carousel index.

### Performance strategy

The names dataset is no longer imported into the initial app bundle.

- `names.json` is loaded lazily through a dynamic import in `useNamesData`
- the loaded dataset is cached in memory after the first request
- the initial landing state can render without paying the cost of the full names dataset

## Testing

Vitest + Testing Library are configured for component testing.

Current coverage:

- `src/components/Header.test.tsx`
  Verifies the active gender state and the gender change callback.

## Assumptions

- If no subcategory is checked, the active top-level category group is used as the fallback category filter.
- If a pet name supports both `M` and `F`, both gender icons are shown in the description view.
- Related names are derived from other names that share at least one category with the active name.
- The description label shows the active top-level category plus the selected subcategories in that group that currently produce results.
- The names dataset remains a single JSON source, but it is loaded on demand instead of being bundled up front.
