/* ==========================================================================
   ASSIGNMENT 3 - CONSOLIDATED SOLUTIONS (Q1 - Q10)
   ========================================================================== */

"use strict";

console.log("==================================================================");
console.log("             ASSIGNMENT 3: JAVASCRIPT SOLUTIONS                   ");
console.log("==================================================================\n");

// ==========================================================================
// Q1 - Dynamic Data Parser
// ==========================================================================
/*
 * Question:
 * You receive mixed API data:
 * const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];
 * 
 * Tasks:
 * 1. Convert each value into a Number, Boolean, and String form.
 * 2. Skip invalid numbers (NaN, " ", "100px") but log them separately.
 * 3. Build two arrays - one for valid numeric data, one for invalid.
 * 4. Print a detailed report using loops and conditional formatting.
 */

console.log("------------------------------------------------------------------");
console.log("Q1 - Dynamic Data Parser");
console.log("------------------------------------------------------------------");

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];
const validNumeric = [];
const invalidNumeric = [];

apiData.forEach((val, idx) => {
    // 1. Convert representations
    const numVal = Number(val);
    const boolVal = Boolean(val);
    const strVal = String(val);

    console.log(`Index [${idx}] | Original: [${typeof val}] ${val}`);
    console.log(`  ├─ Number : ${numVal}`);
    console.log(`  ├─ Boolean: ${boolVal}`);
    console.log(`  └─ String : "${strVal}"`);

    // 2 & 3. Validation filters
    let isInvalid = false;
    let reason = "";

    if (val === " " || val === "NaN" || val === "100px") {
        isInvalid = true;
        reason = "Explicitly specified invalid entry";
    } else if (val === null || val === undefined) {
        isInvalid = true;
        reason = `Primitive value is ${val}`;
    } else if (typeof val === "string" && (val === "true" || val === "false")) {
        isInvalid = true;
        reason = "Boolean-like string literal";
    } else if (isNaN(numVal)) {
        isInvalid = true;
        reason = "Evaluates to NaN";
    }

    if (!isInvalid) {
        validNumeric.push({ original: val, parsed: numVal });
    } else {
        invalidNumeric.push({ original: val, reason: reason });
    }
});

// 4. Output Summary Report
console.log("\n>>> VALID NUMERIC ARRAY:");
validNumeric.forEach(item => console.log(`  ✔ "${item.original}" successfully parsed to: ${item.parsed}`));

console.log("\n>>> INVALID / SKIPPED ARRAY:");
invalidNumeric.forEach(item => console.log(`  ✖ "${item.original}" skipped. Reason: ${item.reason}`));
console.log("\n");


// ==========================================================================
// Q2 - Employee Bonus Calculator
// ==========================================================================
/*
 * Question:
 * Given employee data:
 * const employees = [
 *   { name: "Amit", salary: "45000", years: "5" },
 *   { name: "Sara", salary: "38000", years: "2" },
 *   { name: "Kiran", salary: "52000", years: "7" }
 * ];
 * 
 * Tasks:
 * 1. Convert salary and years to numbers.
 * 2. Calculate bonus = (salary * 0.1) if years > 3 else (salary * 0.05).
 * 3. Apply strict validation using "use strict" (no implicit globals).
 * 4. Use template strings to print each employee's formatted details.
 * 5. Add try...catch to handle conversion or missing property errors.
 */

console.log("------------------------------------------------------------------");
console.log("Q2 - Employee Bonus Calculator");
console.log("------------------------------------------------------------------");

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" },
  { name: "John", salary: "invalid_sal", years: "4" }, // Intended conversion error
  { name: "Doe", years: "4" }                          // Intended missing property error
];

