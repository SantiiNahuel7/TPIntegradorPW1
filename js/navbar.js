export class Navbar {
  constructor() {
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const depth = pathParts.length - 2;
    this.base = "../".repeat(depth);
  }

  render() {
    const navbarContainer = document.querySelector(".js-navbar");

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    const template = `
      <nav class="barra-superior">
        <div class="usuario-iniciado">
          ${
            usuarioActivo
              ? `
                <div class="usuario-logueado">
                  <div class="usuario-icono">
                    <i class="fa-regular fa-user"></i>
                    <span>Hola, ${usuarioActivo.nombre}</span>
                  </div>
                  <button id="logout" class="btn-logout">Cerrar sesión</button>
                </div>
              `
              : `
                <a href="${this.base}html/Login/login.html">
                  <i class="fa-regular fa-user"></i>
                  <span class="acceder">Acceder</span>
                </a>
              `
          }
        </div>

        <div class="logo-contenedor">
          <a href="${this.base}index.html" class="logo-link">
            <img src="${this.base}Imagenes/Logos/logo5.png" alt="Logo" class="logo">
          </a>
        </div>

        <a class="carrito" href="${this.base}html/carrito.html">
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

    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        window.location.reload();
      });
    }
  }

  renderMenu(items) {
    const listContainer = document.querySelector(".js-menu-items");
    if (!listContainer) return;

    items.forEach((item) => {
      listContainer.innerHTML += `<li><a href="${this.base}${item.link}">${item.text}</a></li>`;
    });
  }
}
