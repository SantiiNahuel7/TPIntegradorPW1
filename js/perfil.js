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


  const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
  btnCerrarSesion.addEventListener('click', () => {
  
    localStorage.removeItem('usuarioLogueado');
    
    alert('¡Sesión cerrada con éxito!');
    
    window.location.href = '../../index.html'; 
  });

  
  const btnEliminarCuenta = document.getElementById('btn-eliminar-cuenta');
  btnEliminarCuenta.addEventListener('click', () => {
    
    
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar tu cuenta permanentemente? Esta acción no se puede deshacer.');

    if (confirmacion) {
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

      const usuariosActualizados = usuarios.filter(user => user.email !== usuarioLogueado.email);

  
      localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));

      localStorage.removeItem('usuarioLogueado');

      alert('Tu cuenta ha sido eliminada exitosamente.');
      window.location.href = '../../index.html'; 
    }
  });

});
