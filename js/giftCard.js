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

  console.log("giftCard.js cargado");
  console.log("Botón:", botonContinuar);

  inputNombre.addEventListener("input", () => {
    previewNombre.textContent =  inputNombre.value.trim() !== "" ? inputNombre.value : "Nombre del destinatario";
  });

  inputColor.addEventListener("input", () => {
    tarjetaPreview.style.backgroundColor = inputColor.value;
  });

  inputTamanio.addEventListener("input", () => {
    let size = parseInt(inputTamanio.value);
    if (isNaN(size)) return;
    if (size < 20) size = 20;
    if (size > 50) size = 50;
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
    console.log("Click detectado");
    e.preventDefault();
    const datosTarjeta = {
      nombre: inputNombre.value.trim(),
      color: inputColor.value,
      tamanio: parseInt(inputTamanio.value),
      monto: selectMonto.value,
      ubicacion: document.querySelector("input[name='ubicacion-monto']:checked")?.value,
    };
    localStorage.setItem("giftCardDatos", JSON.stringify(datosTarjeta));
    window.location.href = "../../html/GiftCard/pagoGiftCard.html";
  });
});
