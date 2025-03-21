document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const balance = document.querySelector('.balance');
    const incomeExpense = document.querySelector('.income-expense');
    const income = document.querySelector('.income');
    const expense = document.querySelector('.expense');
    const list = document.querySelector('.list');
    const forms = document.querySelector('.forms');
    const expenceName = document.getElementById('expencename');
    const expenceAmount = document.getElementById('expenceamount');
    const button = document.getElementById('button');
    const totalBalance = document.getElementById('totalBalance');
    const updateBalance = document.getElementById('updateBalance');

    // Load expenses from local storage or initialize empty array
    let expences = JSON.parse(localStorage.getItem('expences')) || [];
    updateTotal();
    renderExpenses();
    function saveExpencesToLocal() {
        localStorage.setItem('expences', JSON.stringify(expences));
    }

    forms.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = expenceName.value.trim();
        const amount = parseFloat(expenceAmount.value.trim());

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpence = {
                id: Date.now(),
                name: name,
                amount: amount
            };

            expences.push(newExpence);
            saveExpencesToLocal();
            updateTotal();
            renderExpenses();

            // Clear input fields
            expenceName.value = "";
            expenceAmount.value = "";
        } else {
            alert("Please enter a valid expense name and a positive amount.");
        }
    });

    function calculateTotal() {
        return expences.reduce((sum, exp) => sum + exp.amount, 0);
    }

    

    function updateTotal() {
        const totalAmount = calculateTotal();
        totalBalance.value = totalAmount.toFixed(2); // Use .value for input fields
    }

    function renderExpenses() {
        list.innerHTML = "";
        expences.forEach(exp => {
            const li = document.createElement('li');
            li.textContent = `${exp.name}: ₹${exp.amount.toFixed(2)}`;
            list.appendChild(li);
        });
    }
});
