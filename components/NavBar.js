class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="bg-[#AB886D] shadow-md">
        <div class="container mx-auto">
          <div class="flex justify-between items-center p-4">
            <div>
              <h1 class="text-2xl font-bold text-[#493628]">Maney</h1>
            </div>
            <div class="relative">
              <button id="toggle-button" data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
              </button>
              <div id="navbar-default" class="hidden md:flex absolute md:static right-0 top-[150%] md:top-auto lg:hidden md:lg:flex">
                <div class="flex bg-[#AB886D] w-max flex-grow border border-gray-300 p-4 rounded md:border-none md:p-0 md:bg-transparent">
                  <button onclick="downloadData()" class="bg-[#493628] text-white px-4 py-2 rounded font-medium w-full whitespace-nowrap md:w-auto md:ml-2">Download Data</button>
                  <input type="file" id="file-input" class="hidden" accept=".json" onchange="loadData(event)">
                  <button onclick="document.getElementById('file-input').click()" class="bg-[#493628] text-white px-4 py-2 rounded font-medium ml-2 w-full md:w-auto md:ml-2">Load Data</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;

    this.querySelector("#toggle-button").addEventListener("click", () => {
      const navbarDefault = this.querySelector("#navbar-default");
      navbarDefault.classList.toggle("hidden");
    });
  }
}

customElements.define("nav-bar", NavBar);
