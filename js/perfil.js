document.addEventListener('DOMContentLoaded', () => {

  // 1. OBTENER EL USUARIO LOGUEADO
  const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));

  // 2. VERIFICACIÓN DE SEGURIDAD
  // Si no hay nadie logueado, no debería estar en esta página.
  // Lo redirigimos al login.
  if (!usuarioLogueado) {
    alert('Debes iniciar sesión para ver tu perfil.');
    // Asumiendo que 'login.html' está en la misma carpeta que 'perfil.html'
    window.location.href = 'login.html';
    return; // Detiene la ejecución del script
  }

  // 3. CARGAR DATOS EN LA PÁGINA
  // Usamos los IDs del HTML para poner la información
  document.getElementById('perfil-nombre').textContent = usuarioLogueado.nombre;
  document.getElementById('perfil-apellido').textContent = usuarioLogueado.apellido;
  document.getElementById('perfil-usuario').textContent = usuarioLogueado.usuario;
  document.getElementById('perfil-email').textContent = usuarioLogueado.email;

  // 4. LÓGICA DE "CERRAR SESIÓN"
  const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
  btnCerrarSesion.addEventListener('click', () => {
    // Simplemente borra al usuario logueado de localStorage
    localStorage.removeItem('usuarioLogueado');
    
    alert('¡Sesión cerrada con éxito!');
    // Redirige al inicio (ajusta la ruta si es necesario)
    window.location.href = '../../index.html'; 
  });

  // 5. LÓGICA DE "ELIMINAR CUENTA"
  const btnEliminarCuenta = document.getElementById('btn-eliminar-cuenta');
  btnEliminarCuenta.addEventListener('click', () => {
    
    // Pide confirmación, ¡esto es importante!
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.');

    if (confirmacion) {
      // Si el usuario acepta...

      // a. Trae la lista COMPLETA de usuarios
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      // b. Filtra la lista, quitando al usuario actual
      // (Usamos el email como identificador único)
      const usuariosActualizados = usuarios.filter(user => user.email !== usuarioLogueado.email);

      // c. Guarda la lista actualizada (sin el usuario) de vuelta
      localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));

      // d. Cierra la sesión (borra el 'usuarioLogueado')
      localStorage.removeItem('usuarioLogueado');

      // e. Avisa y redirige
      alert('Tu cuenta ha sido eliminada exitosamente.');
      window.location.href = '../../index.html'; // Redirige al inicio
    }
    // Si no confirma, no hace nada.
  });

});
//--- FIN: perfil.js (Archivo Nuevo) ---