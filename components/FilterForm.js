class FilterForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <form class="flex space-y-4 mb-4 flex-col border border-gray-300 p-4 rounded bg-white shadow-md" onsubmit="filterData(); return false;">
        <div>
          <label for="year" class="block text-sm font-medium text-gray-700">Year</label>
          <select id="year" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5">
            <option value="" disabled selected>Select Year</option>
          </select>
        </div>
        <div>
          <label for="month" class="block text-sm font-medium text-gray-700">Month</label>
          <select id="month" class="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5" disabled>
            <option value="" disabled selected>Select Month</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-[#493628] font-medium text-white px-4 py-2 rounded w-full">Filter</button>
        </div>
      </form>
    `;

    this.populateYearOptions();
    this.querySelector('#year').addEventListener(
      'change',
      this.populateMonthOptions.bind(this)
    );
  }

  populateYearOptions() {
    const currentYear = new Date().getFullYear();
    const yearSelect = this.querySelector('#year');
    for (let year = currentYear; year >= 2025; year--) {
      const option = document.createElement('option');
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  }

  populateMonthOptions() {
    const yearSelect = this.querySelector('#year');
    const monthSelect = this.querySelector('#month');
    const selectedYear = parseInt(yearSelect.value);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    monthSelect.innerHTML =
      '<option value="" disabled selected>Select Month</option>';
    monthSelect.disabled = false;

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const maxMonth = selectedYear === currentYear ? currentMonth : 12;

    for (let i = 0; i < maxMonth; i++) {
      const option = document.createElement('option');
      option.value = i + 1;
      option.textContent = months[i];
      monthSelect.appendChild(option);
    }
  }
}

customElements.define('filter-form', FilterForm);
