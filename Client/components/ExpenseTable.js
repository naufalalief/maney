class ExpenseTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="overflow-x-auto rounded shadow-md">
        <table class="min-w-full bg-white border border-gray-300 rounded">
          <thead class="bg-[#AB886D]">
            <tr>
              <th class="px-4 py-2 w-1/3 text-left" onclick="sortTableByDate()">Date</th> 
              <th class="px-4 py-2 w-1/3 text-left">Description</th>
              <th class="px-4 py-2 w-1/3 text-left cursor-pointer" onclick="sortTable()">Rp.</th>
            </tr>
          </thead>
          <tbody id="expenses-table-body">
          </tbody>
        </table>
      </div>
      <div class="flex justify-between items-center mt-4">
        <button id="prev-page" class="px-4 py-2 bg-[#493628] text-white rounded" onclick="prevPage()">Prev</button>
        <span id="page-info" class="text-gray-700"></span>
        <button id="next-page" class="px-4 py-2 bg-[#493628] text-white rounded" onclick="nextPage()">Next</button>
      </div>
      <!-- Modal -->
      <div id="expense-modal" class="hidden fixed inset-0 bg-black/75 flex items-center justify-center">
        <div class="bg-white p-4 rounded shadow-lg w-full max-w-full m-4 max-h-full">
          <h2 class="text-xl font-bold mb-4 border-b border-[#E4E0E1]">Expense Details</h2>
          <div class="space-y-2 border-b border-[#E4E0E1] mb-4">
            <p id="modal-date"></p>
            <p id="modal-description"></p>
            <p id="modal-amount"></p>
          </div>
          <div class="flex justify-end space-x-2">
            <button onclick="deleteExpenseFromModal()" class="mt-4 px-4 py-2 bg-[#E4E0E1] text-[#493628] font-medium rounded">Delete</button>
            <button onclick="closeModal()" class="mt-4 px-4 py-2 bg-[#493628] text-white rounded font-medium">Close</button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('expense-table', ExpenseTable);
