document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const inputUsuario = document.getElementById("usuario");
  const inputPassword = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuarioIngresado = inputUsuario.value.trim();
    const passwordIngresada = inputPassword.value.trim();

    // Obtenemos los usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscamos coincidencia
    const usuarioEncontrado = usuarios.find(
      (u) =>
        (u.usuario === usuarioIngresado || u.email === usuarioIngresado) &&
        u.password === passwordIngresada
    );

    if (usuarioEncontrado) {
      // Guardamos el usuario activo
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));


      window.location.href = "/TPIntegradorPW1/index.html"; // o la ruta que uses
    } else {
      alert("Usuario o contraseña incorrectos ❌");
    }
  });
});