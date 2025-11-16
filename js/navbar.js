export class Navbar {
  constructor() {}

  render() {
    const navbarContainer = document.querySelector(".js-navbar");

    const template = `
      <nav class="barra-superior">
        <div class="usuario-iniciado">
          <a href="../html/Login/login.html">
            <i class="fa-regular fa-user"></i>
            <span>Acceder</span>
          </a>
        </div>

        <div class="logo-contenedor">
          <a href="../index.html" class="logo-link">
            <img src="../Imagenes/Logos/logo5.png" alt="Logo" class="logo">
          </a>
        </div>

        <a class="carrito" href="../html/carrito.html">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="contador">0</span>
        </a>

        <form action="./html/Detalle de Cursos/detalleCursoHtml.html" method="get" class="barra-busqueda">
          <input list="cursos" name="curso" type="text" placeholder="Buscar...">
          <datalist id="cursos">
            <option value="HTML"></option>
            <option value="CSS"></option>
            <option value="JavaScript"></option>
            <option value="Java"></option>
            <option value="SQL"></option>
            <option value="UX/UI"></option>
          </datalist>
          <button class="lupa" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
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