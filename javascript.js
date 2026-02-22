// DOM
const keypad = document.getElementById("calculator-background");
const screen = document.getElementById("calculator-screen");

// create the display
let display = document.getElementById("display");
if (!display) {
  display = document.createElement("p");
  display.id = "display";
  display.className = "right-align";
  screen.appendChild(display);
}

// state
let currentInput = "";
let storedValue = null;
let operator = null;
let justEvaluated = false;
let operatorPressed = false;

const MAX_LEN = 10;

// math
function operate(a, b, op) {
  const x = parseFloat(a);
  const y = parseFloat(b);

  switch (op) {
    case "+":
      return x + y;
    case "-":
      return x - y;
    case "*":
      return x * y;
    case "÷":
      return y === 0 ? 0 : x / y;
    default:
      return y;
  }
}

// limits number up to 6 decimal places
function formatResult(n) {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(6).replace(/\.?0+$/, "");
}

// input
function addChar(char) {
  if (currentInput.length >= MAX_LEN) return;

  // resets display for new character input
  if (justEvaluated) {
    display.textContent = "";
    currentInput = "";
    justEvaluated = false;
    operatorPressed = false;
  }

  // avoid multiple decimals in one number
  if (char === "." && currentInput.includes(".")) return;

  currentInput += char;
  display.textContent += char;
  operatorPressed = false;
}

function setOperator(nextOp, symbolForScreen) {
  // don't allow operator first
  if (currentInput === "" && storedValue === null) return;

  // if user pressed operator twice, replace the operator on the screen
  if (currentInput === "" && operatorPressed) {
    operator = nextOp;
    display.textContent =
      display.textContent.slice(0, -3) + ` ${symbolForScreen} `;
    return;
  }

  // if we already have a stored value, chain calculations
  if (storedValue !== null && operator && currentInput !== "") {
    storedValue = operate(storedValue, currentInput, operator);
  } else {
    storedValue = parseFloat(currentInput);
  }

  currentInput = "";
  operator = nextOp;
  display.textContent += ` ${symbolForScreen} `;
  operatorPressed = true;
}

function evaluate() {
  if (storedValue === null || !operator || currentInput === "") return;

  const result = operate(storedValue, currentInput, operator);

  storedValue = null;
  operator = null;
  currentInput = String(result);

  display.textContent = formatResult(result);
  justEvaluated = true;
  operatorPressed = false;
}

function clearAll() {
  currentInput = "";
  storedValue = null;
  operator = null;
  justEvaluated = false;
  operatorPressed = false;
  display.textContent = "";
}

function backspace() {
  if (justEvaluated) return;
  if (currentInput.length === 0) return;

  currentInput = currentInput.slice(0, -1);
  display.textContent = display.textContent.slice(0, -1);
}

function plusMinus() {
  if (currentInput === "") return;
  currentInput = String(parseFloat(currentInput) * -1);
  display.textContent = currentInput;
}

//listener for all buttons
keypad.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const type = btn.dataset.type;
  const value = btn.dataset.value;

  if (type === "number") {
    addChar(value);
    return;
  }

  if (type === "decimal") {
    addChar(".");
    return;
  }

  if (type === "operator") {
    const screenSymbol = value === "*" ? "x" : value;
    setOperator(value, screenSymbol);
    return;
  }

  if (type === "equals") {
    evaluate();
    return;
  }

  if (type === "clear") {
    clearAll();
    return;
  }

  if (type === "backspace") {
    backspace();
    return;
  }

  if (type === "plusminus") {
    plusMinus();
    return;
  }
});
