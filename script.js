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
    const n1 = Number(num1);
    const n2 = Number(num2);
    switch (operator) {
    case '+':
      return add(n1, n2);
    case '-':
      return subtract(n1, n2);
    case '*':
      return multiply(n1, n2);
    case '/':
      return n2 === 0 ? "ERROR" : divide(n1, n2);
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
    }else {
        firstNumber += digit;
    }
    displayValue = firstNumber    
  }
    //work on the seeond number
   else {
    if(anotherNumber === "0" || anotherNumber === "") {
        anotherNumber = digit;
    } else {
        anotherNumber +=digit;
    }
    displayValue = anotherNumber
}
updateDisplay();
}
// Function to show the current value to the screen
function updateDisplay() {
  displayElement.textContent = displayValue;
};

//handle when an operator button is clicked
function checkOperatorClick(selectedOperator) {
    if (firstNumber !== "" && anotherNumber !== "") {
        const result = operate(operator, Number(firstNumber), Number(anotherNumber));
        displayValue = result;
        updateDisplay();
        // Save the result as the new firstNumber for the NEXT calculation
        firstNumber = result.toString();
        anotherNumber = ""; 
    }
    if (firstNumber !== "") {
        operator = selectedOperator;
    }

};
function handleEqualTo() {
    if(firstNumber === "" || anotherNumber === "" || !operator) {
        return;
    }
        const result = operate(operator, Number(firstNumber), Number(anotherNumber));
    displayValue = result;
    updateDisplay()
    //reseting the variables for the next calculation
    firstNumber = result.toString();
    anotherNumber = "";
    operator = null;
}
// add event listener for the numbers button
const digitButtons = document.querySelectorAll('.number');
    digitButtons.forEach(button => {
    button.addEventListener('click', () => {
    const digitValue = button.textContent.trim();
    checkDigitClick(digitValue);
    updateDisplay()
  });
});
//add eventlisteniner to the operator button
const operatorButtons = document.querySelectorAll(".operator")
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedOperator = button.textContent.trim()
            checkOperatorClick(selectedOperator)
        });
    });
    //also to th equal to
const equalsButton = document.querySelector('.equal-to');
equalsButton.addEventListener('click', () => {
    handleEqualTo();
});
//work on the clear button action
function handleClearClick() {
    firstNumber = "";
    anotherNumber = "";
    operator = null;
    displayValue = "0";
    updateDisplay(); 
}
//add event listener
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    handleClearClick();
});