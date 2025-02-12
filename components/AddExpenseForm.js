class AddExpenseForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex space-y-4 mb-4 flex-col border border-gray-300 p-4 rounded bg-white shadow-md">
        <div>
          <label for="datetime" class="block text-sm font-medium text-gray-700">Date and Time</label>
          <input type="datetime-local" id="datetime" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" readonly>
        </div>
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
          <input type="number" id="amount" placeholder="Enter amount" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <input type="text" id="description" placeholder="Enter description" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
        </div>
        <div class="flex justify-end">
          <button onclick="addExpense()" class="bg-[#493628] font-medium text-white px-4 py-2 rounded w-full">Add Expense</button>
        </div>
      </div>
    `;
  }
}

customElements.define("add-expense-form", AddExpenseForm);
