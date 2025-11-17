
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-contacto");
  const nombre = form.querySelector('input[name="nombre"]');
  const email = form.querySelector('input[name="email"]');
  const telefono = form.querySelector('input[name="telefono"]');
  telefono.addEventListener("input", () => {
    let valor = telefono.value.replace(/\D/g, ""); 

    if (valor.length > 8) valor = valor.slice(0, 8); 

    if (valor.length > 4) {
        telefono.value = valor.slice(0, 4) + "-" + valor.slice(4);
     } else {
      telefono.value = valor;
    }
 });
  const consulta = form.querySelector('textarea[name="consulta"]');

  const contador = document.createElement("p");
  contador.textContent = "0 / 1000 caracteres";
  contador.style.fontSize = "0.9rem";
  contador.style.color = "#ccc";
  consulta.insertAdjacentElement("afterend", contador);


  consulta.addEventListener("input", () => {
    const longitud = consulta.value.length;
    contador.textContent = `${longitud} / 1000 caracteres`;
    if (longitud > 1000) {
      contador.style.color = "red";
    } else {
      contador.style.color = "#ccc";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\d{4}-?\d{4}$/;

    if (nombre.value.trim() === "") {
      alert("El campo 'Nombre y Apellido' no puede estar vacío.");
      return;
    }

    if (!emailRegex.test(email.value.trim())) {
      alert("Por favor, ingresá un correo válido.");
      return;
    }

    if (telefono.value.replace(/\D/g, "").length !== 8) {
      alert("El teléfono debe tener exactamente 8 números.");
      return;
    }

    if (consulta.value.length > 1000) {
      alert("La consulta no puede superar los 1000 caracteres.");
      return;
    }

  
mostrarPopupConfirmacion();

});

function mostrarPopupConfirmacion() {
    const popupConfirm = document.getElementById("popupConfirmacion");
    popupConfirm.style.display = "flex";

    const enviarBtn = document.getElementById("enviarBtn");
    const cancelarBtn = document.getElementById("cancelarConfirmBtn");

  
    cancelarBtn.onclick = () => popupConfirm.style.display = "none";

    
    enviarBtn.onclick = () => {
      popupConfirm.style.display = "none";
      form.reset();                          
      contador.textContent = "0 / 1000 caracteres"; 
      mostrarPopupFinal();
    };
  }

  function mostrarPopupFinal() {
    const popupFinal = document.getElementById("popup");
    popupFinal.style.display = "flex";

    const aceptarBtn = document.getElementById("aceptarBtn");

  aceptarBtn.replaceWith(aceptarBtn.cloneNode(true));
  const nuevoBtn = document.getElementById("aceptarBtn");

    nuevoBtn.addEventListener("click", () => {
      popupFinal.style.display = "none";
      window.location.href = "../index.html"; 
    });
  }

});
