import { personaInscripta } from './personaInscripta.js';
const PRECIO_POR_PERSONA = 5000; 

const CURSOS_DATABASE = {
    "html": { titulo: "HTML", valor: 20000, imagen: "../../Imagenes/Cursos/html.png" },
    "css": { titulo: "CSS", valor: 25000, imagen: "../../Imagenes/cursos/css.png" },
    "javascript": { titulo: "JavaScript", valor: 30000, imagen: "../../Imagenes/cursos/javascript.png" },
    "java": { titulo: "Java", valor: 30000, imagen: "../../Imagenes/cursos/java.png" },
    "sql": { titulo: "SQL", valor: 40000, imagen: "../../Imagenes/cursos/sql.png" },
    "ux-ui": { titulo: "UX/UI", valor: 60000, imagen: "../../Imagenes/cursos/ux-ui.png" }
};

const tipoDeFomulario = document.querySelector('.form__info');
const containerEmpresarial = document.querySelector('.container-empresarial');
const containerPersonal = document.querySelector('.container-personal');
const botonAgregarPersona = document.getElementById('agregar-persona');
const inputAdicional = document.getElementById('input-adicional');
const formulario = document.querySelector('form');
const botonlimpiarCampos = document.querySelectorAll('.vaciar-campos');
const dialog = document.querySelector('.modal');
const botonFormulario = document.getElementById('enviar-form');
const cerrarModal = document.getElementById('close-dialog');
const totalCursoSpan = document.querySelector('.total-curso');
const cursoSelectPersonal = document.getElementById('curso-select-personal');
const cursoSelectEmpresarial = document.getElementById('curso-select-empresarial');

let contadorId = 1;

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

function soloNumeros(evento) {
    evento.target.value = evento.target.value.replace(/\D/g, '');
}

function crearItemsParaCarrito(listadoPersonas, cursoId, tipoFormulario) {
    const curso = CURSOS_DATABASE[cursoId];
    if (!curso) return []; 
    const itemsCarrito = [];

    if (tipoFormulario === 'individual') {
        const persona = listadoPersonas[0]; 
        itemsCarrito.push({
            id: cursoId, 
            nombre: `Curso de ${curso.titulo} (Personal)`,
            precio: curso.valor,
            cantidad: 1,
            tipo: 'individual',
            imagen: curso.imagen,
            datosInscrito: { email: persona.email, telefono: persona.telefono } 
        });
    } else { 
        listadoPersonas.forEach(persona => {
            itemsCarrito.push({
                id: `${cursoId}-${persona.dni}`, 
                nombre: `Curso de ${curso.titulo} (Empresarial)`,
                precio: curso.valor + PRECIO_POR_PERSONA,
                cantidad: 1,
                tipo: 'empresarial',
                imagen: curso.imagen,
                datosInscrito: { nombre: persona.nombre, apellido: persona.apellido, dni: persona.dni, email: persona.email, telefono: persona.telefono }
            });
        });
    }
    return itemsCarrito;
}

formulario.addEventListener('submit', (e) => {
    const listadoPersonas = guardarPersonas();
    const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked').value;
    let cursoId = (formSeleccionado === 'individual') ? cursoSelectPersonal.value : cursoSelectEmpresarial.value;
    const nuevosItems = crearItemsParaCarrito(listadoPersonas, cursoId, formSeleccionado);
    const usuarioLogueado = getUsuarioLogueado();
    const listaUsuarios = getUsuarios();
    
    if (!usuarioLogueado) {
        alert("Error: No se encontró usuario. Vuelve a iniciar sesión.");
        e.preventDefault();
        return;
    }
    const indiceUsuario = listaUsuarios.findIndex(user => user.email === usuarioLogueado.email);
    if (indiceUsuario === -1) {
        alert("Error de consistencia de datos. Vuelve a iniciar sesión.");
        e.preventDefault();
        return;
    }
    const carritoActualDelUsuario = listaUsuarios[indiceUsuario].carrito || [];
    const itemsCarritoCombinado = [...carritoActualDelUsuario, ...nuevosItems];
    
    listaUsuarios[indiceUsuario].carrito = itemsCarritoCombinado;
    guardarUsuarios(listaUsuarios);

    const usuarioActualizado = listaUsuarios[indiceUsuario];
    guardarUsuarioLogueado(usuarioActualizado);
});


