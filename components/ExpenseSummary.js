class ExpenseSummary extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col space-y-4 mb-4 border border-gray-300 p-4 rounded-lg bg-white shadow-md">
        <div class="text-lg font-semibold text-gray-700">
          <h2 class="text-xl md:text-2xl mb-4">Expense Summary</h2>
          <div class="flex flex-col space-y-4">
            <div>
              <p class="text-sm md:text-base">Total Expenses This Month</p>
              <p class="text-lg md:text-2xl font-semibold text-[#493628]"><span id="total-expenses-month">0</span></p>
            </div>
            <div>
              <p class="text-sm md:text-base">Total Expenses This Year</p>
              <p class="text-lg md:text-2xl font-semibold text-[#493628]"><span id="total-expenses-year">0</span></p>
            </div>
            <div>
              <p class="text-sm md:text-base">Total All Expenses</p>
              <p class="text-lg md:text-2xl font-semibold text-[#493628]"><span id="total-expenses">0</span></p>
            </div>
          </div>
        </div>
        <div class="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
          <button id="toggle-form-button" class="bg-[#493628] text-white px-4 py-2 rounded font-medium">Expense Form</button>
          <button id="toggle-filter-button" class="bg-[#493628] text-white px-4 py-2 rounded font-medium">Filter</button>
        </div>
      </div>
    `;
  }
}

customElements.define('expense-summary', ExpenseSummary);
