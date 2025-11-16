document.addEventListener('DOMContentLoaded', () => {

    const itemsContainer = document.getElementById('carrito-items-container');
    const totalSpan = document.getElementById('total-carrito');
    const botonPagar = document.getElementById('boton-pagar');
    const DIALOG_LOGIN_CUENTA = document.getElementById("dialog-login-requerido-cuenta");
    const BTN_IR_LOGIN_CUENTA = document.getElementById("dialogo-cuenta-login");

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

    function renderizarCarrito() {
        const usuario = getUsuarioLogueado();

        if (!usuario) {
            itemsContainer.innerHTML = '<p class="carrito-vacio">Debes iniciar sesión para ver tu carrito.</p>';
            totalSpan.style.display = 'none';
            botonPagar.style.display = 'none';
            DIALOG_LOGIN_CUENTA.classList.remove("ocultar");
            DIALOG_LOGIN_CUENTA.showModal();
            BTN_IR_LOGIN_CUENTA.onclick = () => window.location.href = './login.html';
            return;
        }

        const carrito = usuario.carrito || [];
        itemsContainer.innerHTML = '';

        if (carrito.length === 0) {
            itemsContainer.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
            totalSpan.textContent = 'Total: $0.00';
            botonPagar.disabled = true;
            return;
        }

        let total = 0;
        
        carrito.forEach(item => {
            total += item.precio;

            let subTituloHtml = ''; 

            if (item.tipo === 'individual') {
                subTituloHtml = `<p class="item-tipo">Inscripción: ${item.datosInscrito.email}</p>`;
            } 
            else if (item.tipo === 'empresarial') {
                subTituloHtml = `<p class="item-tipo">Inscrito: ${item.datosInscrito.nombre} ${item.datosInscrito.apellido}</p>`;
            } 
            else if (item.tipo === 'giftcard') {
               
                subTituloHtml = `<p class="item-tipo">Destinatario: ${item.datosInscrito.nombre}</p>`;
            }
       

            const itemHtml = `
                <article class="carrito-item" data-id="${item.id}">
                    <img src="${item.imagen}" alt="${item.nombre}" class="item-imagen">
                    <div class="item-detalles">
                        <h3 class="item-nombre">${item.nombre}</h3>
                        ${subTituloHtml} </div>
                    <div class="item-precio">
                        <p>$${item.precio.toFixed(2)}</p>
                    </div>
                    <button class="item-eliminar" title="Eliminar item">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </article>
            `;
            itemsContainer.innerHTML += itemHtml;
        });

        totalSpan.textContent = `Total: $${total.toFixed(2)}`;
        botonPagar.disabled = false;
        agregarListenersEliminar();
    }


    function agregarListenersEliminar() {
        const botonesEliminar = document.querySelectorAll('.item-eliminar');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const itemArticle = e.target.closest('.carrito-item');
                const itemId = itemArticle.dataset.id;
                eliminarItemDelCarrito(itemId);
            });
        });
    }

    function eliminarItemDelCarrito(itemId) {
        const usuarioLogueado = getUsuarioLogueado();
        if (!usuarioLogueado) return;

        usuarioLogueado.carrito = usuarioLogueado.carrito.filter(item => item.id !== itemId);
        guardarUsuarioLogueado(usuarioLogueado); 

        const listaUsuarios = getUsuarios();
        const indiceUsuario = listaUsuarios.findIndex(user => user.email === usuarioLogueado.email);
        
        if (indiceUsuario !== -1) {
            listaUsuarios[indiceUsuario].carrito = usuarioLogueado.carrito;
            guardarUsuarios(listaUsuarios);
        }

        renderizarCarrito();
    }

   
    renderizarCarrito();
    botonPagar.addEventListener('click', () => {
    window.location.href = './pago.html'; 
    });

});