employees.forEach((emp, idx) => {
    try {
        // 3 & 5. Schema validation
        if (!emp.name) throw new Error("Missing 'name' attribute.");
        if (emp.salary === undefined) throw new Error(`Missing 'salary' for ${emp.name}`);
        if (emp.years === undefined) throw new Error(`Missing 'years' for ${emp.name}`);

        // 1. Conversion
        const salary = Number(emp.salary);
        const years = Number(emp.years);

        if (isNaN(salary) || salary < 0) throw new Error(`Invalid salary: "${emp.salary}" for ${emp.name}`);
        if (isNaN(years) || years < 0) throw new Error(`Invalid years: "${emp.years}" for ${emp.name}`);

        // 2. Bonus logic
        const bonusRate = years > 3 ? 0.10 : 0.05;
        const bonus = salary * bonusRate;

        // 4. Formatted printout
        console.log(`[PASS] ${emp.name.padEnd(6)} | Salary: $${salary.toLocaleString().padEnd(7)} | Experience: ${years} yrs | Bonus: $${bonus.toLocaleString()}`);

    } catch (err) {
        console.log(`[FAIL] Index ${idx}: ${err.message}`);
    }
});
console.log("\n");


// ==========================================================================
// Q3 - Transaction Validator
// ==========================================================================
/*
 * Question:
 * const transactions = [
 *   { id: 1, amount: 2000 },
 *   { id: 2, amount: -500 },
 *   { id: 3 },
 *   null
 * ];
 * 
 * Tasks:
 * 1. Loop through each transaction.
 * 2. Throw custom errors for: Negative amount, missing amount or id, null entries.
 * 3. Catch and categorize each error type in arrays (invalid, valid).
 * 4. Print final reports with counts of successful and failed transactions.
 * 5. Use a breakpoint to watch variable states.
 */

console.log("------------------------------------------------------------------");
console.log("Q3 - Transaction Validator");
console.log("------------------------------------------------------------------");

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

const validTransactions = [];
const invalidTransactions = [];

transactions.forEach((tx, index) => {
    try {
        // 2. Throwing custom errors
        if (tx === null) {
            throw { type: "NullEntryError", message: `Record at index ${index} is null.` };
        }
        if (tx.id === undefined || tx.amount === undefined) {
            throw { type: "MissingPropertyError", message: `Record at index ${index} is missing ID or Amount.` };
        }
        if (tx.amount < 0) {
            throw { type: "NegativeAmountError", message: `Transaction ID ${tx.id} has a negative amount: ${tx.amount}.` };
        }

        validTransactions.push(tx);

    } catch (error) {
        // 3. Catch and categorize
        invalidTransactions.push({
            index,
            id: tx ? tx.id : "N/A",
            errorType: error.type || "GeneralError",
            message: error.message
        });
    }
});

// 4. Final reports
console.log("Valid Entries:", validTransactions);
console.log("Invalid Entries:", invalidTransactions);
console.log(`Summary: Successful = ${validTransactions.length} | Failed = ${invalidTransactions.length}`);

/*
 * 5. DEBUGGING INSTRUCTIONS:
 * - Put a breakpoint inside this file's transaction validator loop.
 * - In VS Code's "Watch" sidebar, add `tx`, `validTransactions`, and `invalidTransactions`
 *   to monitor their states transitioning item-by-item on each iteration.
 */
console.log("\n");


// ==========================================================================
// Q4 - Debugging Mystery
// ==========================================================================
/*
 * Question:
 * Start with:
 * "use strict";
 * function showMessage() {
 *   greeting = "Welcome"; // undeclared
 *   console.log(greeting);
 * }
 * showMessage();
 * 
 * Tasks:
 * 1. Identify why this throws an error under strict mode.
 * 2. Fix it and explain how scope declaration rules changed behavior.
 * 3. Add a watch variable and observe the call stack in VS Code's debugger.
 */

console.log("------------------------------------------------------------------");
console.log("Q4 - Debugging Mystery");
console.log("------------------------------------------------------------------");

function showMessageFixed() {
  // 2. Variable is correctly declared using block scope 'const'
  const greeting = "Welcome"; 
  console.log("Fixed Output:", greeting);
}

showMessageFixed();

