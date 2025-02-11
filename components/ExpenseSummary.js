class ExpenseSummary extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col space-y-4 mb-4 border border-gray-300 p-4 rounded-lg bg-white shadow-md">
        <div class="text-lg font-semibold">
          <h4>
            Total expenses this month: <span id="total-expenses">0</span>
          </h4>
          <h4>
            Total expenses this year: <span id="total-all-expenses">0</span>
          </h4>
        </div>
        <div>
        <button id="toggle-form-button" class="bg-[#493628] text-white px-4 py-2 rounded font-medium">Expense Form</button>
        <button id="toggle-filter-button" class="bg-[#493628] text-white px-4 py-2 rounded font-medium ml-2">Filter</button>
        </div>
      </div>
    `;
  }
}

customElements.define("expense-summary", ExpenseSummary);
