const readlineSync = require('readline-sync');

// Display a welcome message
console.log("Welcome to Webspider Canteen! Place your order and have a nice lunch break.");

// Set default customer name if not provided
const getCustomerName = () => {
    let customerName = readlineSync.question("Student name: ");
    return customerName.trim() || 'Customer 1';
};

// Function to display a menu and get a choice
const selectItem = (menu, menuName) => {
    console.log(`\n--- ${menuName} Menu ---`);
    let items = Object.keys(menu);
    items.forEach((item, index) => {
        console.log(`${index + 1}. ${item} - €${menu[item]}`);
    });

    let choice = parseInt(readlineSync.question(`\nSelect a ${menuName.toLowerCase()} (enter the number): `));
    while (isNaN(choice) || choice < 1 || choice > items.length) {
        console.log("Invalid choice. Please enter a valid number.");
        choice = parseInt(readlineSync.question(`\nSelect a ${menuName.toLowerCase()} (enter the number): `));
    }

    return {
        name: items[choice - 1],
        price: menu[items[choice - 1]]
    };
};

// Function to get the quantity
const getQuantity = (itemName) => {
    let quantity = parseInt(readlineSync.question(`How many ${itemName}(s) would you like? `));
    while (isNaN(quantity) || quantity < 1) {
        console.log("Invalid quantity. Please enter a valid number.");
        quantity = parseInt(readlineSync.question(`How many ${itemName}(s) would you like? `));
    }
    return quantity;
};

// Cash box with initial notes and coins
let cashBox = [
    { 50: 10 },
    { 20: 10 },
    { 10: 10 },
    { 5: 25 },
    { 2: 25 },
    { 1: 25 },
    { 0.5: 25 },
    { 0.2: 25 },
    { 0.1: 25 },
    { 0.05: 25 },
    { 0.02: 25 },
    { 0.01: 25 }
];

// Function to calculate change and update the cash box
const calculateChange = (total, paid) => {
    let change = paid - total;
    let changeGiven = [];

    if (change < 0) {
        console.log(`Customer should pay €${Math.abs(change).toFixed(2)} more.`);
        return null;
    }

    // Sort cash box items from highest to lowest
    cashBox.sort((a, b) => parseFloat(Object.keys(b)[0]) - parseFloat(Object.keys(a)[0]));

    for (let note of cashBox) {
        let key = parseFloat(Object.keys(note)[0]);
        let count = Math.min(Math.floor(change / key), note[key]);

        if (count > 0) {
            changeGiven.push({ [`${key >= 1 ? key + ' Euro' : key * 100 + ' Cent'}`]: count });
            change -= count * key;
            note[key] -= count;
            change = parseFloat(change.toFixed(2)); // Avoid floating-point errors
        }
    }

    if (change > 0) {
        console.log("No change available. Please pay the exact amount.");
        return null;
    }

    return changeGiven;
};

// Get the customer's name (default if not provided)
let customerName = getCustomerName();

// Menu items with prices
const drinks = {
    'Water': 1,
    'Soda': 2,
    'Beer': 3,
    'Wine': 5
};

const meals = {
    'Burger': 8,
    'Pizza': 10,
    'Salad': 6,
    'Steak': 15
};

// Select drink and meal
let selectedDrink = selectItem(drinks, 'Drink');
let drinkQuantity = getQuantity(selectedDrink.name);
let selectedMeal = selectItem(meals, 'Meal');
let mealQuantity = getQuantity(selectedMeal.name);

// Calculate the total price
let total = (selectedDrink.price * drinkQuantity) + (selectedMeal.price * mealQuantity);

// Display the order summary and total price
console.log(`\n--- Order Summary ---`);
console.log(`Customer: ${customerName}`);
console.log(`Drink: ${selectedDrink.name} x${drinkQuantity} - €${selectedDrink.price * drinkQuantity}`);
console.log(`Meal: ${selectedMeal.name} x${mealQuantity} - €${selectedMeal.price * mealQuantity}`);
console.log(`Total: €${total}`);

// Ask the customer for payment
let paidAmount = parseFloat(readlineSync.question("\nEnter the amount paid: €"));

// Calculate change and update cash box
let change = calculateChange(total, paidAmount);

if (change) {
    console.log(`\nChange given: `, change);
    console.log(`\nThank you for patronizing us, ${customerName}! Have a great lunch break.`);
}