/*
 * --- TASKS ANSWERS ---
 * 
 * 1. Strict Mode Error:
 *    Without strict mode, assigning to an undeclared identifier ('greeting = "Welcome"') 
 *    automatically hooks the variable to the Global Object. In strict mode, implicit 
 *    global declarations are disabled, throwing a 'ReferenceError: greeting is not defined' 
 *    to prevent accidental globals.
 * 
 * 2. Scope Declaration Rule:
 *    Using 'const' binds the variable inside the function activation record (execution context scope) 
 *    rather than leaking it onto the global namespace.
 * 
 * 3. Debugger Watch:
 *    - Breakpoint inside `showMessageFixed()` displays the Call Stack: 
 *      `showMessageFixed()` -> (anonymous) [Global Context].
 *    - Watching `greeting` shows it transition from `undefined` to `"Welcome"`.
 */
console.log("\n");


// ==========================================================================
// Q5 - Hoisting Lab: The Sequence Trap
// ==========================================================================
/*
 * Question:
 * Predict, then run:
 * console.log(score);
 * announce();
 * var score = 50;
 * function announce() { console.log("Game started"); }
 * let status = "ready";
 * startGame();
 * function startGame() {
 *   console.log(status);
 * }
 * 
 * Tasks:
 * 1. Explain each hoisted element's memory state.
 * 2. Fix the code to run properly.
 * 3. Rewrite using arrow functions to compare hoisting differences.
 */

console.log("------------------------------------------------------------------");
console.log("Q5 - Hoisting Lab: The Sequence Trap");
console.log("------------------------------------------------------------------");

/*
 * 1. HOISTING MEMORY ANALYSIS (Original Code)
 * - 'var score': Hoisted and initialized with 'undefined'.
 * - 'announce()': Fully hoisted (identifier & function body). Callable immediately.
 * - 'let status': Hoisted but uninitialized in the Temporal Dead Zone (TDZ).
 * - 'startGame()': Function is hoisted, but running it before 'status' leaves the TDZ 
 *   throws a ReferenceError when trying to evaluate 'console.log(status)'.
 */

// 2. Corrected Sequence Implementation
var score = 50;
let status = "ready";

function announce() {
    console.log("Game started");
}

function startGame() {
    console.log("Status check:", status);
}

console.log("Fixed Score:", score);
announce();
startGame();

// 3. Arrow Function Rewrite (No Function Hoisting)
const announceArrow = () => console.log("Game started (Arrow)");
const startGameArrow = () => console.log("Status check (Arrow):", statusArrow);

const scoreArrow = 50;
const statusArrow = "ready";

announceArrow();
startGameArrow();
console.log("\n");


// ==========================================================================
// Q6 - Pyramid Pattern Generator
// ==========================================================================
/*
 * Question:
 * Generate:
 * *
 * * *
 * * * *
 * * * * *
 * 
 * Tasks:
 * 1. Replace let with var and observe changes in output.
 * 2. Debug step-by-step to track variable re-use.
 * 3. Add an outer loop limit controlled by user input (default = 5).
 * 4. Use "use strict" to catch undeclared loop variables.
 */

console.log("------------------------------------------------------------------");
console.log("Q6 - Pyramid Pattern Generator");
console.log("------------------------------------------------------------------");

const limit = 5; // Default limit

console.log("Pyramid with 'let' (Block Scoped):");
for (let i = 1; i <= limit; i++) {
    let row = "";
    for (let j = 1; j <= i; j++) {
        row += "* ";
    }
    console.log(row.trim());
}

console.log("\nPyramid with 'var' (Global/Function Scoped):");
for (var i_var = 1; i_var <= limit; i_var++) {
    var row_var = "";
    for (var j_var = 1; j_var <= i_var; j_var++) {
        row_var += "* ";
    }
    console.log(row_var.trim());
}

/*
 * --- TASKS ANSWERS ---
 * 
 * 1. 'let' vs 'var': Output remains identical, but 'let' keeps loop variables bound to the local 
 *    block, whereas 'var' leaks `i_var`, `j_var`, and `row_var` out to the global namespace.
 * 2. Variable Re-use: Stepping through 'var' demonstrates that the engine reuses the exact same 
 *    memory slots instead of creating fresh bindings each loop pass.
 * 4. strict mode catches undeclared variables (e.g. omitting let/var) instantly, preventing silent errors.
 */
