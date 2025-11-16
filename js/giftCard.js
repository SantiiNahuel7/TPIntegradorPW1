document.addEventListener("DOMContentLoaded", () => {
  const inputNombre = document.getElementById("nombre-destinatario");
  const inputColor = document.getElementById("color-tarjeta");
  const inputTamanio = document.querySelector(".tamanio-texto input[type='number']");
  const selectMonto = document.getElementById("amount");
  const radiosUbicacion = document.querySelectorAll("input[name='ubicacion-monto']");
  const tarjetaPreview = document.getElementById("tarjeta-preview");
  const previewNombre = document.getElementById("preview-nombre");
  const previewMonto = document.getElementById("preview-monto");
  const botonContinuar = document.getElementById("btn-continuar");

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

  inputNombre.addEventListener("input", () => {
    previewNombre.textContent = inputNombre.value.trim() !== "" ? inputNombre.value : "Nombre del destinatario";
  });
  inputColor.addEventListener("input", () => {
    tarjetaPreview.style.backgroundColor = inputColor.value;
  });
  inputTamanio.addEventListener("input", () => {
    let size = parseInt(inputTamanio.value);
    if (isNaN(size)) return;
    if (size < 10) size = 10;
    if (size > 40) size = 40;
    inputTamanio.value = size;
    previewNombre.style.fontSize = size + "px";
  });
  selectMonto.addEventListener("change", () => {
    previewMonto.textContent = selectMonto.value.replace(/(\d+)/, "$$$1");
  });
  radiosUbicacion.forEach((radio) => {
    radio.addEventListener("change", () => {
      previewMonto.classList.remove(
        "arriba-izquierda",
        "arriba-derecha",
        "abajo-izquierda",
        "abajo-derecha"
      );
      previewMonto.classList.add(radio.value);
    });
  });

 
  botonContinuar.addEventListener("click", (e) => {
    e.preventDefault();
    const usuarioLogueado = getUsuarioLogueado();
    if (!usuarioLogueado) {
        alert("Necesitas iniciar sesión para comprar una Gift Card.");
        window.location.href = "../html/login.html"; 
        return;
    }
    const ubicacionSeleccionada = Array.from(radiosUbicacion).find(r => r.checked)?.value;
    const datosTarjeta = {
      nombre: inputNombre.value.trim(),
      color: inputColor.value,
      tamanio: parseInt(inputTamanio.value),
      monto: selectMonto.value,
      ubicacion: ubicacionSeleccionada
    };

    if (datosTarjeta.nombre === "") {
        alert("Por favor, ingresa el nombre del destinatario.");
        inputNombre.focus();
        return;
    }

    localStorage.setItem("giftCardDatos", JSON.stringify(datosTarjeta));

    const itemGiftCard = {
        id: `giftcard-${Date.now()}`, 
        nombre: `Gift Card para ${datosTarjeta.nombre}`,
        precio: parseFloat(datosTarjeta.monto),
        cantidad: 1,
        tipo: 'giftcard',
        imagen: '../../Imagenes/Logos/logo5.png', 
        datosInscrito: { nombre: datosTarjeta.nombre } 
    };
    const listaUsuarios = getUsuarios();
    const indiceUsuario = listaUsuarios.findIndex(user => user.email === usuarioLogueado.email);
    if (indiceUsuario === -1) {
        alert("Error de consistencia de datos. Vuelve a iniciar sesión.");
        return;
    }
    const carritoActual = listaUsuarios[indiceUsuario].carrito || [];
    const carritoCombinado = [...carritoActual, itemGiftCard];
    
    listaUsuarios[indiceUsuario].carrito = carritoCombinado;
    guardarUsuarios(listaUsuarios);
    guardarUsuarioLogueado(listaUsuarios[indiceUsuario]); 
    window.location.href = "../../html/carrito.html"; 
  });
});