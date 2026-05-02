class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }


    
        clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') this.currentOperand = '0';
    }

            appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert("Cannot divide by zero!");
                    this.clear();
                    return;
                }
                computation = prev / current;
                break;
            case '^':
                computation = Math.pow(prev, current);
                break;
            default:
                return;
        }
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    computeScientific(func) {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        let result;

        switch (func) {
            case 'sqrt':
                result = Math.sqrt(current);
                break;
            case 'sin':
                result = Math.sin(current * Math.PI / 180); // Assumes degrees
                break;
            case 'cos':
                result = Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                result = Math.tan(current * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(current);
                break;
            case 'ln':
                result = Math.log(current);
                break;
            case 'exp':
                result = Math.exp(current);
                break;
            case 'fact':
                result = this.factorial(current);
                break;
            case 'pi':
                result = Math.PI;
                break;
            default:
                return;
        }

        this.currentOperand = result.toString();
        this.updateDisplay();
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= n; i++) res *= i;
        return res;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]');
      const operationButtons = document.querySelectorAll('[data-operation]');
            const sciButtons = document.querySelectorAll('[data-sci-function]');
            const equalsButton = document.querySelector('[data-equals]');
            const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const modeToggle = document.getElementById('mode-toggle');

const calculatorContainer = document.querySelector('.calculator');
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandElement, currentOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        let op = button.innerText;
        if (button.getAttribute('data-sci-function') === 'pow') op = '^';
        calculator.chooseOperation(op);
        calculator.updateDisplay();
    });
});

sciButtons.forEach(button => {
    button.addEventListener('click', () => {
        const func = button.getAttribute('data-sci-function');
        if (func === 'pow') {
            calculator.chooseOperation('^');
        } else {
            calculator.computeScientific(func);
        }
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});


modeToggle.addEventListener('click', () => {
    calculatorContainer.classList.toggle('scientific-mode');
    modeToggle.classList.toggle('active');
    if (calculatorContainer.classList.contains('scientific-mode')) {
        modeToggle.innerText = 'Switch to Simple Mode';
    } else {
        modeToggle.innerText = 'Switch to Scientific Mode';
    }
});


const mouseGlow = document.getElementById('mouse-glow');
const blobs = document.querySelectorAll('.blob');
const calculatorElem = document.getElementById('calculator');
const firefliesContainer = document.getElementById('fireflies');
const fireflies = [];

let mouseX = 0;
let mouseY = 0;
let isMouseInside = false;



for (let i = 0; i < 35; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefliesContainer.appendChild(firefly);
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = 2 + Math.random() * 3;
    
    firefly.style.width = `${size}px`;
    firefly.style.height = `${size}px`;
    
    fireflies.push({
        element: firefly,
        x: x,
        y: y,
        targetX: x,
        targetY: y,
        speed: 0.01 + Math.random() * 0.03,
        jitter: Math.random() * 10
    });
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    const rect = calculatorElem.getBoundingClientRect();
    isMouseInside = (
        mouseX >= rect.left && 
        mouseX <= rect.right && 
        mouseY >= rect.top && 
        mouseY <= rect.bottom
    );

    if (isMouseInside) {
        mouseGlow.style.opacity = '0';
    } else {
        mouseGlow.style.opacity = '1';
        mouseGlow.style.left = `${mouseX}px`;
        mouseGlow.style.top = `${mouseY}px`;
        
        const moveX = (mouseX - window.innerWidth / 2) / 50;
        const moveY = (mouseY - window.innerHeight / 2) / 50;
        
        blobs.forEach((blob, index) => {
            const factor = (index + 1) * 0.5;
            blob.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
        });
    }
});

function animate() {
    fireflies.forEach(f => {
        if (!isMouseInside) {
         
            f.targetX = mouseX + (Math.random() - 0.5) * 150;
            f.targetY = mouseY + (Math.random() - 0.5) * 150;
        } else {
       
            if (Math.random() > 0.98) {
                f.targetX = Math.random() * window.innerWidth;
                f.targetY = Math.random() * window.innerHeight;
            }
        }

  
        const jitterX = (Math.random() - 0.5) * f.jitter;
        const jitterY = (Math.random() - 0.5) * f.jitter;

        f.x += (f.targetX - f.x) * f.speed + jitterX;
        f.y += (f.targetY - f.y) * f.speed + jitterY;
        
        f.element.style.left = `${f.x}px`;
        f.element.style.top = `${f.y}px`;
    });

    requestAnimationFrame(animate);
}

animate();

/*here i have created the logic*/
document.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        calculator.appendNumber(e.key);
    } else if (e.key === '+') {
        calculator.chooseOperation('+');
    } else if (e.key === '-') {
        calculator.chooseOperation('−');
    } else if (e.key === '*') {
        calculator.chooseOperation('×');
    } else if (e.key === '/') {
        calculator.chooseOperation('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculator.compute();
    } else if (e.key === 'Backspace') {
        calculator.delete();
    } else if (e.key === 'Escape') {
        calculator.clear();
    }
    calculator.updateDisplay();
});
