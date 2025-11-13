import { Navbar } from "./navbar.js";
import { Footer } from "./footer.js";
import { MENU_ITEMS } from "./menu.js";
import { initSearch } from "./barraDeBusqueda.js"; // ✅ Importar la función

document.addEventListener("DOMContentLoaded", () => {
  // Renderiza el header
  const navbar = new Navbar();
  navbar.render();
  navbar.renderMenu(MENU_ITEMS);

  // ✅ Inicializa la barra de búsqueda (después de renderizar la navbar)
  initSearch();

  // Renderiza el footer
  const footer = new Footer();
  footer.render();
});