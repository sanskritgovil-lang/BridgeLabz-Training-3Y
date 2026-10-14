/**
 * ============================================================================
 * JAVASCRIPT ASSIGNMENT - ALL QUESTIONS (Q1 TO Q10)
 * ============================================================================
 */

// ============================================================================
// QUESTION 1: Personalized Login Greeting
// Problem: Write a program that greets a user with a time-based message:
// - Before 12 PM: "Good Morning"
// - Between 12 PM and 5 PM (17:00): "Good Afternoon"
// - 5 PM onwards: "Good Evening"
// ============================================================================
function personalizedLoginGreeting(userName = "User") {
  console.log("--- Q1: Personalized Login Greeting ---");
  const currentHour = new Date().getHours();
  let greeting = "";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  console.log(`${greeting}, ${userName}!\n`);
}

// ============================================================================
// QUESTION 2: Multi-Type Data Summary
// Problem: Given an object with diverse data types (strings, numbers, booleans,
// arrays, nested objects, null/undefined), display a tabular breakdown showing
// the property name, its value, and its specific JavaScript data type.
// ============================================================================
function multiTypeDataSummary() {
  console.log("--- Q2: Multi-Type Data Summary ---");
  const userData = {
    name: "Sanskriti",
    age: 21,
    isStudent: true,
    courses: ["DSA", "Web Dev"],
    address: { city: "Mathura", country: "India" },
    middleName: null,
    graduationYear: undefined,
  };

  const summary = Object.entries(userData).map(([key, value]) => {
    let exactType = typeof value;
    if (value === null) {
      exactType = "null";
    } else if (Array.isArray(value)) {
      exactType = "array";
    }

    return {
      Property: key,
      Value: JSON.stringify(value),
      Type: exactType,
    };
  });

  console.table(summary);
  console.log("\n");
}

// ============================================================================
// QUESTION 3: Monthly Expense Tracker
// Problem: Develop a script that accepts an array of monthly expenses,
// calculates total expenses, average expense per category, and the final
// payable amount after applying a 10% tax surcharge.
// ============================================================================
function monthlyExpenseTracker(expenses = [1500, 800, 500, 1200, 300]) {
  console.log("--- Q3: Monthly Expense Tracker ---");
  const total = expenses.reduce((sum, curr) => sum + curr, 0);
  const average = total / expenses.length;
  const tax = total * 0.1;
  const finalAmount = total + tax;

  console.log(`Individual Expenses: [${expenses.join(", ")}]`);
  console.log(`Total Expense      : $${total.toFixed(2)}`);
  console.log(`Average Expense    : $${average.toFixed(2)}`);
  console.log(`Tax (10%)          : $${tax.toFixed(2)}`);
  console.log(`Final Payable Total: $${finalAmount.toFixed(2)}\n`);
}

// ============================================================================
// QUESTION 4: Academic Performance Evaluator
// Problem: Check student promotion status based on an array of subject marks:
// - If any subject is below 35: Detained (Fails condition)
// - If average/percentage >= 85%: Promoted with Distinction
// - If 50% <= average < 85%: Promoted
// - Otherwise: Detained
// ============================================================================
function academicPerformanceEvaluator(marks) {
  console.log(`--- Q4: Academic Performance Evaluator (Marks: [${marks.join(", ")}]) ---`);
  const hasFailedSubject = marks.some((score) => score < 35);

  if (hasFailedSubject) {
    console.log("Status: Detained (Scored below passing threshold of 35 in at least one subject).\n");
    return;
  }

  const total = marks.reduce((sum, score) => sum + score, 0);
  const percentage = total / marks.length;
  let status = "";

  if (percentage >= 85) {
    status = "Promoted with Distinction";
  } else if (percentage >= 50) {
    status = "Promoted";
  } else {
    status = "Detained";
  }

  console.log(`Average Percentage: ${percentage.toFixed(2)}%`);
  console.log(`Status            : ${status}\n`);
}

// ============================================================================
// QUESTION 5: Weather Activity Planner
// Problem: Recommend an activity based on temperature, precipitation, and wind:
// - If raining: "Stay indoors with hot coffee."
// - If temp > 35°C: "Go swimming."
// - If temp < 15°C AND wind speed > 20 km/h: "Too cold and windy — stay home."
// - Otherwise: "Perfect day for a walk."
// ============================================================================
function weatherActivityPlanner(temperature, isRaining, windSpeed) {
  console.log(`--- Q5: Weather Planner (Temp: ${temperature}°C, Rain: ${isRaining}, Wind: ${windSpeed} km/h) ---`);
  let advice = "";

  if (isRaining) {
    advice = "Stay indoors with hot coffee.";
  } else if (temperature > 35) {
    advice = "Go swimming.";
  } else if (temperature < 15 && windSpeed > 20) {
    advice = "Too cold and windy — stay home.";
  } else {
    advice = "Perfect day for a walk.";
  }

  console.log(`Recommendation: ${advice}\n`);
}

// ============================================================================
// QUESTION 6: Progressive Discount System
// Problem: Calculate shopping discounts based on cart purchase tiers:
// - Total >= $10,000 : 25% discount
// - Total >= $5,000  : 15% discount
// - Total >= $2,000  : 5% discount
// - Below $2,000     : 0% discount
// Display original total, discount rate, discount amount, and final total.
// ============================================================================
function progressiveDiscountSystem(totalPurchase) {
  console.log(`--- Q6: Progressive Discount System (Cart Total: $${totalPurchase}) ---`);
  let discountRate = 0;

  if (totalPurchase >= 10000) {
    discountRate = 0.25;
  } else if (totalPurchase >= 5000) {
    discountRate = 0.15;
  } else if (totalPurchase >= 2000) {
    discountRate = 0.05;
  }

  const discountAmount = totalPurchase * discountRate;
  const finalPrice = totalPurchase - discountAmount;

  console.log(`Original Purchase: $${totalPurchase.toFixed(2)}`);
  console.log(`Discount Applied : ${(discountRate * 100).toFixed(0)}%`);
  console.log(`Discount Savings : $${discountAmount.toFixed(2)}`);
  console.log(`Final Price      : $${finalPrice.toFixed(2)}\n`);
}

