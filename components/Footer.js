class FootCopy extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="bg-[#AB886D] text-center text-white p-4 fixed bottom-0 w-full">
        <p>&copy; 2025 <span><a href="https://www.instagram.com/afalupanama/" target="__blank">Maney</a></span></p>
      </footer>
    `;
  }
}

customElements.define("foot-copy", FootCopy);
