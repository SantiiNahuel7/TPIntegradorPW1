document.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = localStorage.getItem("giftCardDatos");
  if (!datosGuardados) return;

  const datos = JSON.parse(datosGuardados);

  const tarjeta = document.querySelector(".giftcard");
  const nombre = document.querySelector(".giftcard-nombre");
  const monto = document.querySelector(".giftcard-monto");

  if (!tarjeta || !nombre || !monto) return;

  tarjeta.style.backgroundColor = datos.color || "#000";
  nombre.textContent = datos.nombre || "Nombre del destinatario";
  nombre.style.fontSize = (datos.tamanio || 30) + "px";
  monto.textContent = datos.monto.replace(/(\d+)/, "$$$1");

  monto.classList.remove(
    "arriba-izquierda",
    "arriba-derecha",
    "abajo-izquierda",
    "abajo-derecha"
  );

  if (datos.ubicacion) {
    monto.classList.add(datos.ubicacion);
    console.log("Ubicación aplicada:", datos.ubicacion);
  } else {
    console.log("No hay ubicación guardada");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const fechaInput = document.getElementById("fecha-expiracion");
  const boton = document.querySelector(".boton-comprar");

  fechaInput.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 2) valor = valor.slice(0, 2) + "/" + valor.slice(2, 6);
    e.target.value = valor.slice(0, 7);
  });

  boton.addEventListener("click", (e) => {
    const valor = fechaInput.value.trim();
    const match = valor.match(/^(0[1-9]|1[0-2])\/([0-9]{4})$/);
    if (!match) {
      e.preventDefault();
      alert("Por favor, ingrese una fecha válida en formato MM/AAAA.");
      return;
    }
    const mes = parseInt(match[1]);
    const anio = parseInt(match[2]);
    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1;
    const anioActual = hoy.getFullYear();
    if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
      e.preventDefault();
      alert("La tarjeta está vencida. Ingrese una fecha válida.");
      return;
    }
  });
});

const inputTarjeta = document.querySelector("#numero-tarjeta");
inputTarjeta.addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, "");
  valor = valor.substring(0, 16);
  valor = valor.replace(/(.{4})(?=.)/g, "$1-");
  e.target.value = valor;
});
