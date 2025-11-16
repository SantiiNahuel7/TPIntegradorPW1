document.addEventListener('DOMContentLoaded', () => {

    const formulario = document.querySelector('form');

    // 1. Seleccionar TODOS los campos de input
    const inputNombre = document.getElementById('nombre');
    const inputApellido = document.getElementById('apellido');
    const inputUsuario = document.getElementById('usuario');
    const inputEmail = document.getElementById('email');
    const inputPass = document.getElementById('pass');
    const inputPassReply = document.getElementById('passreply');

    // 2. Seleccionar TODOS los elementos de texto para errores
    const errorNombre = document.getElementById('error-nombre');
    const errorApellido = document.getElementById('error-apellido');
    const errorUsuario = document.getElementById('error-usuario');
    const errorEmail = document.getElementById('error-email');
    const errorPass = document.getElementById('error-pass');
    const errorPassReply = document.getElementById('error-passreply');

    // 3. Seleccionar el nuevo Diálogo y su botón
    const successDialog = document.getElementById('success-dialog');
    const btnIrHome = document.getElementById('btn-ir-home');

    // 4. Crear una función para limpiar errores al escribir
    const inputs = [inputNombre, inputApellido, inputUsuario, inputEmail, inputPass, inputPassReply];
    const errores = [errorNombre, errorApellido, errorUsuario, errorEmail, errorPass, errorPassReply];

    inputs.forEach((input, index) => {
        input.addEventListener('input', () => {
            errores[index].textContent = '';
        });
    });

    // 5. Escuchador del 'submit' del formulario
    formulario.addEventListener('submit', (evento) => {
        
        evento.preventDefault(); 
        let esValido = true; 

        errores.forEach(error => error.textContent = '');

        // 6. Validaciones (como las tenías)
        if (inputNombre.validity.valueMissing) {
            errorNombre.textContent = 'El nombre es obligatorio.';
            esValido = false;
        }
        if (inputApellido.validity.valueMissing) {
            errorApellido.textContent = 'El apellido es obligatorio.';
            esValido = false;
        }
        if (inputUsuario.validity.valueMissing) {
            errorUsuario.textContent = 'El usuario es obligatorio.';
            esValido = false;
        }
        if (inputPass.validity.valueMissing) {
            errorPass.textContent = 'La contraseña es obligatoria.';
            esValido = false;
        }
        if (inputEmail.validity.valueMissing) {
            errorEmail.textContent = 'El email es obligatorio.';
            esValido = false;
        } else if (inputEmail.validity.typeMismatch) {
            errorEmail.textContent = 'Por favor, ingresa un formato de email válido (ej: tu@correo.com).';
            esValido = false;
        }
        if (inputPassReply.validity.valueMissing) {
            errorPassReply.textContent = 'Debes repetir la contraseña.';
            esValido = false;
        } else if (inputPass.value !== inputPassReply.value) {
            errorPassReply.textContent = 'Las contraseñas no coinciden.';
            esValido = false;
        }

        if (esValido) {
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const email = inputEmail.value;
            const usuarioExistente = usuarios.find(u => u.email === email);

            if (usuarioExistente) {
                errorEmail.textContent = 'El email ya está registrado. Por favor, usa otro.';
                esValido = false;
            }
        }

        // 7. Si NADA falló...
        if (esValido) {
            const nuevoUsuario = {
                nombre: inputNombre.value,
                apellido: inputApellido.value,
                usuario: inputUsuario.value,
                email: inputEmail.value,
                pass: inputPass.value
            };
            
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // --- CAMBIO PRINCIPAL AQUÍ ---
            // En lugar de alert() y redirigir...
            // Mostramos el diálogo modal.
            successDialog.showModal();
            // --- FIN DEL CAMBIO ---
        }
    });

    // 8. Añadir evento al botón del diálogo
    btnIrHome.addEventListener('click', () => {
        // Cierra el diálogo (opcional, ya que redirige)
        successDialog.close();
        // Redirige al Home (ajusta la ruta si es necesario)
        window.location.href = '../../index.html';
    });
});