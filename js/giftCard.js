document.addEventListener("DOMContentLoaded", () => {
  const inputNombre = document.getElementById("nombre-destinatario");
  const inputColor = document.getElementById("color-tarjeta");
  const inputTamanio = document.querySelector(".tamanio-texto input[type='number']");
  const selectMonto = document.getElementById("amount");
  const radiosUbicacion = document.querySelectorAll("input[name='ubicacion']");

  const tarjetaPreview = document.getElementById("tarjeta-preview");
  const previewNombre = document.getElementById("preview-nombre");
  const previewMonto = document.getElementById("preview-monto");

  inputNombre.addEventListener("input", () => {
    previewNombre.textContent =
      inputNombre.value.trim() !== "" ? inputNombre.value : "Nombre del destinatario";
  });

  inputColor.addEventListener("input", () => {
    tarjetaPreview.style.backgroundColor = inputColor.value;
  });

 inputTamanio.addEventListener("input", () => {
  let size = parseInt(inputTamanio.value);
  if (isNaN(size)) return;
  if (size < 20) size = 20;
  if (size > 60) size = 60;
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
});
