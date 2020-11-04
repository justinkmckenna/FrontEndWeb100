const billAmount = document.getElementById('billAmount') as HTMLInputElement;
const spanAmount = document.getElementById('amount') as HTMLSpanElement;
const tipEl = document.getElementById('tip') as HTMLSpanElement;
const amountToTip = document.getElementById('amountToTip') as HTMLSpanElement;
const totalToBePaid = document.getElementById('totalToBePaid') as HTMLSpanElement;
let amountOfBill = 0;
let tipPercentage = .2;

billAmount.addEventListener('keydown', handleKeyDown); // handleKeyUp() will invoke it, so make sure its handleKeyUp
billAmount.addEventListener('keyup', updateUI);

// dont use arrow functions for event handlers, because this will be empty
function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'e') {
        event.preventDefault();
    }
}

document.querySelectorAll('#tip-buttons>button').forEach(button => {
    button.addEventListener('click', calculateTip);
})

function calculateTip() {
    const buttonTheyClick = this as HTMLButtonElement;
    tipPercentage = parseFloat(buttonTheyClick.dataset.amount);
    updateUI();
}

function updateUI() {
    amountOfBill = billAmount.valueAsNumber || 0;
    spanAmount.innerText = amountOfBill.toString();
    tipEl.innerText = (tipPercentage * 100).toString();
    amountToTip.innerText = (amountOfBill * tipPercentage).toString();
    totalToBePaid.innerText = ((amountOfBill * tipPercentage) + amountOfBill).toString();
}

updateUI();