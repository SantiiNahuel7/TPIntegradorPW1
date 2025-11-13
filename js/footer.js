export class Footer {
  constructor() {}

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
            <li><a href="/TPIntegradorPW1/index.html">Inicio</a></li>
            <li><a href="/TPIntegradorPW1/html/cursos.html">Cursos</a></li>
            <li><a href="/TPIntegradorPW1/html/contacto.html">Contacto</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h3>Redes Sociales</h3>
          <div class="redes">
            <a href="https://www.facebook.com/" target="_blank"><img src="/TPIntegradorPW1/Imagenes/icono-redes/facebook.png"></a>
            <a href="https://www.instagram.com/" target="_blank"><img src="/TPIntegradorPW1/Imagenes/icono-redes/instagram.png"></a>
            <a href="https://www.youtube.com/" target="_blank"><img src="/TPIntegradorPW1/Imagenes/icono-redes/youtube.png"></a>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = template;
  }
}