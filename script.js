const button = document.querySelector(".button")

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

let firstNumber = 3
let operator = "+"
let anotherNumber = 5
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
      return divide(num1, num2);
    default:
      return "Invalid operator";
}
}
//testing it
console.log(operate('+', 2, 4))
console.log(operate('-', 6, 2))
console.log(operate('/', 9, 3))
