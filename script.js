document.addEventListener("DOMContentLoaded", function() {
    const transactions = [];
    const transactionForm = document.getElementById("transactionForm");
    const transactionTableBody = document.getElementById("transactionBody");
    const totalAmountElement = document.getElementById("totalAmount");

    // Function to add transaction
    function addTransaction(event) {
        event.preventDefault();
        const formData = new FormData(transactionForm);
        const amount = parseFloat(formData.get("amount"));
        const category = formData.get("category");
        const description = formData.get("description");
        const id = transactions.length;

        const transaction = {
            id: id,
            date: new Date().toLocaleString(),
            amount: amount,
            category: category,
            description: description
        };

        transactions.push(transaction);
        renderTransaction(transaction);
        calculateTotal();
        transactionForm.reset();
    }

    // Function to render transaction row
    function renderTransaction(transaction) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td><button class="delete-button" data-id="${transaction.id}">Удалить</button></td>
        `;
        if (transaction.amount >= 0) {
            row.classList.add("positive-transaction");
        } else {
            row.classList.add("negative-transaction");
        }
        row.addEventListener("click", function() {
            showTransactionDetails(transaction);
        });
        transactionTableBody.appendChild(row);
    }

    // Function to delete transaction
    function deleteTransaction(id) {
        const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
        if (transactionIndex !== -1) {
            transactions.splice(transactionIndex, 1);
            renderTransactions();
            calculateTotal();
        }
    }

    // Function to re-render transactions after deletion
    function renderTransactions() {
        transactionTableBody.innerHTML = "";
        transactions.forEach(transaction => {
            renderTransaction(transaction);
        });
    }

    // Function to calculate total amount
    function calculateTotal() {
        const totalAmount = transactions.reduce((total, transaction) => total + transaction.amount, 0);
        totalAmountElement.textContent = "Общее количество: " + totalAmount;
    }

    // Function to show transaction details
    function showTransactionDetails(transaction) {
        const detailsDiv = document.getElementById("transactionDetails");
        detailsDiv.style.display = "block";
        detailsDiv.innerHTML = `
            <h3>Детали транзакции</h3>
            <p><strong>ID:</strong> ${transaction.id}</p>
            <p><strong>Дата и время:</strong> ${transaction.date}</p>
            <p><strong>Количество:</strong> ${transaction.amount}</p>
            <p><strong>Категория:</strong> ${transaction.category}</p>
            <p><strong>Описание:</strong> ${transaction.description}</p>
        `;
    }

    // Event listener for form submission
    transactionForm.addEventListener("submit", addTransaction);

    // Event delegation for delete button clicks
    transactionTableBody.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-button")) {
            const transactionId = parseInt(event.target.getAttribute("data-id"));
            deleteTransaction(transactionId);
        }
    });
});
