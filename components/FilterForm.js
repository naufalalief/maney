class FilterForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex space-y-4 mb-4 flex-col border border-gray-300 p-4 rounded bg-white shadow-md">
        <div>
          <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
          <select id="year" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
            <option value="">Select Year</option>
          </select>
        </div>
        <div>
          <label for="month" class="block text-sm font-medium text-gray-700">Month</label>
          <select id="month" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
            <option value="">Select Month</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button onclick="filterData()" class="bg-[#493628] font-medium text-white px-4 py-2 rounded">Filter</button>
        </div>
      </div>
    `;
  }
}

customElements.define("filter-form", FilterForm);
