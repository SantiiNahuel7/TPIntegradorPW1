document.addEventListener('DOMContentLoaded', () => {

    const totalMontoSpan = document.getElementById('total-monto');
    const pagoForm = document.getElementById('pago-form');
    const btnCancelar = document.getElementById('btn-cancelar');
    const mesSelect = document.getElementById('mes-vencimiento');
    const anioSelect = document.getElementById('anio-vencimiento');
    const DIALOG_LOGIN_CUENTA = document.getElementById("dialog-login-requerido-cuenta");
    const BTN_IR_LOGIN_CUENTA = document.getElementById("dialogo-cuenta-login");
    const DIALOG_PAGO_EXITOSO = document.getElementById("dialog-pago-exitoso");
    const BTN_IR_INICIO = document.getElementById("btn-ir-inicio");
    const inputNumTarjeta = document.getElementById('numero-tarjeta');
    const inputCVC = document.getElementById('cvc');
    const inputDNI = document.getElementById('dni-titular');

    function getUsuarioLogueado() {
        const usuarioJSON = localStorage.getItem('usuarioLogueado');
        return usuarioJSON ? JSON.parse(usuarioJSON) : null;
    }
    function getUsuarios() {
        const usuariosJSON = localStorage.getItem('usuarios');
        return usuariosJSON ? JSON.parse(usuariosJSON) : [];
    }
    function guardarUsuarios(listaUsuarios) {
        localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
    }
    function guardarUsuarioLogueado(usuario) {
        localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
    }

    function verificarSesion() {
        const usuario = getUsuarioLogueado();
        if (!usuario) {
            const formContainer = document.querySelector('.pago-form');
            if (formContainer) formContainer.style.display = 'none'; 
            DIALOG_LOGIN_CUENTA.classList.remove("ocultar");
            DIALOG_LOGIN_CUENTA.showModal();
            BTN_IR_LOGIN_CUENTA.onclick = () => window.location.href = './login.html'; 
            return false;
        }
        return usuario;
    }

    function inicializarPagina(usuario) {
        if (!usuario || !usuario.carrito || usuario.carrito.length === 0) {
            totalMontoSpan.textContent = "$0.00";
            alert("Tu carrito está vacío. Serás redirigido.");
            window.location.href = './carrito.html'; 
            return;
        }
        let total = 0;
        usuario.carrito.forEach(item => { total += item.precio; });
        totalMontoSpan.textContent = `$${total.toFixed(2)}`;
        for (let i = 1; i <= 12; i++) {
            const mes = i.toString().padStart(2, '0');
            mesSelect.innerHTML += `<option value="${mes}">${mes}</option>`;
        }
        const anioActual = new Date().getFullYear();
        for (let i = 0; i < 10; i++) {
            const anio = anioActual + i;
            anioSelect.innerHTML += `<option value="${anio}">${anio}</option>`;
        }
    }

    function procesarCompra(usuario) {
        const itemsComprados = usuario.carrito || [];
        const cursosActuales = usuario.cursosAdquiridos || [];
        const cursosCombinados = [...cursosActuales, ...itemsComprados];
        usuario.cursosAdquiridos = cursosCombinados; 
        usuario.carrito = []; 
        guardarUsuarioLogueado(usuario);
        const listaUsuarios = getUsuarios();
        const indiceUsuario = listaUsuarios.findIndex(user => user.email === usuario.email);
        if (indiceUsuario !== -1) {
            listaUsuarios[indiceUsuario].carrito = [];
            listaUsuarios[indiceUsuario].cursosAdquiridos = cursosCombinados;
            guardarUsuarios(listaUsuarios);
        }
    }

    function validarFormulario() {
        const inputs = pagoForm.querySelectorAll('input[required], select[required]');
        for (const input of inputs) {
            if (!input.value) {
                alert(`Por favor, completa el campo: ${input.previousElementSibling?.textContent || input.id}`);
                input.focus();
                return false;
            }
        }
        const numTarjeta = inputNumTarjeta.value;
        if (!/^[0-9\s]{19,20}$/.test(numTarjeta)) { 
            alert("El número de tarjeta no es válido.");
            return false;
        }
        return true;
    }

    inputNumTarjeta.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, ''); 
        let grupos = valor.match(/.{1,4}/g);
        if (grupos) { e.target.value = grupos.join(' '); } else { e.target.value = ''; }
    });
    inputCVC.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });
    inputDNI.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });

    pagoForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        const usuario = getUsuarioLogueado();
        if (!usuario) return; 

        if (validarFormulario()) {
            
            procesarCompra(usuario);
            DIALOG_PAGO_EXITOSO.classList.remove('ocultar');
            DIALOG_PAGO_EXITOSO.showModal();
        }
    });

    BTN_IR_INICIO.addEventListener('click', () => {
        DIALOG_PAGO_EXITOSO.close();
        window.location.href = '../../index.html';
    });

    btnCancelar.addEventListener('click', () => {
        if (confirm("¿Estás seguro de que deseas cancelar el pago y volver al carrito?")) {
            window.location.href = './carrito.html'; 
        }
    });

    const usuarioActual = verificarSesion();
    if (usuarioActual) {
        inicializarPagina(usuarioActual);
    }
});