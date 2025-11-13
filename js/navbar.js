export class Navbar {
  constructor() {}

  render() {
    const navbarContainer = document.querySelector(".js-navbar");

    const template = `
      <nav class="barra-superior">
        <div class="usuario-iniciado">
          <a href="/TPIntegradorPW1/html/Login/login.html">
            <i class="fa-regular fa-user"></i>
            <span>Acceder</span>
          </a>
        </div>

        <div class="logo-contenedor">
          <a href="index.html" class="logo-link">
            <img src="/TPIntegradorPW1/Imagenes/Logos/logo5.png" alt="Logo" class="logo">
          </a>
        </div>

        <a class="carrito" href="/TPIntegradorPW1/html/carrito.html">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="contador">0</span>
        </a>

    <form class="barra-busqueda">
  <div class="barra-boton">
    <div class="input-wrapper">
      <input type="text" id="search-input" placeholder="Buscar...">
      <div id="autocomplete-list"></div>
    </div>
    <button class="lupa" id="search-button" type="button">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
  </div>

  <div id="search-results"></div>
</form>
      </nav>

      <nav class="menu-principal">
        <div class="menu-principal-container">
          <ul class="js-menu-items"></ul>
        </div>
      </nav>
    `;

    navbarContainer.innerHTML = template;
  }

  renderMenu(items) {
    const listContainer = document.querySelector(".js-menu-items");
    if (!listContainer) return;

    items.forEach(item => {
      listContainer.innerHTML += `<li><a href="${item.link}">${item.text}</a></li>`;
    });
  }
}