console.log("\n");


// ==========================================================================
// Q7 - Smart Calculator
// ==========================================================================
/*
 * Question:
 * const operations = ["add", "divide", "power", "root", "subtract"];
 * const num1 = 25, num2 = 0;
 * 
 * Tasks:
 * 1. Use a switch to handle each operation.
 * 2. Add custom error handling for divide by 0 and root of negative number.
 * 3. If operation not recognized, throw InvalidOperationError.
 * 4. Wrap in try...catch and print results in a formatted summary.
 */

console.log("------------------------------------------------------------------");
console.log("Q7 - Smart Calculator");
console.log("------------------------------------------------------------------");

const operations = ["add", "divide", "power", "root", "subtract", "modulus"];
const num1 = 25, num2 = 0;

class InvalidOperationError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidOperationError";
    }
}

operations.forEach((op) => {
    try {
        let result;
        switch (op) {
            case "add":
                result = num1 + num2;
                break;
            case "subtract":
                result = num1 - num2;
                break;
            case "divide":
                if (num2 === 0) throw new Error("DivisionByZero: Cannot divide by zero.");
                result = num1 / num2;
                break;
            case "power":
                result = Math.pow(num1, num2);
                break;
            case "root":
                if (num1 < 0) throw new Error("NegativeRoot: Square root of negative number is complex.");
                result = Math.sqrt(num1);
                break;
            default:
                throw new InvalidOperationError(`The operation "${op}" is unsupported.`);
        }
        console.log(`[SUCCESS] ${op.toUpperCase().padEnd(8)}: result = ${result}`);
    } catch (error) {
        console.log(`[ERROR]   ${op.toUpperCase().padEnd(8)}: ${error.name} - ${error.message}`);
    }
});
console.log("\n");


// ==========================================================================
// Q8 - Strict Mode Showdown
// ==========================================================================
/*
 * Question:
 * function demo(a, a) {
 *   total = 10;
 *   delete total;
 * }
 * demo(5, 10);
 * 
 * Tasks:
 * 1. Run this with and without "use strict".
 * 2. Record the errors and differences in behavior.
 * 3. Explain why strict mode makes these operations illegal.
 * 4. Show a correct version using ES6 rules.
 */

console.log("------------------------------------------------------------------");
console.log("Q8 - Strict Mode Showdown");
console.log("------------------------------------------------------------------");

// 4. Compliant ES6 version
function demoFixed(a, b) {
    const total = 10; 
    console.log(`Parameters parsed securely: a = ${a}, b = ${b} | Local Total = ${total}`);
}
demoFixed(5, 10);

/*
 * --- TASKS ANSWERS ---
 * 
 * 1 & 2. Behavior differences:
 *    - Without strict mode: Duplicate parameter names 'function demo(a, a)' are accepted. 
 *      Implicit variables are leaked globally. 'delete total' silently fails.
 *    - With strict mode: Immediately crashes compiling with:
 *      * SyntaxError: Duplicate parameter name not allowed.
 *      * ReferenceError: total is not defined (prevents implicit variables).
 *      * SyntaxError: Delete of an unqualified identifier (cannot delete plain variables).
 * 
 * 3. Design Decisions behind Strict Mode:
 *    - Duplicate Parameters: Prevents shadowing values by mistake.
 *    - Implicit Globals: Blocks variables leaking to global space, causing unexpected cross-file states.
 *    - Deleting variables: Deleting a raw variable binding is grammatically incorrect (delete is for object properties).
 */
console.log("\n");


// ==========================================================================
// Q9 - JSON Audit
// ==========================================================================
/*
 * Question:
 * const rawData = [
 *   '{"user":"Alex","age":25}',
 *   '{"id":2}',
 *   '{invalid}',
 *   '{"user":"Mina","age":"22"}'
 * ];
 * 
 * Tasks:
 * 1. Parse each entry in a loop using try...catch.
 * 2. Detect missing keys (user, age) and invalid JSON.
 * 3. Push valid entries to a clean array; log errors with line numbers.
 * 4. Debug step-by-step to see how control flows on error.
 * 5. Add bonus: convert age to Number and filter under-18 users.
 */

