let previousOperand = document.querySelector('.previous-operand');
let currentOperand = document.querySelector('.current-operand');
let numbers = document.querySelectorAll('[data-number]');
let operation = document.querySelectorAll('[data-operation]');
let del = document.querySelector('[data-delete]');
let clearBtn = document.querySelector('[data-all-clear]');
let equalsBtn = document.querySelector('[data-equals]');
let dot = document.querySelector('.dot');
let zero = document.querySelector('.zero');

let prev = 0; // Переменная предыдущего операнда.
let curr = 0; // Переменная текущего операнда.
let op; // Переменная, отслеживающая нажатую операцию.

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        currentOperand.innerHTML += numbers[i].innerHTML; // Обновление дисплея по нажатию на цифры.

        curr = parseFloat(currentOperand.innerText); // Обновление переменной по нажатию на цифры.

        if (!op) {
            previousOperand.innerText = '';
        }

        zero.disabled = currentOperand.innerText === '0'; // Фикс случая 00000.123

        isDotEnable();
    })
}

for (let i = 0; i < operation.length; i++) {
    operation[i].addEventListener('click', function (e) {
        // =======================================================================================
        if (!prev && !currentOperand.innerText) {
            return;
        } else if (!currentOperand.innerText) {
            op = e.target.innerText;
            previousOperand.innerText = prev + ' ' + op;
            return;
        }

        if (op) {
            calc();
        } else {
            prev = Number(currentOperand.innerText);
        }
        op = e.target.innerText;
        currentOperand.innerText = '';
        previousOperand.innerText = prev + ' ' + op;
    })
}

equalsBtn.addEventListener('click', function () {
    if (currentOperand.innerText) {
        calc();
        currentOperand.innerText = '';
        previousOperand.innerText = prev;
    }
    op = null;
    isDotEnable();
})

clearBtn.addEventListener('click', function () { // Clear Function
    previousOperand.innerHTML = '';
    currentOperand.innerHTML = '';
    equalsBtn.disabled = false;
    dot.disabled = false;
    op = null;
    curr = null;
    prev = null;
})

del.addEventListener('click', function () { // Delete Function
    if (!(currentOperand.innerText === '')) {
        currentOperand.innerHTML = currentOperand.innerHTML.slice(0, -1);
    } else {
        previousOperand.innerHTML = previousOperand.innerHTML.slice(0, -1).trim();
        prev = Number(previousOperand.innerHTML);
        if (op) {
            op = null;
        }
    }

    isDotEnable();
})

function calc() {
    if (isNaN(curr) || isNaN(prev)) {
        return;
    }
    switch (op) {
        case '+':
            prev = prev + curr;
            break;
        case '-':
            prev = prev - curr;
            break;
        case '÷':
            if (curr !== 0) {
                prev = prev / curr;
            } else {
                alert('Вы пытаетесь разделить на ноль!')
                previousOperand.innerText = prev;
            }
            break;
        case '*':
            prev = prev * curr;
            break;
    }
}

function isDotEnable() {
    dot.disabled = currentOperand.innerText.includes('.'); // Фикс случая 0........
}
