class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.allClear();
    }
    allClear() {
        this.currentOperand = null;
        this.previousOperand = null;
        this.operation = null;
        this.overwrite = false;
    }
    delete() {
        if (this.currentOperand == null) return;
        if (this.overwrite === true || this.currentOperand.length === 1) {
            this.currentOperand = null;
            this.overwrite = false;
        }
        else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }
    addDigit(digit) {
        if (this.overwrite) {
            this.currentOperand = digit;
            this.overwrite = false;
        }
        else if (this.currentOperand == null) {
            this.currentOperand = digit;
        }
        else if (digit === "0" && this.currentOperand === "0") return;
        else if (digit === "." && this.currentOperand.includes(".")) return;
        else {
            this.currentOperand = `${this.currentOperand}${digit}`;
        }
    }
    chooseOperation(operation) {
        if (this.previousOperand == null && this.currentOperand == null) return;
        if (this.currentOperand[this.currentOperand.length - 1] === ".") return;
        if (this.previousOperand == null) {
            this.previousOperand = this.currentOperand;
            this.operation = operation;
            this.currentOperand = null;
        }
        else if (this.currentOperand == null) {
            this.operation = operation;
        }
        else {
            this.previousOperand = evaluate(this.previousOperand, this.currentOperand, this.operation);
            this.currentOperand = null;
            this.operation = operation;
        }
    }
    calculate() {
        if (this.previousOperand == null || this.currentOperand == null || this.operation == null) return;
        this.currentOperand = evaluate(this.previousOperand, this.currentOperand, this.operation);
        this.previousOperand = null;
        this.operation = null;
        this.overwrite = true;
    }
    updateDisplay() {
        this.previousOperandElement.innerText = `${numberFormatter(this.previousOperand) || ""} ${this.operation || ""}`;
        this.currentOperandElement.innerText = numberFormatter(this.currentOperand);
    }
}

const digitButtons = document.querySelectorAll("[data-digit]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const acButton = document.querySelector("[data-all-clear]");
const delButton = document.querySelector("[data-delete]");
const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]");
const calculator = new Calculator(previousOperandElement, currentOperandElement);

const intergerFormatter = new Intl.NumberFormat("en-us", { maximumFractionDigits: 0 });
function numberFormatter(number) {
    if (number == null) return null;
    const [interger, decimal] = number.split(".");
    return decimal == null
      ? intergerFormatter.format(interger)
      : `${intergerFormatter.format(interger)}.${decimal}`
}

function evaluate(previousOperand, currentOperand, operation) {
    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(previous) || isNaN(current)) return "";
    let ans = "";
    switch (operation) {
        case "+":
            ans = previous + current;
            break;
        case "-":
            ans = previous - current;
            break;
        case "x":
            ans = previous * current;
            break;
        case "/":
            ans = previous / current;
            break;
        default:
    }
    return ans.toString();
}

digitButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.addDigit(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

acButton.addEventListener("click", () => {
    calculator.allClear();
    calculator.updateDisplay();
});

delButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});