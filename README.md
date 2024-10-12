# BudgetBuddy

BudgetBuddy is a financial application that helps users track their income and expenses efficiently. Users can input
their monthly income and expenses, as well as daily expenditures in categories like food, entertainment, transport,
shopping, and others. The app provides visual charts to display overall monthly statistics for different periods (1
month, 3 months, 6 months, and 1 year). Users can customize settings such as currency, theme, and chart type. The
application supports both English and Ukrainian languages.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Technologies Used](#technologies-used)

## Features

- **Income and Expense Tracking**: Input and monitor your monthly and daily expenses.
- **Visual Charts**: View your financial statistics over different periods (1 month, 3 months, 6 months, 1 year).
- **Customizable Settings**:
    - **Currency Selection**: Choose between USD, EUR, or UAH.
    - **Theme Switcher**: Switch between dark (black-orange) and light (light-blue) themes.
    - **Chart Types**: Select different chart types for data visualization.
- **Localization**: Supports English and Ukrainian languages.
- **User-Friendly Interface**: Smooth navigation with React Router.
- **State Management**: Efficient state management using Redux Toolkit.

## Installation

To get started with BudgetBody locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Qinastha/budgetbody.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd budgetbody
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

   Or if you prefer using yarn:

   ```bash
   yarn install
   ```

## Usage

To start the application in development mode:

```bash
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000) by default.

## Available Scripts

In the project directory, you can run:

- **`npm start`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm test`**: Launches the test runner.
- **`npm run eject`**: Ejects the app from Create React App configuration.
- **`npm run prettier`**: Formats the code using Prettier.

## Technologies Used

- **React**: Front-end library for building user interfaces.
- **TypeScript**: Typed superset of JavaScript for type safety.
- **Redux Toolkit**: Simplifies Redux state management.
- **React Router DOM**: Routing library for React applications.
- **ECharts**: Powerful charting and visualization library.
- **i18next**: Internationalization framework.
- **Sass**: CSS preprocessor for easier styling.
- **Axios**: Promise-based HTTP client for API requests.
