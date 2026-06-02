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
let isCalculated = false;
//a funtion that takes an operator and two numbers
function operate(operator, num1, num2) {
    const n1 = Number(num1);
    const n2 = Number(num2);
    let result;
    switch (operator) {
    case '+':
      result = add(n1, n2);
      break;
    case '-':
      result = subtract(n1, n2);
      break;
    case '*':
      result = multiply(n1, n2);
      break;
    case '/':
      result = n2 === 0 ? "ERROR" : divide(n1, n2);
      break;
    default:
      return "Invalid operator";
    }
    if (result === "ERROR") return result; 
     
    return Math.round(result * 10000) / 10000;
    
}

const displayElement = document.querySelector(".result-display")
//handle numbers
function checkDigitClick(digit) {
    //reset the calculator if a new number is clicked after a calculation
    if (isCalculated) {
        firstNumber = "";
        isCalculated = false;
    }
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
    // If there is already an operator and another number, perform the calculation first
    if (isCalculated) {
        isCalculated = false;
    }
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
    if(operator === null || anotherNumber === "") {
        if (firstNumber !== "") {
            displayValue = firstNumber;
            updateDisplay();
        }   
        return;
    }
        const result = operate(operator, Number(firstNumber), Number(anotherNumber));
    displayValue = result;
    updateDisplay()
    //reseting the variables for the next calculation
    firstNumber = result.toString();
    anotherNumber = "";
    operator = null;
    isCalculated = true;
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
            const selectedOperator = button.dataset.action;
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
    isCalculated = false;
    updateDisplay(); 
}
//add event listener
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    handleClearClick();
});
//handle the decimal button
function handleDecimalClick() {
    if (isCalculated) {
        firstNumber = "";
        isCalculated = false;
    }
   if (operator === null) {
    if (firstNumber === "") {
            firstNumber = "0.";
        }
     else if(!firstNumber.includes('.')) {
            firstNumber += ".";
        displayValue = firstNumber;
        updateDisplay();
        }
    } else {
        if (anotherNumber === "") {
            anotherNumber = "0.";
        }
        else if(!anotherNumber.includes('.')) {
            anotherNumber += ".";
            displayValue = anotherNumber;
            updateDisplay();
        }
    }
}
//add event listener to the decimal button
const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', () => {
    handleDecimalClick();
});
//handle the backspace button
function handleBackspaceClick() {
    if (isCalculated) {
        firstNumber = "";
        isCalculated = false;
    }
    if (operator === null) {
        if (firstNumber.length > 0) {
            firstNumber = firstNumber.slice(0, -1);
            displayValue = firstNumber || '0';
            updateDisplay();
        }
    } else {
        if (anotherNumber.length > 0) {
            anotherNumber = anotherNumber.slice(0, -1);
            displayValue = anotherNumber || '0';
            updateDisplay();
        }
    }
}
//add event listener to the backspace button
const backspaceButton = document.querySelector('.backspace');
backspaceButton.addEventListener('click', () => {
    handleBackspaceClick();
});
//keyboard support  
window.addEventListener('keydown', (e) => {
    // handle Numbers (0-9)
    if (e.key >= '0' && e.key <= '9') {
        checkDigitClick(e.key);
    }
    //handle Operators
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        // Prevents the '/' key from opening up the quick-find search in some browsers
        e.preventDefault(); 
        checkOperatorClick(e.key);
    }
    //use enter key for =
    if (e.key === '=' || e.key === 'Enter') {
        e.preventDefault(); //prevents Enter from re-triggering the last focused button
        handleEqualTo();
    }
    //Handle Decimal
    if (e.key === '.') {
        handleDecimalClick();
    }
    //Handle Backspace
    if (e.key === 'Backspace') {
        handleBackspaceClick();
    }
    //handle Clear (use Escape key for clear)
    if (e.key === 'Escape') {
        handleClearClick();
    }
});
