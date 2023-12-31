<div align="center">
  <img src="./src/favicon.ico" alt="favicon Image">
</div>

## Currency Converter
This project is a web application for currency conversion, displaying the current exchange rates of the US Dollar (USD) and Euro (EUR) against the Ukrainian Hryvnia (UAH).

### Key Features
- **Current Exchange Rates:** Displays the latest USD and EUR rates relative to UAH.
- **Dynamic Currency Exchange:** Utilizes a public API to fetch the latest exchange rates.
- **Interactive Conversion:** Users can enter an amount for conversion in dedicated input fields and select currencies through a dropdown menu.
- **Bidirectional Conversion:** The value is recalculated upon changes in either the currency or the amount in any of the input fields and clicking the arrow to perform the conversion operation.

### Technologies
This project is built using:

- **Angular:** A popular framework for building web interfaces.
- **TypeScript:** A programming language for developing complex applications.

### Installation Instructions
- Before starting, make sure you have Node.js and npm installed. If not, you can download and install them from the official site:

Download Node.js: https://nodejs.org/en
- After installing Node.js, you can install Angular CLI if it's not already installed:
```bash
npm install -g @angular/cli 
```

Learn more about installing Angular CLI here: https://angular.io/cli.

- Once Angular CLI is installed, clone the repository and install dependencies:

Clone the repository:
```bash
git clone https://github.com/AlenaMushko/ITOP1000
```
- Install dependencies:
```bash
cd ITOP1000
```
```bash
npm install
```

- Launch the project:
```bash
ng serve
```
-  Navigate to http://localhost:4200/ in your browser.

### Header Component
The Header component is responsible for displaying the current exchange rates. It automatically updates using data from a public API.

### Currency Converter Component
The CurrencyConverter component contains the logic for currency conversion. It allows users to enter amounts for conversion and select currencies through a dropdown interface.

### Using the Component
- Enter an amount in one of the input fields.
- Select a currency from the corresponding dropdown menu.
- The amount in the other input field will automatically be recalculated based on the current exchange rate.
- Upon changing the currency or the amount entered an input, the conversion will be recalculated.

### Support
For questions or suggestions, you can contact the project author at [email](myshko.alona@gmail.com).
