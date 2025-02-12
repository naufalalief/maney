class ExpenseTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="overflow-x-auto rounded shadow-md">
        <table class="min-w-full bg-white border border-gray-300 rounded">
          <thead class="bg-[#AB886D]">
            <tr>
              <th class="px-4 py-2 w-1/3 text-left">Date</th> 
              <th class="px-4 py-2 w-1/3 text-left">Description</th>
              <th class="px-4 py-2 w-1/3 text-left cursor-pointer" onclick="sortTable()">Amount</th>
            </tr>
          </thead>
          <tbody id="expenses-table-body">
          </tbody>
        </table>
      </div>
      <!-- Modal -->
      <div id="expense-modal" class="hidden fixed inset-0 bg-black/75 flex items-center justify-center">
        <div class="bg-white p-4 rounded shadow-lg w-full max-w-full m-4 max-h-full">
          <h2 class="text-xl font-bold mb-4">Expense Details</h2>
          <p id="modal-date"></p>
          <p id="modal-description"></p>
          <p id="modal-amount"></p>
          <div class="flex justify-end">
            <button onclick="closeModal()" class="mt-4 px-4 py-2 bg-[#493628] text-white rounded ">Close</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("expense-table", ExpenseTable);
