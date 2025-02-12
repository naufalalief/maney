import "../style/output.css";
import "../components/index.js";
import * as script from "./script.js";

document.addEventListener("DOMContentLoaded", () => {
  script.default(); // Memanggil fungsi app
  Object.assign(window, script); // Menambahkan semua ekspor dari script.js ke konteks global
});
