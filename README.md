# Food Hygiene Ratings Dashboard

A modern interface for exploring UK food hygiene ratings from the Food Standards Agency API.

## Features

### Core Functionality
- **Paginated Establishment List**
  - 5 items per page
  - Basic business info (name, rating)
  - Deep linking to details

- **Advanced Filtering**
  - Local authority selector
  - Persistent filter state

- **Favourites Management** ★
  - Add/remove with checkboxes
  - Persistent comparison table
  - One-click removal
  - Local storage sync
  - Remove-all

### Technical Implementation
- **Caching Layer**
  - API response memoization
  - LRU cache strategy

- **Performance Optimizations**
  - Request cancellation with AbortController
  - Debounced API calls
  - Lazy loading

## Installation

```bash
git clone git@github.com:skywalkerluc/convex-react-test.git
cd convex-react-test
npm install
npm run start
````

## Project Structure
```
src/
├── api/             # API client
├── components/      # React components
│   ├── common/      # Shared UI
│   └── features/    # Feature modules
├── context/         # Providers (cache + favourites)
├── hooks/           # Custom hooks
├── types/           # Type definitions
├── utils/           # Helpers
├── App.tsx          # Root component
```

## Testing
### Test Suite
```bash
npm run test           # Run all tests
npm run test:coverage  # Generate coverage report
npm run test:update    # Update snapshots and test
```

### Coverage Areas
1. Component rendering
2. Object states (hooks)
3. API response handling
4. Error states
