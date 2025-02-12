import Swal from 'sweetalert2';

let sortOrder = 'asc';
let currentPage = 1;
const itemsPerPage = 10;
let currentExpenseIndex = null;

const getExpenses = () => JSON.parse(localStorage.getItem('expenses')) || [];
const setExpenses = (expenses) =>
  localStorage.setItem('expenses', JSON.stringify(expenses));

const formatCurrency = (amount, showCurrency = true) =>
  parseFloat(amount)
    .toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace('Rp', showCurrency ? 'Rp. ' : ' ');

const formatDate = (datetime) =>
  new Date(datetime).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

const formatDateTime = (datetime) =>
  new Date(datetime).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

const sortExpenses = (expenses, key, asc = true) => {
  return expenses.sort((a, b) => {
    const valA = key === 'datetime' ? new Date(a[key]) : parseFloat(a[key]);
    const valB = key === 'datetime' ? new Date(b[key]) : parseFloat(b[key]);
    return asc ? valA - valB : valB - valA;
  });
};

export const sortTable = () => {
  const expenses = sortExpenses(getExpenses(), 'amount', sortOrder === 'asc');
  setExpenses(expenses);
  sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
  loadExpenses();
};

export const sortTableByDate = () => {
  const expenses = sortExpenses(
    getExpenses(),
    'datetime',
    sortOrder === 'desc'
  );
  setExpenses(expenses);
  sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
  loadExpenses();
};

export const addExpense = () => {
  try {
    const datetime = document.getElementById('datetime').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;

    if (!datetime || !amount || !description) {
      Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    }
    const formattedDescription = description
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    const expense = { datetime, amount, description: formattedDescription };
    const expenses = getExpenses();
    expenses.push(expense);
    setExpenses(expenses);

    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';

    updateTotals();
    loadExpenses();

    Swal.fire('Success', 'Expense added successfully', 'success');
  } catch (error) {
    console.error('Error adding expense:', error);
    Swal.fire(
      'Error',
      'An error occurred while adding the expense. Please try again.',
      'error'
    );
  }
};

export const updateTotals = () => {
  updateTotalAllExpenses();
  updateTotalExpensesMonth();
  updateTotalExpensesYear();
};

const updateTotalAllExpenses = () => {
  const totalAll = getExpenses().reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  document.getElementById('total-expenses').textContent =
    formatCurrency(totalAll);
};

const updateTotalExpensesMonth = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const totalMonth = getExpenses().reduce((sum, expense) => {
    const expenseDate = new Date(expense.datetime);
    return expenseDate.getMonth() + 1 === currentMonth &&
      expenseDate.getFullYear() === currentYear
      ? sum + parseFloat(expense.amount)
      : sum;
  }, 0);
  document.getElementById('total-expenses-month').textContent =
    formatCurrency(totalMonth);
};

const updateTotalExpensesYear = () => {
  const currentYear = new Date().getFullYear();
  const totalYear = getExpenses().reduce((sum, expense) => {
    return new Date(expense.datetime).getFullYear() === currentYear
      ? sum + parseFloat(expense.amount)
      : sum;
  }, 0);
  document.getElementById('total-expenses-year').textContent =
    formatCurrency(totalYear);
};

export const loadExpenses = () => {
  const expenses = getExpenses();
  const tableBody = document.getElementById('expenses-table-body');
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedExpenses = expenses.slice(startIndex, endIndex);

  if (paginatedExpenses.length === 0) {
    const noDataRow = document.createElement('tr');
    noDataRow.innerHTML = `<td colspan="3" class="text-center py-4">Empty data</td>`;
    tableBody.appendChild(noDataRow);
  } else {
    paginatedExpenses.forEach((exp, index) => {
      const localDatetime = formatDate(exp.datetime);
      const trimmedDescription =
        exp.description.length > 10
          ? `${exp.description.substring(0, 10)}...`
          : exp.description;

      const newRow = document.createElement('tr');
      newRow.classList.add('hover:bg-gray-50');
      newRow.innerHTML = `
        <td class="px-4 py-2">${localDatetime}</td>
        <td class="px-4 py-2 cursor-pointer underline text-underline whitespace-nowrap" data-index="${startIndex + index}">${trimmedDescription}</td>
        <td class="px-4 py-2">${formatCurrency(exp.amount, false)}</td>
      `;
      newRow
        .querySelector('td[data-index]')
        .addEventListener('click', (event) => {
          const index = event.target.getAttribute('data-index');
          showModal(index);
        });
      tableBody.appendChild(newRow);
    });
  }

  updateRowBorders();
  updatePaginationInfo(expenses.length);
};

const updateRowBorders = () => {
  const rows = document.querySelectorAll('#expenses-table-body tr');
  rows.forEach((row, index) => {
    if (index === rows.length - 1) {
      row.classList.remove('border-b');
    } else {
      row.classList.add('border-b');
    }
  });
};

export const updatePaginationInfo = (totalItems) => {
  const pageInfo = document.getElementById('page-info');
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  document.getElementById('prev-page').disabled = currentPage === 1;
  document.getElementById('next-page').disabled = currentPage === totalPages;
};

export const prevPage = () => {
  if (currentPage > 1) {
    currentPage--;
    loadExpenses();
  }
};

