let sortOrder = "asc";
function sortTable() {
  const tableBody = document.getElementById("expenses-table-body");
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const amountA = parseFloat(a.cells[2].textContent);
    const amountB = parseFloat(b.cells[2].textContent);
    return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
  });
  rows.forEach((row) => tableBody.appendChild(row));
  sortOrder = sortOrder === "asc" ? "desc" : "asc";
}

function addExpense() {
  const datetime = document.getElementById("datetime").value;
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;

  if (!datetime || !amount || !description) {
    alert("Please fill in all fields");
    return;
  }

  // Multiply the entered amount by 1000
  const adjustedAmount = parseFloat(amount) * 1000;

  const expense = { datetime, amount: adjustedAmount, description };
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  loadExpenses();
  updateTotalExpenses();
  updateTotalAllExpenses();
}

function updateTotalAllExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const totalAll = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  document.getElementById("total-all-expenses").textContent = totalAll;
}

function updateTotalExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const total = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  document.getElementById("total-expenses").textContent = total;
}

function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const tableBody = document.getElementById("expenses-table-body");
  tableBody.innerHTML = ""; // Clear the table body

  if (expenses.length === 0) {
    const noDataRow = document.createElement("tr");
    noDataRow.innerHTML = `
      <td colspan="3" class="text-center py-4">Empty data</td>
    `;
    tableBody.appendChild(noDataRow);
  } else {
    expenses.forEach((exp) => {
      const localDatetime = new Date(exp.datetime).toLocaleString();
      const newRow = document.createElement("tr");
      newRow.classList.add("hover:bg-gray-50", "border-b");
      newRow.innerHTML = `
        <td class="px-4 py-2">${localDatetime}</td>
        <td class="px-4 py-2">${exp.description}</td>
        <td class="px-4 py-2">${exp.amount}</td>
      `;
      tableBody.appendChild(newRow);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const datetimeInput = document.getElementById("datetime");
  const now = new Date();
  const localDatetime = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);
  datetimeInput.value = localDatetime;

  const currentYear = new Date().getFullYear();
  const yearSelect = document.getElementById("year");
  for (let year = currentYear; year >= 2024; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  const currentMonth = new Date().getMonth() + 1;
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthSelect = document.getElementById("month");
  for (let i = 0; i < currentMonth; i++) {
    const option = document.createElement("option");
    option.value = i + 1;
    option.textContent = months[i];
    monthSelect.appendChild(option);
  }

  document
    .getElementById("toggle-form-button")
    .addEventListener("click", () => {
      const form = document.querySelector("add-expense-form");
      form.classList.toggle("hidden");
    });

  document
    .getElementById("toggle-filter-button")
    .addEventListener("click", () => {
      const filter = document.querySelector("filter-form");
      filter.classList.toggle("hidden");
    });

  updateTotalExpenses();
  updateTotalAllExpenses();
  loadExpenses();
});

function downloadData() {
  const data = JSON.stringify(localStorage);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  a.click();
  URL.revokeObjectURL(url);
}

function loadData(event) {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = JSON.parse(e.target.result);
    for (const key in data) {
      localStorage.setItem(key, data[key]);
    }
    loadExpenses();
    updateTotalExpenses();
    updateTotalAllExpenses();
  };
  reader.readAsText(file);
}

function filterData() {
  const selectedYear = document.getElementById("year").value;
  const selectedMonth = document.getElementById("month").value;

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.datetime);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth() + 1; // getMonth() returns 0-11

    return (
      (selectedYear === "" || expenseYear == selectedYear) &&
      (selectedMonth === "" || expenseMonth == selectedMonth)
    );
  });

  const tableBody = document.getElementById("expenses-table-body");
  tableBody.innerHTML = ""; // Clear the table body

  if (filteredExpenses.length === 0) {
    const noDataRow = document.createElement("tr");
    noDataRow.innerHTML = `
      <td colspan="3" class="text-center py-4">Data not found</td>
    `;
    tableBody.appendChild(noDataRow);
  } else {
    filteredExpenses.forEach((exp) => {
      const localDatetime = new Date(exp.datetime).toLocaleString();
      const newRow = document.createElement("tr");
      newRow.classList.add("hover:bg-gray-50", "border-b");
      newRow.innerHTML = `
        <td class="px-4 py-2">${localDatetime}</td>
        <td class="px-4 py-2">${exp.description}</td>
        <td class="px-4 py-2">${exp.amount}</td>
      `;
      tableBody.appendChild(newRow);
    });
  }
}
