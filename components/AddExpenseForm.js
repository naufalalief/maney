class AddExpenseForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex space-y-4 mb-4 flex-col border border-gray-300 p-4 rounded bg-white shadow-md">
        <div>
          <label for="datetime" class="block text-sm font-medium text-gray-700">Date and Time</label>
          <input type="datetime-local" id="datetime" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" disabled>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" placeholder="What did you spend on?" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" rows="2"></textarea>
        </div>
        <div>
          <div class="flex flex-col">
            <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
            <input type="number" pattern="[0-9.,]" id="amount" placeholder="The amount of money you spent" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
            <div class="flex justify-between items-center">
              <label class="block text-sm font-medium text-gray-700">Multiplier</label>
              <div class="flex justify-end items-center" id="multiplier">
                <button id="x100-button" class="text-sm cursor-pointer text-[#493628] px-2 py-1 rounded">x100</button>
                <button id="x1000-button" class="text-sm cursor-pointer text-[#493628] px-2 py-1 rounded">x1000</button>
              </div>
            </div>
          </div>
        </div>
        <button onclick="addExpense()" class="bg-[#493628] font-medium text-white px-4 py-2 rounded">Add Expense</button>
      </div>
    `;

    this.querySelector('#x100-button').addEventListener('click', () => {
      const amountInput = this.querySelector('#amount');
      amountInput.value = (parseFloat(amountInput.value) || 0) * 100;
    });

    this.querySelector('#x1000-button').addEventListener('click', () => {
      const amountInput = this.querySelector('#amount');
      amountInput.value = (parseFloat(amountInput.value) || 0) * 1000;
    });
  }
}

customElements.define('add-expense-form', AddExpenseForm);
