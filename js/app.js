const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operators");
const currentOperandText = document.querySelector(".current-number");
const previousOperandText = document.querySelector(".previous-number");
const allclear = document.querySelector(".allclear");



class Calculator {

    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
    
    }

    appendNumber(number) {
        this.previousOperand = String(currentOperandText.textContent) + String(previousOperandText.textContent);
        this.currentOperand =  String(this.currentOperand) + String(number);
    }

    updateScreen() {
        this.currentOperandText.textContent = this.currentOperand;
    }
}

calculator = new Calculator(previousOperandText, currentOperandText);


for (let number of numbers) {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.textContent)
        calculator.updateScreen();
    })
}

allclear.addEventListener("click", (calculator.clear));