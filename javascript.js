//to do
//refractor code
// add readme
// check functionality
// fix any bugs
//commit and publish to pagess

const btnAdd = document.getElementById("btn-add");
const btnSubtract = document.getElementById("btn-subtract");
const btnDivide = document.getElementById("btn-divide");
const btnMultiply = document.getElementById("btn-multiply");
const btnSum = document.getElementById("btn-sum");
const btnClear = document.getElementById("btn-clear");
const btnOne = document.getElementById("btn-1");
const btnTwo = document.getElementById("btn-2");
const btnThree = document.getElementById("btn-3");
const btnFour = document.getElementById("btn-4");
const btnFive = document.getElementById("btn-5");
const btnSix = document.getElementById("btn-6");
const btnSeven = document.getElementById("btn-7");
const btnEight = document.getElementById("btn-8");
const btnNine = document.getElementById("btn-9");
const btnZero = document.getElementById("btn-zero");
const btnDecimal = document.getElementById("btn-decimal");
const btnPlusMinus = document.getElementById("btn-plus-minus");
const btnBackspace = document.getElementById("btn-backspace");
const btnOnOff = document.getElementById("btn-on-off");
//get our buttons

let currentInput = "";
let storedValue = null;
let operator = null;
let justEvaluated = false;
let operatorPressed = false;
//set our global values

const container = document.querySelector(".container");
const para = document.createElement("p");
container.appendChild(para);
para.classList.add("right-align");
let calculatorText;
//set our DOM elements

function operate(a, b, operator) {
  a = parseFloat(a);
  b = parseFloat(b);
  operatorPressed = true;
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "÷":
      if (b === 0) {
        return 0;
      } else return a / b;
    case "*":
      return a * b;
    // switch statment used for operands, changing the calculation based on the passed string
  }
}
function addNumber(num) {
  if (currentInput.length > 10) {
    return;
  }
  if (justEvaluated) {
    para.textContent = "";
    currentInput = "";
    justEvaluated = false;
    operatorPressed = false;
  }
  currentInput += num;
  calculatorText = document.createTextNode(num);
  para.textContent += num;
  operatorPressed = false;
} //adds number to current input

btnOne.onclick = function () {
  addNumber("1");
};

btnTwo.onclick = function () {
  addNumber("2");
};

btnThree.onclick = function () {
  addNumber("3");
};

btnFour.onclick = function () {
  addNumber("4");
};

btnFive.onclick = function () {
  addNumber("5");
};

btnSix.onclick = function () {
  addNumber("6");
};

btnSeven.onclick = function () {
  addNumber("7");
};

btnEight.onclick = function () {
  addNumber("8");
};

btnNine.onclick = function () {
  addNumber("9");
};

btnZero.onclick = function () {
  addNumber("0");
};

btnAdd.onclick = function () {
  if (currentInput === "" && storedValue === null) {
    return;
  }
  if (currentInput === "" && operatorPressed) {
    operator = "+"; // change operator without calculating
    calculatorText = document.createTextNode("+");
    para.textContent = para.textContent.slice(0, -3) + " + ";
    return;
  }
  if (storedValue !== null && currentInput !== "") {
    storedValue = operate(storedValue, currentInput, operator);
  } else {
    storedValue = parseFloat(currentInput); //store the current input
  }
  currentInput = "";
  operator = "+";
  calculatorText = document.createTextNode("+");
  para.textContent += " + ";
  operatorPressed = true;
};

btnSubtract.onclick = function () {
  if (currentInput === "" && storedValue === null) {
    return;
  }
  if (currentInput === "" && operatorPressed) {
    operator = "-"; // change operator without calculating
    calculatorText = document.createTextNode("-");
    para.textContent = para.textContent.slice(0, -3) + " - ";
    return;
  }
  if (storedValue !== null && operator) {
    storedValue = operate(storedValue, currentInput, operator);
  } else {
    storedValue = parseFloat(currentInput);
  }
  currentInput = "";
  operator = "-";
  calculatorText = document.createTextNode("-");
  para.textContent += " - ";
  operatorPressed = true;
};

btnMultiply.onclick = function () {
  if (currentInput === "" && storedValue === null) {
    return;
  }
  if (currentInput === "" && operatorPressed) {
    operator = "*"; // change operator without calculating
    calculatorText = document.createTextNode("x");
    para.textContent = para.textContent.slice(0, -3) + " x ";
    return;
  }
  if (storedValue !== null && operator) {
    storedValue = operate(storedValue, currentInput, operator);
  } else {
    storedValue = parseFloat(currentInput);
  }
  currentInput = "";
  operator = "*";
  calculatorText = document.createTextNode("x");
  para.textContent += " x ";
  operatorPressed = true;
};

btnDivide.onclick = function () {
  if (currentInput === "" && storedValue === null) {
    return;
  }
  if (currentInput === "" && operatorPressed) {
    operator = "÷"; // change operator without calculating
    calculatorText = document.createTextNode("÷");
    para.textContent = para.textContent.slice(0, -3) + " ÷ ";
    return;
  }
  if (storedValue !== null && operator) {
    storedValue = operate(storedValue, currentInput, operator);
  } else {
    storedValue = parseFloat(currentInput);
  }
  currentInput = "";
  operator = "÷";
  calculatorText = document.createTextNode("÷");
  para.textContent += " ÷ ";
  operatorPressed = true;
};

btnSum.onclick = function () {
  if (storedValue !== null && operator && currentInput !== "") {
    //if we have a stored value, operator, and current input, perform the operate function
    const result = operate(storedValue, currentInput, operator);
    storedValue = null;
    operator = null;
    currentInput = result.toString();
    calculatorText = document.createTextNode("=");
    if (Number.isInteger(result)) {
      para.textContent = result;
    } else {
      para.textContent = result.toFixed(6).replace(/\.?0+$/, ""); //set our decimal place limit and remove any extra 0s
    }
    justEvaluated = true;
  }
};

btnClear.onclick = function () {
  currentInput = "";
  storedValue = null;
  operator = null;
  para.textContent = "";
  operatorPressed = false;
};

btnDecimal.onclick = function () {
  addNumber(".");
};

btnPlusMinus.onclick = function () {
  currentInput = currentInput * -1;
  para.textContent = currentInput;
};

btnBackspace.onclick = function () {
  if (justEvaluated) {
    return;
  }
  if (currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    let text = para.textContent;
    para.textContent = text.slice(0, text.length - 1);
  }
  //delete last character of our current input, then do the same for display and reset it.
};
