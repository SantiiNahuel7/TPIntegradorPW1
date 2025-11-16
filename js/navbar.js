export class Navbar {
  constructor() {}

  render() {
    const navbarContainer = document.querySelector(".js-navbar");

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

    let cartCount = 0;

    if (usuarioLogueado && usuarioLogueado.carrito) {
      cartCount = usuarioLogueado.carrito.length;
    }

    let usuarioHtml = ''; 

    if (usuarioLogueado) {
    
      usuarioHtml = `
        <div class="usuario-iniciado">
          <a href="../html/perfil.html" title="Ver Perfil"> 
            <i class="fa-solid fa-user-check"></i>
            <span>Hola, ${usuarioLogueado.nombre}</span>
          </a>
        </div>
      `;
    } else {
      usuarioHtml = `
        <div class="usuario-iniciado">
          <a href="../html/login.html"> 
            <i class="fa-regular fa-user"></i>
            <span>Acceder</span>
          </a>
        </div>
      `;
    }

    const template = `
      <nav class="barra-superior">
        ${usuarioHtml} 

        <div class="logo-contenedor">
          <a href="../index.html" class="logo-link">
            <img src="../Imagenes/Logos/logo5.png" alt="Logo" class="logo">
          </a>
        </div>

        <a class="carrito" href="../html/carrito.html">
          <i class="fa-solid fa-cart-shopping"></i>
          
          <span class="contador">${cartCount}</span>

        </a>

        <form action="../html/Detalle de Curos/detalle-curso.html" method="get" class="barra-busqueda">
          <input list="cursos" name="curso" type="text" placeholder="Buscar...">
          <datalist id="cursos">
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
            <option value="java">Java</option>
            <option value="sql">SQL</option>
            <option value="uxui">UX/UI</option>
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