// ============================================================================
// QUESTION 7: Smart Guessing Game
// Problem: Compare user guess against a randomly generated secret number (1-50):
// - Difference === 0: "Correct guess!"
// - Difference <= 3 : "Very close!"
// - Guess > Secret  : "Too high."
// - Guess < Secret  : "Too low."
// ============================================================================
function smartGuessingGame(userGuess) {
  console.log(`--- Q7: Smart Guessing Game (User Guess: ${userGuess}) ---`);
  const secretNumber = Math.floor(Math.random() * 50) + 1;
  const difference = Math.abs(secretNumber - userGuess);

  console.log(`Secret Number: ${secretNumber}`);
  if (difference === 0) {
    console.log("Result: Correct guess!\n");
  } else if (difference <= 3) {
    console.log("Result: Very close!\n");
  } else if (userGuess > secretNumber) {
    console.log("Result: Too high.\n");
  } else {
    console.log("Result: Too low.\n");
  }
}

// ============================================================================
// QUESTION 8: Employee Salary Projection
// Problem: Given an initial salary and an annual percentage increment rate,
// compute and display a projected year-by-year salary breakdown for 5 years.
// ============================================================================
function employeeSalaryProjection(initialSalary, annualIncrementPercent) {
  console.log(`--- Q8: Employee Salary Projection (Base: $${initialSalary}, Increment: ${annualIncrementPercent}%) ---`);
  let currentSalary = initialSalary;
  const projection = [];

  for (let year = 1; year <= 5; year++) {
    projection.push({
      Year: `Year ${year}`,
      Salary: `$${currentSalary.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    });
    currentSalary *= 1 + annualIncrementPercent / 100;
  }

  console.table(projection);
  console.log("\n");
}

// ============================================================================
// QUESTION 9: Random Math Quiz Generator
// Problem: Automatically generate random arithmetic operations (+, -, *, /)
// between two random integers (1 to 20), calculate the correct answer,
// and present the quiz challenge.
// ============================================================================
function randomMathQuizGenerator() {
  console.log("--- Q9: Random Math Quiz Generator ---");
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operators = ["+", "-", "*", "/"];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let answer;
  switch (operator) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
    case "/":
      answer = parseFloat((num1 / num2).toFixed(2));
      break;
  }

  console.log(`Challenge     : What is ${num1} ${operator} ${num2}?`);
  console.log(`Correct Answer: ${answer}\n`);
}

// ============================================================================
// QUESTION 10: Citizen Eligibility Validator
// Problem: Check eligibility for civic services based on age and citizenship:
// - If citizen:
//     - Age >= 21: "Eligible for all services."
//     - Age >= 18: "Eligible to vote only."
//     - Age < 18 : "Not eligible yet."
// - If not citizen:
//     - Age >= 18: "Only age criteria met."
//     - Age < 18 : "Not eligible yet."
// ============================================================================
function citizenEligibilityValidator(age, isCitizen) {
  console.log(`--- Q10: Citizen Eligibility Validator (Age: ${age}, Citizen: ${isCitizen}) ---`);
  let result = "";

  if (isCitizen) {
    if (age >= 21) {
      result = "Eligible for all services.";
    } else if (age >= 18) {
      result = "Eligible to vote only.";
    } else {
      result = "Not eligible yet.";
    }
  } else {
    if (age >= 18) {
      result = "Only age criteria met.";
    } else {
      result = "Not eligible yet.";
    }
  }

  console.log(`Validation: ${result}\n`);
}

// ============================================================================
// DRIVER EXECUTION (Test runs for all 10 functions)
// ============================================================================
(function runAllAssignmentQuestions() {
  console.log("================ STARTING ASSIGNMENT EXECUTION ================\n");

  // Q1
  personalizedLoginGreeting("Sanskriti");

  // Q2
  multiTypeDataSummary();

  // Q3
  monthlyExpenseTracker([1500, 800, 500, 1200, 300]);

  // Q4 Test cases
  academicPerformanceEvaluator([90, 85, 92, 88, 95]);
  academicPerformanceEvaluator([70, 65, 75, 55, 60]);
  academicPerformanceEvaluator([40, 50, 45, 30, 55]); // Includes subject < 35

  // Q5 Test cases
  weatherActivityPlanner(25, true, 10);
  weatherActivityPlanner(38, false, 5);
  weatherActivityPlanner(10, false, 25);
  weatherActivityPlanner(22, false, 15);

  // Q6 Test cases
  progressiveDiscountSystem(12000);
  progressiveDiscountSystem(7500);
  progressiveDiscountSystem(2100);
  progressiveDiscountSystem(1500);

  // Q7 Test case
  smartGuessingGame(25);

  // Q8 Test case
  employeeSalaryProjection(50000, 5);

  // Q9 Test case
  randomMathQuizGenerator();

  // Q10 Test cases
  citizenEligibilityValidator(22, true);
  citizenEligibilityValidator(19, true);
  citizenEligibilityValidator(25, false);
  citizenEligibilityValidator(16, true);

  console.log("================ ASSIGNMENT EXECUTION COMPLETE ================");
})();
