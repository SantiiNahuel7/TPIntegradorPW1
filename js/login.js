document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.querySelector('.seccion-login form');
    
    // 1. Seleccionar los campos de input
    const inputUsuario = document.getElementById('usuario');
    const inputPassword = document.getElementById('password');

    // 2. Seleccionar los elementos de texto para errores
    const errorUsuario = document.getElementById('error-usuario');
    const errorPassword = document.getElementById('error-password');

    // 3. Limpiar errores al empezar a escribir
    inputUsuario.addEventListener('input', () => {
        errorUsuario.textContent = '';
    });
    inputPassword.addEventListener('input', () => {
        errorPassword.textContent = '';
    });

    // 4. Escuchador del 'submit'
    loginForm.addEventListener('submit', (evento) => {
        evento.preventDefault();

        // 5. Limpiar errores antiguos antes de validar
        errorUsuario.textContent = '';
        errorPassword.textContent = '';

        const usuarioInput = inputUsuario.value;
        const passwordInput = inputPassword.value;
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(user => 
            (user.email === usuarioInput || user.usuario === usuarioInput)
        );

        // 6. Validaciones con texto de error
        if (!usuarioEncontrado) {
            errorUsuario.textContent = 'Usuario o email no encontrado.';
            return; 
        }

        if (usuarioEncontrado.pass !== passwordInput) {
            errorPassword.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
            return;
        }
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
        window.location.href = loginForm.action; // Redirige directamente
    });
});