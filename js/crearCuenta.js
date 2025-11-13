const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita recargar la página

  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const usuario = document.getElementById("usuario").value.trim();
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const passreply = document.getElementById("passreply").value.trim();

  // Validaciones
  if (!nombre || !apellido || !usuario || !email || !pass || !passreply) {
    alert("Por favor completá todos los campos.");
    return;
  }

  if (pass !== passreply) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Obtenemos los usuarios guardados
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Verificamos si ya existe ese usuario o email
  const existe = usuarios.some(
    (u) => u.usuario === usuario || u.email === email
  );

  if (existe) {
    alert("El usuario o el email ya están registrados.");
    return;
  }

  // Creamos el nuevo usuario
  const nuevoUsuario = {
    nombre,
    apellido,
    usuario,
    email,
    password: pass,
  };

  // Lo agregamos al array y guardamos
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));



  // 🔹 Redirigir a la página de cuenta creada
  window.location.href = "./cuentaCreada.html";
});