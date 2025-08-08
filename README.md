# Counter & List App - RAIQA Health Assignment

A simple React/Next.js application that allows users to increment/decrement a counter, add values to a list, and sort the list in ascending or descending order.

## Features

### Counter Functionality

- Display a number initialized to 0
- "+" button to increment the number
- "-" button to decrement the number (but not below 0)
- "Add to List" button that adds the current number to a list only if it's greater than 0
- Counter resets to 0 after adding to the list

### List Display

- Shows all added numbers in a list below the counter
- Each number displays with its original position (#1, #2, etc.)
- Individual remove buttons (×) for each list item
- Total count display

### Sorting Feature

- Sort button with toggle functionality
- Switches between ascending (↑) and descending (↓) order
- List updates automatically when sort order changes

### Bonus Features

- Highlights the highest and lowest numbers in the list
- Reset button to clear the entire list
- Persists the list using localStorage
- Responsive design with modern UI
- Clean, intuitive interface

## Technical Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React useState hooks
- **Persistence**: localStorage for data persistence
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js (version 18.18.0 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd raiqa_health_assignment
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
└── components/
    ├── Counter.tsx         # Counter component with increment/decrement
    └── ListView.tsx        # List display and sorting component
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new?onboarding=true)
3. Create an account with the same email as your GitHub account
4. Import your project from GitHub
5. Deploy the project
6. Your app will be available at `your-project-name.vercel.app`

## Usage

1. **Counter Section**: Use the + and - buttons to adjust the counter value
2. **Add to List**: Click "Add to List" to add the current counter value to the list
3. **Sort**: Click the "Sort" button to toggle between ascending and descending order
4. **Remove Items**: Click the × button next to any number to remove it
5. **Reset**: Click "Reset" to clear the entire list
6. **Persistence**: Your list will be saved automatically and restored when you reload the page

## Features Implemented

✅ Counter functionality with increment/decrement  
✅ Add to list with counter reset  
✅ List display with position indicators  
✅ Sorting (ascending/descending toggle)  
✅ Individual item removal  
✅ Reset functionality  
✅ Highest/lowest number highlighting  
✅ localStorage persistence  
✅ Responsive design  
✅ Clean, modern UI
