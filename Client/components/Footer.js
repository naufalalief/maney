class FootCopy extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-[#AB886D] text-center text-[#493628] p-4 fixed bottom-0 w-full md:w-[768px]">
        <p>&copy; 2025 <span><a href="https://www.instagram.com/afalupanama/" target="__blank" class="font-bold">Maney</a></span></p>
      </footer>
    `;
  }
}

customElements.define('foot-copy', FootCopy);
