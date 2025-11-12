
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-contacto");
  const nombre = form.querySelector('input[name="nombre"]');
  const email = form.querySelector('input[name="email"]');
  const telefono = form.querySelector('input[name="telefono"]');
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

    const tel = telefono.value.trim();
    if (tel && !telefonoRegex.test(tel)) {
      alert("El teléfono debe tener 8 dígitos (puede tener guion en el medio). Ej: 1234-5678");
      return;
    }

    if (consulta.value.length > 1000) {
      alert("La consulta no puede superar los 1000 caracteres.");
      return;
    }

   
    mostrarModal();
    form.reset();
    contador.textContent = "0 / 1000 caracteres";
  });

  function mostrarModal() {
  const popup = document.getElementById("popup");
  popup.style.display = "flex";

  const aceptarBtn = document.getElementById("aceptarBtn");
  aceptarBtn.addEventListener("click", () => {
    popup.style.display = "none";
    window.location.href = "../index.html";
  });
}

 
});