console.log("------------------------------------------------------------------");
console.log("Q9 - JSON Audit");
console.log("------------------------------------------------------------------");

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}',
  '{"user":"Ben","age":15}' // Under 18 bonus check
];

const cleanArray = [];

rawData.forEach((entry, idx) => {
    const lineNum = idx + 1;
    try {
        let parsed;
        try {
            parsed = JSON.parse(entry);
        } catch {
            throw new SyntaxError(`Invalid JSON syntax: "${entry}"`);
        }

        // Schema verification
        if (!parsed.hasOwnProperty("user") || !parsed.hasOwnProperty("age")) {
            throw new TypeError("Schema validation failed: Missing user or age.");
        }

        // Convert and evaluate age
        const convertedAge = Number(parsed.age);
        if (isNaN(convertedAge)) throw new TypeError("Age value is non-numeric.");

        if (convertedAge < 18) {
            console.log(`Line ${lineNum}: [FILTERED] User "${parsed.user}" excluded (Under 18).`);
            return;
        }

        parsed.age = convertedAge;
        cleanArray.push(parsed);
        console.log(`Line ${lineNum}: [SUCCESS] Parsed:`, parsed);

    } catch (err) {
        console.log(`Line ${lineNum}: [ERROR] ${err.message}`);
    }
});

console.log("\nFinal Audited Array:", cleanArray);
/*
 * 4. CONTROL FLOW ON ERROR:
 *    When JSON parsing fails, execution inside the try block halts instantly. Control 
 *    jumps to the catch block to log the issue, allowing subsequent iterations to run unharmed.
 */
console.log("\n");


// ==========================================================================
// Q10 - Nested Hoisting and Closures
// ==========================================================================
/*
 * Question:
 * function outer() {
 *   console.log(count);
 *   var count = 5;
 *   function inner() {
 *     console.log(count);
 *     var count = 10;
 *   }
 *   inner();
 * }
 * outer();
 * 
 * Tasks:
 * 1. Predict and explain output.
 * 2. Show how hoisting creates separate memory contexts.
 * 3. Convert the inner function to an arrow and note behavior changes.
 * 4. Add a debug session and explain the call stack flow.
 */

console.log("------------------------------------------------------------------");
console.log("Q10 - Nested Hoisting and Closures");
console.log("------------------------------------------------------------------");

console.log("Executing standard nested closure functions:");
function outer() {
  console.log("  outer first log:", count); // expected: undefined
  var count = 5;
  function inner() {
    console.log("  inner first log:", count); // expected: undefined due to shadowing & local hoisting
    var count = 10;
  }
  inner();
}
outer();

console.log("\nExecuting arrow function equivalent:");
function outerWithArrow() {
  console.log("  outer first log (Arrow block):", count); 
  var count = 5;
  
  const innerArrow = () => {
    console.log("  innerArrow log               :", count); // expected: undefined
    var count = 10;
  };
  innerArrow();
}
outerWithArrow();

/*
 * --- TASKS ANSWERS ---
 * 
 * 1. Prediction: Both logs output 'undefined'.
 *    In outer, 'var count' is hoisted as undefined. 
 *    In inner, a separate local 'var count' is hoisted locally inside inner's scope, 
 *    shadowing outer's variable before execution.
 * 
 * 2. Separate Memory Contexts:
 *    Each call instantiates a new Execution Context with an independent Variable Environment.
 *    The engine resolves 'count' locally within inner's activation record and does not scan the parent scope.
 * 
 * 3. Conversion to Arrow:
 *    Arrow functions retain lexical block scope. Since 'var count = 10' was declared inside, 
 *    it is still hoisted to the top of the arrow block's environment, preserving 'undefined' behavior.
 * 
 * 4. Call Stack execution diagram:
 *    [Bottom of Stack] Global Context -> outer() Context -> inner() Context [Top of Stack]
 */
console.log("\n==================================================================");
console.log("                  ALL TASKS COMPLETED                             ");
console.log("==================================================================");
