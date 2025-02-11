class ExpenseTable extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="rounded shadow-md">
        <table class="min-w-full bg-white border border-gray-300 rounded">
          <thead class="bg-[#AB886D]">
            <tr>
              <th class="px-4 py-2 text-left">Date</th>
              <th class="px-4 py-2 text-left">Description</th>
              <th class="px-4 py-2 text-left cursor-pointer" onclick="sortTable()">Amount</th>
            </tr>
          </thead>
          <tbody id="expenses-table-body">
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define("expense-table", ExpenseTable);
