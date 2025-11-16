document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.querySelector('.seccion-login form');
    

    const inputUsuario = document.getElementById('usuario');
    const inputPassword = document.getElementById('password');

    
    const errorUsuario = document.getElementById('error-usuario');
    const errorPassword = document.getElementById('error-password');

   
    inputUsuario.addEventListener('input', () => {
        errorUsuario.textContent = '';
    });
    inputPassword.addEventListener('input', () => {
        errorPassword.textContent = '';
    });

    
    loginForm.addEventListener('submit', (evento) => {
        evento.preventDefault();

       
        errorUsuario.textContent = '';
        errorPassword.textContent = '';

        const usuarioInput = inputUsuario.value;
        const passwordInput = inputPassword.value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(user => 
            (user.email === usuarioInput || user.usuario === usuarioInput)
        );

       
        if (!usuarioEncontrado) {
            errorUsuario.textContent = 'Usuario o email no encontrado.';
            return; 
        }

        if (usuarioEncontrado.pass !== passwordInput) {
            errorPassword.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
            return;
        }
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
        window.location.href = loginForm.action;
    });
});