document.addEventListener("DOMContentLoaded", function () {
  // Selecting DOM elements
  const form = document.getElementById("expense-form"); // The expense form element
  const expenseList = document.getElementById("expense-list"); // The list where expenses will be displayed
  const clearAllBtn = document.getElementById("clear-all-btn"); // Button to clear all expenses
  const totalAmountDisplay = document.getElementById("total-amount"); // Display total amount

  // Retrieve expenses from localStorage or initialize an empty array
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  // Render initial list of expenses on page load
  renderExpenses();

  // Event listener for form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get values from form inputs
    const itemName = document.getElementById("item-name").value;
    const itemAmount = parseFloat(document.getElementById("item-amount").value);

    // Create expense object
    const expense = {
      name: itemName,
      amount: itemAmount,
    };

    // Add new expense to expenses array and update localStorage
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Add new expense to the list and update total amount display
    addExpenseToList(expense);
    updateTotalAmount();

    // Reset form inputs
    form.reset();
  });

  // Function to add a single expense to the list
  function addExpenseToList(expense) {
    const li = document.createElement("li");
    li.innerHTML = `${expense.name}: ₹${expense.amount.toFixed(
      2
    )} <button class="delete-btn">X</button>`;
    expenseList.appendChild(li);

    // Event listener for delete button to remove expense from list and update total amount
    li.querySelector(".delete-btn").addEventListener("click", function () {
      expenseList.removeChild(li);
      expenses = expenses.filter((e) => e !== expense);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      updateTotalAmount();
    });
  }

  // Event listener for clear all button to remove all expenses
  clearAllBtn.addEventListener("click", function () {
    localStorage.removeItem("expenses");
    expenses = [];
    while (expenseList.firstChild) {
      expenseList.removeChild(expenseList.firstChild);
    }
    updateTotalAmount();
  });

  // Function to update the total amount display
  function updateTotalAmount() {
    const totalAmount = expenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    totalAmountDisplay.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
  }

  // Function to render all expenses initially on page load
  function renderExpenses() {
    expenses.forEach((expense) => addExpenseToList(expense));
    updateTotalAmount();
  }
});