function popularDropdownCursos() {
    const dropdowns = [cursoSelectPersonal, cursoSelectEmpresarial];
    dropdowns.forEach(select => {
        select.options.length = 1; 
        for (const [id, curso] of Object.entries(CURSOS_DATABASE)) {
            const option = document.createElement('option');
            option.value = id; 
            option.textContent = `${curso.titulo} ($${curso.valor})`;
            select.appendChild(option);
        }
    });
}

function mostrarFormularioElegido() {
    tipoDeFomulario.addEventListener('change', (e) => {
        const inputsPersonal = containerPersonal.querySelectorAll('input, select');
        const inputsEmpresarial = containerEmpresarial.querySelectorAll('input, select');
        
        if (e.target.value === 'empresarial') {
            containerEmpresarial.style.display = 'block';
            containerPersonal.style.display = 'none';
            inputsPersonal.forEach(input => input.disabled = true);
            inputsEmpresarial.forEach(input => input.disabled = false);
            containerEmpresarial.querySelector('.costo-fijo').innerHTML = `$${PRECIO_POR_PERSONA}`;
            recalcularTotal(); 
        } else {
            containerEmpresarial.style.display = 'none';
            containerPersonal.style.display = 'block';
            inputsEmpresarial.forEach(input => input.disabled = true);
            inputsPersonal.forEach(input => input.disabled = false);
            recalcularTotal(); 
        }
    });
}

function agregarPersona() {
    botonAgregarPersona.addEventListener('click', (e) => {
        e.preventDefault();
        contadorId++;
        
        const nuevoHtmlPersona = `
        <div class="fields">
            <input type="text" class="nombrePersona" name="firstName${contadorId}" id="firstName${contadorId}" placeholder="Nombre*" required title="Debe ingresar el nombre de la persona">
            <input type="text" class="apellido" name="lastName${contadorId}" id="lastName${contadorId}" placeholder="Apellido*" required title="Debe ingresar el apellido de la persona">
            <input type="text" class="dni" name="dni${contadorId}" id="dni${contadorId}" placeholder="DNI* (sin puntos ni espacios)" required title="Debe ingresar el DNI de la persona (sin puntos ni espacios)" maxlength="8">
            <input type="email" class="email" name="emailEmpresarial${contadorId}" id="emailEmpresarial${contadorId}" placeholder="Email*" required title="Debe ingresar el email de la persona">
            
            <input type="text" class="telefono" name="telefonoEmpresarial${contadorId}" id="telefonoEmpresarial${contadorId}" 
                   placeholder="Teléfono*" required title="Debe ingresar el teléfono de 10 dígitos" 
                   maxlength="10" minlength="10">

            <div class="resume">
                <span class="price costo-fijo">$${PRECIO_POR_PERSONA}</span>
            </div>
            <button class="eliminar-persona" title="Eliminar esta persona"><i class="fa-solid fa-trash-can"></i></button>
        </div>`;
        
        inputAdicional.insertAdjacentHTML('beforeend', nuevoHtmlPersona);
        
        const nuevaFila = inputAdicional.lastElementChild;
        nuevaFila.querySelector('.dni').addEventListener('input', soloNumeros);
        nuevaFila.querySelector('.telefono').addEventListener('input', soloNumeros);

        recalcularTotal();
    });
}

function limpiarCampos() {
    botonlimpiarCampos.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            const campoAVaciar = boton.parentElement;
            const inputs = campoAVaciar.querySelectorAll('input');
            inputs.forEach(input => input.value = '');
        });
    });
}

function eliminarPersona() {
    inputAdicional.addEventListener('click', (e) => {
        const botonEliminar = e.target.closest('.eliminar-persona');
        if (botonEliminar) {
            e.preventDefault();
            const camposAEliminar = botonEliminar.closest('.fields');
            if (camposAEliminar) {
                camposAEliminar.remove();
                recalcularTotal();
            }
        }
    });
}

function buscarPrecioBase() {
    const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked');
    let cursoIdSeleccionado = "";
    if (formSeleccionado && formSeleccionado.value === 'individual') {
        cursoIdSeleccionado = cursoSelectPersonal.value;
    } else if (formSeleccionado && formSeleccionado.value === 'empresarial') {
        cursoIdSeleccionado = cursoSelectEmpresarial.value;
    } else {
        return 0;
    }
    if (!cursoIdSeleccionado || !CURSOS_DATABASE[cursoIdSeleccionado]) {
        return 0; 
    }
    return CURSOS_DATABASE[cursoIdSeleccionado].valor;
}

