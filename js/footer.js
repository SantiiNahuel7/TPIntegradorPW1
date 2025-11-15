export class Footer {
  constructor() {
    // Detectar profundidad igual que en la Navbar
    const pathParts = window.location.pathname.split("/").filter(Boolean);
    const depth = pathParts.length - 2;
    this.base = "../".repeat(depth);
  }

  render() {
    const container = document.querySelector(".js-footer");

    const template = `
      <div class="footer-container">

        <div class="footer-col">
          <h3>Datos Del Grupo</h3>
          <ul>
            <li>Alan Ibañez</li>
            <li>Yamila Santillan</li>
            <li>Santiago Orellana</li>
            <li>Adrián Amarilla</li>
            <li>Jennifer Caceres</li>
          </ul>
        </div>

        <div class="footer-col">
          <h3>Menu Inferior</h3>
          <ul>
            <li><a href="${this.base}index.html">Inicio</a></li>
            <li><a href="${this.base}html/cursos.html">Cursos</a></li>
            <li><a href="${this.base}html/contacto.html">Contacto</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3>Redes Sociales</h3>
          <div class="redes">
            <a href="https://www.facebook.com/" target="_blank"><img src="${this.base}Imagenes/icono-redes/facebook.png"></a>
            <a href="https://www.instagram.com/" target="_blank"><img src="${this.base}Imagenes/icono-redes/instagram.png"></a>
            <a href="https://www.youtube.com/" target="_blank"><img src="${this.base}Imagenes/icono-redes/youtube.png"></a>
          </div>
        </div>

      </div>
    `;

    container.innerHTML = template;
  }
}
