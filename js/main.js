import { Navbar } from "./navbar.js";
import { Footer } from "./footer.js";
import { MENU_ITEMS } from "./menu.js";

document.addEventListener("DOMContentLoaded", () => {
  // Renderiza el header
  const navbar = new Navbar();
  navbar.render();
  navbar.renderMenu(MENU_ITEMS);

  // Renderiza el footer
  const footer = new Footer();
  footer.render();
});