function recalcularTotal() {
    const precioBase = buscarPrecioBase();
    const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked');
    let costoAdicional = 0;
    if (formSeleccionado && formSeleccionado.value === 'empresarial') {
        const cantidadPersonas = containerEmpresarial.querySelectorAll('.fields').length;
        costoAdicional = cantidadPersonas * PRECIO_POR_PERSONA;
    }
    const total = precioBase + costoAdicional;
    totalCursoSpan.innerHTML = `$${total}`;
}


function guardarPersonas() {
    const listadoPersonas = []; 
    const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked');
    if (formSeleccionado.value === 'empresarial') {
        const todasLasFilas = containerEmpresarial.querySelectorAll('.fields');
        todasLasFilas.forEach(filaCampos => {
            const nombre = filaCampos.querySelector('.nombrePersona').value;
            const apellido = filaCampos.querySelector('.apellido').value;
            const dni = filaCampos.querySelector('.dni').value;
            const email = filaCampos.querySelector('.email').value;
            const telefono = filaCampos.querySelector('.telefono').value;
            if (nombre.trim() !== '') {
                const nuevaPersona = new personaInscripta(nombre, apellido, dni, email, telefono);
                listadoPersonas.push(nuevaPersona);
            }
        });
    } else if (formSeleccionado.value === 'individual') {
        const filaCampos = containerPersonal.querySelector('.fields');
        const email = filaCampos.querySelector('.emailPersonal').value;
        const telefono = filaCampos.querySelector('.telefonoPersonal').value;
        const nuevaPersona = new personaInscripta('', '', '', email, telefono);
        listadoPersonas.push(nuevaPersona);
    }
    return listadoPersonas;
}

function generarListadoPersonas(listadoPersonas) {
    const listadoContenedor = dialog.querySelector('.listado-personas');
    const tituloModal = dialog.querySelector('.titulo-modal');
    listadoContenedor.innerHTML = '';
    const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked');

    if (formSeleccionado.value === 'empresarial') {
        tituloModal.innerHTML = `<h3>Resumen de Inscripción Empresarial</h3><p>Confirmá que los datos estén correctos</p><h4>Listado de personas inscriptas:</h4>`;
        listadoPersonas.forEach((nuevaPersona, index) => {
            listadoContenedor.innerHTML += `<div class="persona-resumen"><strong>${index + 1}. ${nuevaPersona.nombre} ${nuevaPersona.apellido}</strong><br>DNI: ${nuevaPersona.dni} <br> E-mail: ${nuevaPersona.email} <br>Teléfono: ${nuevaPersona.telefono}</div>`;
        });
    } else if (formSeleccionado.value === 'individual') {
        const persona = listadoPersonas[0];
        tituloModal.innerHTML = `<h3>Resumen de Inscripción Personal</h3><p>Confirmá que los datos estén correctos</p>`;
        listadoContenedor.innerHTML = `<div class="persona-resumen">E-mail: ${persona.email} <br>Teléfono: ${persona.telefono}</div>`;
    }
}

botonFormulario.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!formulario.checkValidity()) {
        formulario.reportValidity(); 
        return;
    }
    const listadoFinal = guardarPersonas();
    generarListadoPersonas(listadoFinal);
    dialog.showModal();
});

cerrarModal.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

cursoSelectPersonal.addEventListener('change', recalcularTotal);
cursoSelectEmpresarial.addEventListener('change', recalcularTotal);

popularDropdownCursos();
mostrarFormularioElegido();
limpiarCampos();
agregarPersona();
eliminarPersona();
document.getElementById('telefonoPersona').addEventListener('input', soloNumeros);
document.getElementById('dni1').addEventListener('input', soloNumeros);
document.getElementById('telefonoEmpresarial').addEventListener('input', soloNumeros);
containerEmpresarial.style.display = 'none';
containerPersonal.style.display = 'none';
containerEmpresarial.querySelectorAll('input, select').forEach(input => input.disabled = true);
containerPersonal.querySelectorAll('input, select').forEach(input => input.disabled = true);

totalCursoSpan.innerHTML = "$0";