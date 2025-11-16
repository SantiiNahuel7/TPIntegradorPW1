document.addEventListener('DOMContentLoaded', () => {

const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

if (!usuarioLogueado) {
    alert('Debes iniciar sesión para ver tu perfil.');
    window.location.href = 'login.html'; 
    return; 
  }

  document.getElementById('perfil-nombre').textContent = usuarioLogueado.nombre;
  document.getElementById('perfil-apellido').textContent = usuarioLogueado.apellido;
  document.getElementById('perfil-usuario').textContent = usuarioLogueado.usuario;
  document.getElementById('perfil-email').textContent = usuarioLogueado.email;


  cargarCursosAdquiridos(usuarioLogueado);

  const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
  const dialogCerrarSesion = document.getElementById('dialog-cerrar-sesion');
  const btnConfirmarSesion = document.getElementById('btn-confirmar-sesion');
  const btnCancelarSesion = document.getElementById('btn-cancelar-sesion');


  const btnEliminarCuenta = document.getElementById('btn-eliminar-cuenta');
  const dialogEliminarCuenta = document.getElementById('dialog-eliminar-cuenta');
  const btnConfirmarEliminar = document.getElementById('btn-confirmar-eliminar');
  const btnCancelarEliminar = document.getElementById('btn-cancelar-eliminar');

  
  btnCerrarSesion.addEventListener('click', () => {
    dialogCerrarSesion.showModal(); 
  });

  btnCancelarSesion.addEventListener('click', () => {
    dialogCerrarSesion.close(); 
  });

  btnConfirmarSesion.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogueado');
    dialogCerrarSesion.close();
    window.location.href = '../../index.html'; 
  });

 
  btnEliminarCuenta.addEventListener('click', () => {
    dialogEliminarCuenta.showModal(); 
  });

  btnCancelarEliminar.addEventListener('click', () => {
    dialogEliminarCuenta.close(); 
  });

  btnConfirmarEliminar.addEventListener('click', () => {

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuariosActualizados = usuarios.filter(user => user.email !== usuarioLogueado.email);
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    localStorage.removeItem('usuarioLogueado');
    
    dialogEliminarCuenta.close();
    
    alert('Tu cuenta ha sido eliminada exitosamente.');
    window.location.href = '../../index.html'; 
  });

});

function cargarCursosAdquiridos(usuario) {
 const container = document.getElementById('cursos-adquiridos-container');
 if (!container) {
   console.error("No se encontró el contenedor de cursos adquiridos.");
 return;
 }
 const itemsComprados = usuario.cursosAdquiridos || [];
const cursos = itemsComprados.filter(item => item.tipo !== 'giftcard');

  if (cursos.length === 0) {
    container.innerHTML = '<p class="cursos-vacios">Aún no has adquirido ningún curso.</p>';
  return;
}

  container.innerHTML = ''; 
  cursos.forEach(item => {
  let subTitulo = '';
  if (item.tipo === 'individual') {
    subTitulo = `<p class="curso-card-inscrito">Email: ${item.datosInscrito.email}</p>`;
    } else if (item.tipo === 'empresarial') {
    subTitulo = `<p class="curso-card-inscrito">Para: ${item.datosInscrito.nombre} ${item.datosInscrito.apellido}</p>`;
}

const itemHtml = `
  <article class="curso-adquirido-card">
    <img src="${item.imagen}" alt="${item.nombre}" class="curso-card-imagen">
        <div class="curso-card-info">
          <h3 class="curso-card-titulo">${item.nombre}</h3>
          <span class="curso-card-precio">$${item.precio.toFixed(2)}</span>
          ${subTitulo}
        </div>
 </article>
 `;
  container.innerHTML += itemHtml;
 });
}