export const nextPage = () => {
  const totalPages = Math.ceil(getExpenses().length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    loadExpenses();
  }
};

export const deleteExpense = (index) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
  }).then((result) => {
    if (result.isConfirmed) {
      const expenses = getExpenses();
      expenses.splice(index, 1);
      setExpenses(expenses);
      updateTotals();
      loadExpenses();
      Swal.fire('Deleted!', 'Your expense has been deleted.', 'success');
    }
  });
};

export const deleteExpenseFromModal = () => {
  if (currentExpenseIndex !== null) {
    deleteExpense(currentExpenseIndex);
    closeModal();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const datetimeInput = document.getElementById('datetime');

  const updateDatetime = () => {
    const now = new Date();
    const localDatetime = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 19);
    datetimeInput.value = localDatetime;
  };

  setInterval(updateDatetime, 1000);

  document
    .getElementById('toggle-form-button')
    .addEventListener('click', () => {
      const form = document.querySelector('add-expense-form');
      form.classList.toggle('hidden');
      if (!form.classList.contains('hidden')) {
        updateDatetime();
      }
      resetData();
      refreshData();
    });

  document
    .getElementById('toggle-filter-button')
    .addEventListener('click', () => {
      const filter = document.querySelector('filter-form');
      filter.classList.toggle('hidden');
      resetData();
      refreshData();
    });

  updateTotals();
  loadExpenses();
});

export const downloadData = () => {
  try {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
    Swal.fire('Success', 'Data downloaded successfully', 'success');
  } catch (error) {
    console.error('Error downloading data:', error);
    Swal.fire(
      'Error',
      'An error occurred while downloading the data. Please try again.',
      'error'
    );
  }
};

export const loadData = (event) => {
  try {
    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      for (const key in data) {
        localStorage.setItem(key, data[key]);
      }
      updateTotals();
      loadExpenses();
    };
    reader.readAsText(file);
    Swal.fire('Success', 'Data loaded successfully', 'success');
  } catch (error) {
    console.error('Error loading data:', error);
    Swal.fire(
      'Error',
      'An error occurred while loading the data. Please try again.',
      'error'
    );
  }
};

export const filterData = () => {
  try {
    const selectedYear = document.getElementById('year').value;
    const selectedMonth = document.getElementById('month').value;

    if (selectedYear === '' || selectedMonth === '') {
      Swal.fire('Error', 'Select year and month to filter data', 'error');
      return;
    }

    const filteredExpenses = getExpenses().filter((expense) => {
      const expenseDate = new Date(expense.datetime);
      const expenseYear = expenseDate.getFullYear();
      const expenseMonth = expenseDate.getMonth() + 1;

      return (
        (selectedYear === '' || expenseYear == selectedYear) &&
        (selectedMonth === '' || expenseMonth == selectedMonth)
      );
    });

    const tableBody = document.getElementById('expenses-table-body');
    tableBody.innerHTML = '';

    if (filteredExpenses.length === 0) {
      const noDataRow = document.createElement('tr');
      noDataRow.innerHTML = `<td colspan="3" class="text-center py-4">Data not found</td>`;
      tableBody.appendChild(noDataRow);
    } else {
      filteredExpenses.forEach((exp, index) => {
        const localDatetime = formatDate(exp.datetime);
        const trimmedDescription =
          exp.description.length > 10
            ? `${exp.description.substring(0, 10)}...`
            : exp.description;

        const newRow = document.createElement('tr');
        newRow.classList.add('hover:bg-gray-50');
        newRow.innerHTML = `
          <td class="px-4 py-2 cursor-pointer" data-index="${index}">${localDatetime}</td>
          <td class="px-4 py-2 underline text-underline">${trimmedDescription}</td>
          <td class="px-4 py-2">${formatCurrency(exp.amount)}</td>
        `;
        newRow
          .querySelector('td[data-index]')
          .addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            deleteExpense(index);
          });
        tableBody.appendChild(newRow);
      });
    }

    updateRowBorders();
    Swal.fire('Success', `${filteredExpenses.length} data found`, 'success');
  } catch (error) {
    console.error('Error filtering data:', error);
    Swal.fire(
      'Error',
      'An error occurred while filtering the data. Please try again.',
      'error'
    );
  }
};

export const refreshData = () => {
  document.getElementById('year').value = '';
  document.getElementById('month').value = '';
  sortTableByDate();
  loadExpenses();
  updateTotals();
};

export const resetData = () => {
  currentPage = 1;
  sortOrder = 'asc';
  loadExpenses();
  updateTotals();
};

export const showModal = (index) => {
  const expense = getExpenses()[index];
  currentExpenseIndex = index;

  document.getElementById('modal-date').innerHTML =
    `<strong>Date:</strong><br>${formatDateTime(expense.datetime)}`;
  document.getElementById('modal-description').innerHTML =
    `<strong>Description:</strong><br>${expense.description}`;
  document.getElementById('modal-amount').innerHTML =
    `<strong>Amount: </strong><br>${formatCurrency(expense.amount)}`;

  document.getElementById('expense-modal').classList.remove('hidden');
};

export const closeModal = () => {
  document.getElementById('expense-modal').classList.add('hidden');
  currentExpenseIndex = null;
};

export default function app() {
  updateTotals();
  loadExpenses();
}
