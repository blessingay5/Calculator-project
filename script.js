function add(num1, num2) {
    return num1 + num2
};
function subtract(num1, num2) {
    return num1 - num2
};
function multiply(num1, num2) {
    return num1 * num2
};
function divide(num1, num2) {
    return num1 / num2
};

let firstNumber = "";
let operator = null;
let anotherNumber = "";
let displayValue = '0';
//a funtion that takes an operator and two numbers
function operate(operator, num1, num2) {
    switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      return num2 === 0 ? "ERROR" : divide(num1, num2);
    default:
      return "Invalid operator";
    }
}

const displayElement = document.querySelector(".result-display")
//handle numbers
function checkDigitClick(digit) {
    //work on the first number
  if(operator === null) {
  if(firstNumber === "0" || firstNumber === "") {
    firstNumber = digit
  } else {
    firstNumber += digit;
  }
  displayValue = firstNumber    
  }
    //work on the seeond number
   else
    if(anotherNumber === "0" || anotherNumber === "") {
        anotherNumber = digit;
    } else {
        anotherNumber +=digit;
    }
    displayValue = anotherNumber
}
updateDisplay();


