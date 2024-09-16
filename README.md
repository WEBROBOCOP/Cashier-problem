# :hamburger: Webspider Canteen: Your Virtual Lunch Break Companion :cup_with_straw:
## :brain: Code Explanation for JavaScript Learners
If you're learning JavaScript, this project offers a great opportunity to see various concepts in action. Let's break down the code and its process:
### 1. Setting Up
The code starts by importing the `readline-sync` library, which allows us to get user input from the command line easily.
```javascript
const readlineSync = require('readline-sync');
```
### 2. Getting Customer Information
We define a function `getCustomerName()` that asks for the student's name. If no name is provided, it defaults to 'Customer 1'.
```javascript
const getCustomerName = () => {
    let customerName = readlineSync.question("Student name: ");
    return customerName.trim() || 'Customer 1';
};
```
### 3. Menu Selection
The `selectItem()` function is a reusable piece of code that displays a menu (either drinks or meals) and gets the user's choice:
1. It takes a menu object and a menu name as parameters.
2. It displays the menu items with their prices.
3. It asks the user to select an item by number.
4. It validates the input and keeps asking until a valid choice is made.
5. It returns an object with the selected item's name and price.
### 4. Quantity Selection
The `getQuantity()` function asks how many of a selected item the user wants:
1. It takes the item name as a parameter.
2. It asks for a quantity and validates that it's a positive number.
3. It keeps asking until a valid quantity is provided.
### 5. Cash Box Simulation
The code uses an array of objects to simulate a cash box:
```javascript
let cashBox = [
    { 50: 10 },
    { 20: 10 },
    // ... other denominations
];
```
Each object represents a denomination (in euros) and its quantity in the cash box.
### 6. Change Calculation
The `calculateChange()` function is the most complex part:
1. It takes the total bill and the amount paid as parameters.
2. It calculates the change needed.
3. It goes through the cash box from highest to lowest denomination.
4. For each denomination, it calculates how many of that note/coin can be used for the change.
5. It updates the cash box by removing the notes/coins used for change.
6. If exact change can't be given, it informs the user.
### 7. Order Process
The main order process follows these steps:
1. Get the customer's name.
2. Display drink menu and get selection.
3. Get quantity for the selected drink.
4. Display meal menu and get selection.
5. Get quantity for the selected meal.
6. Calculate the total price.
7. Display order summary.
8. Ask for payment.
9. Calculate and display change.
### 8. Error Handling
Throughout the code, there's careful error handling:
- Input validation ensures that users enter valid numbers for menu selection and quantities.
- The change calculation checks if the payment is sufficient and if exact change can be given.
### 9. Floating-Point Precision
To avoid issues with floating-point arithmetic (a common problem in programming), the code uses `toFixed(2)` when dealing with money calculations:
```javascript
change = parseFloat(change.toFixed(2));
```
This ensures that all monetary values are rounded to two decimal places, preventing tiny fractions from causing problems.
By studying this code, you can learn about:
- Function definitions and arrow functions
- Object manipulation
- Array methods
- User input handling
- Error checking and input validation
- Basic arithmetic operations
- Control structures (if statements, loops)
- Working with floating-point numbers
This project demonstrates how these concepts come together to create a functional, real-world application. As you learn and practice, try modifying parts of the code to add new features or change existing behaviors!
