let sortOrder = "asc";
function sortTable() {
  const tableBody = document.getElementById("expenses-table-body");
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  rows.sort((a, b) => {
    const amountA = parseFloat(
      a.cells[2].textContent.replace(/[^0-9.-]+/g, "")
    );
    const amountB = parseFloat(
      b.cells[2].textContent.replace(/[^0-9.-]+/g, "")
    );
    return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
  });
  rows.forEach((row) => tableBody.appendChild(row));
  sortOrder = sortOrder === "asc" ? "desc" : "asc";
}

function addExpense() {
  try {
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

    // Clear the input fields
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";

    updateTotalAllExpenses();
    updateTotalExpensesMonth();
    updateTotalExpensesYear();
    loadExpenses();

    alert("Expense added successfully");
  } catch (error) {
    console.error("Error adding expense:", error);
    alert("An error occurred while adding the expense. Please try again.");
  }
}

function updateTotalAllExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const totalAll = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  document.getElementById("total-expenses").textContent =
    totalAll.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

function updateTotalExpensesMonth() {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const totalMonth = expenses.reduce((sum, expense) => {
    const expenseDate = new Date(expense.datetime);
    const expenseMonth = expenseDate.getMonth() + 1;
    const expenseYear = expenseDate.getFullYear();
    if (expenseMonth === currentMonth && expenseYear === currentYear) {
      return sum + parseFloat(expense.amount);
    }
    return sum;
  }, 0);
  document.getElementById("total-expenses-month").textContent =
    totalMonth.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

function updateTotalExpensesYear() {
  const currentYear = new Date().getFullYear();
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const totalYear = expenses.reduce((sum, expense) => {
    const expenseYear = new Date(expense.datetime).getFullYear();
    if (expenseYear === currentYear) {
      return sum + parseFloat(expense.amount);
    }
    return sum;
  }, 0);
  document.getElementById("total-expenses-year").textContent =
    totalYear.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
}

function loadExpenses() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const tableBody = document.getElementById("expenses-table-body");
  tableBody.innerHTML = "";

  if (expenses.length === 0) {
    const noDataRow = document.createElement("tr");
    noDataRow.innerHTML = `
      <td colspan="3" class="text-center py-4">Empty data</td>
    `;
    tableBody.appendChild(noDataRow);
  } else {
    expenses.forEach((exp, index) => {
      const localDatetime = new Date(exp.datetime).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const trimmedDescription =
        exp.description.length > 10
          ? exp.description.substring(0, 10) + "..."
          : exp.description;

      const newRow = document.createElement("tr");
      newRow.classList.add("hover:bg-gray-50", "border-b");
      newRow.innerHTML = `
        <td class="px-4 py-2">${localDatetime}</td>
        <td class="px-4 py-2 cursor-pointer" data-index="${index}">${trimmedDescription}</td>
        <td class="px-4 py-2">${parseFloat(exp.amount).toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}</td>
      `;
      newRow
        .querySelector("td[data-index]")
        .addEventListener("click", (event) => {
          const index = event.target.getAttribute("data-index");
          showModal(index);
        });
      tableBody.appendChild(newRow);
    });
  }
}

function deleteExpense(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateTotalAllExpenses();
    updateTotalExpensesMonth();
    updateTotalExpensesYear();
    loadExpenses();
    alert("Expense deleted successfully");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const datetimeInput = document.getElementById("datetime");

  function updateDatetime() {
    const now = new Date();
    const localDatetime = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    datetimeInput.value = localDatetime;
  }

  document
    .getElementById("toggle-form-button")
    .addEventListener("click", () => {
      const form = document.querySelector("add-expense-form");
      form.classList.toggle("hidden");
      if (!form.classList.contains("hidden")) {
        updateDatetime();
      }
      refreshData();
    });

  document
    .getElementById("toggle-filter-button")
    .addEventListener("click", () => {
      const filter = document.querySelector("filter-form");
      filter.classList.toggle("hidden");
      refreshData();
    });

  document
    .getElementById("refresh-button")
    .addEventListener("click", refreshData);

  updateTotalAllExpenses();
  updateTotalExpensesMonth();
  updateTotalExpensesYear();
  loadExpenses();
});

function downloadData() {
  try {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
    alert("Data downloaded successfully");
  } catch (error) {
    console.error("Error downloading data:", error);
    alert("An error occurred while downloading the data. Please try again.");
  }
}

function loadData(event) {
  try {
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
      updateTotalAllExpenses();
      updateTotalExpensesMonth();
      updateTotalExpensesYear();
      loadExpenses();
    };
    reader.readAsText(file);
    alert("Data loaded successfully");
  } catch (error) {
    console.error("Error loading data:", error);
    alert("An error occurred while loading the data. Please try again.");
  }
}

function filterData() {
  try {
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
      filteredExpenses.forEach((exp, index) => {
        const localDatetime = new Date(exp.datetime).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const trimmedDescription =
          exp.description.length > 10
            ? exp.description.substring(0, 10) + "..."
            : exp.description;

        const newRow = document.createElement("tr");
        newRow.classList.add("hover:bg-gray-50", "border-b");
        newRow.innerHTML = `
          <td class="px-4 py-2 cursor-pointer" data-index="${index}">${localDatetime}</td>
          <td class="px-4 py-2">${trimmedDescription}</td>
          <td class="px-4 py-2">${parseFloat(exp.amount).toLocaleString(
            "id-ID",
            {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
          )}</td>
        `;
        newRow
          .querySelector("td[data-index]")
          .addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            deleteExpense(index);
          });
        tableBody.appendChild(newRow);
      });
    }

    alert(`${filteredExpenses.length} data found`);
  } catch (error) {
    console.error("Error filtering data:", error);
    alert("An error occurred while filtering the data. Please try again.");
  }
}

function refreshData() {
  document.getElementById("year").value = "";
  document.getElementById("month").value = "";
  loadExpenses();
  updateTotalAllExpenses();
  updateTotalExpensesMonth();
  updateTotalExpensesYear();
}

function showModal(index) {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expense = expenses[index];

  document.getElementById(
    "modal-date"
  ).innerHTML = `<strong>Date:</strong><br>${new Date(
    expense.datetime
  ).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
  document.getElementById(
    "modal-description"
  ).innerHTML = `<strong>Description:</strong><br>${expense.description}`;
  document.getElementById(
    "modal-amount"
  ).innerHTML = `<strong>Amount:</strong><br>${parseFloat(
    expense.amount
  ).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;

  document.getElementById("expense-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("expense-modal").classList.add("hidden");
}
