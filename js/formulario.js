
import { personaInscripta } from './personaInscripta.js';

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

let contadorId = 1;
let listadoPersonas = [];

function mostrarFormularioElegido() {
    tipoDeFomulario.addEventListener('change', (e) => {
        const inputsPersonal = containerPersonal.querySelectorAll('input');
        const inputsEmpresarial = containerEmpresarial.querySelectorAll('input');
        if (e.target.value === 'empresarial') {
            containerEmpresarial.style.display = 'block'
            containerPersonal.style.display = 'none'
            inputsPersonal.forEach(input => input.disabled = true);
            inputsEmpresarial.forEach(input => input.disabled = false);
            recalcularTotal();
        } else {
            containerEmpresarial.style.display = 'none'
            containerPersonal.style.display = 'block'
            inputsEmpresarial.forEach(input => input.disabled = true);
            inputsPersonal.forEach(input => input.disabled = false);
            const lugar = document.querySelector('.total-curso')
            lugar.innerHTML = `$${buscarPrecioBase()}`
        }
    });
}

function agregarPersona() {
    botonAgregarPersona.addEventListener('click', (e) => {
        e.preventDefault();
        contadorId++;
        inputAdicional.innerHTML += `
                    <div class="fields">
                        <input type="text" class="nombrePersona" name="firstName${contadorId}" id="firstName${contadorId}" placeholder="Nombre" required
                            title="Debe ingresar el nombre de la persona">
                        <input type="text" class="apellido" name="lastName${contadorId}" id="lastName${contadorId}" placeholder="Apellido" required
                            title="Debe ingresar el apellido de la persona">
                        <input type="number" class="dni" name="dni${contadorId}" id="dni${contadorId}" placeholder="DNI (sin puntos ni espacios)" required
                            title="Debe ingresar el DNI de la persona (sin puntos ni espacios)">
                        <input type="text" class="email" name="emailEmpresarial${contadorId}" id="emailEmpresarial${contadorId}" placeholder="Email" required
                            title="Debe ingresar el email de la persona">
                        <input type="number" class="telefono" name="telefonoEmpresarial${contadorId}" id="telefonoEmpresarial${contadorId}" placeholder="Teléfono" required
                            title="Debe ingresar el teléfono de la persona">
                        <div class="resume">
                            <span class="price costo-fijo">$5000</span>
                        </div>
                        <button class="eliminar-persona"><i class="fa-solid fa-circle-minus"></i></button>
                    </div>`;

        const nuevaPersona = new personaInscripta('', '', '', '', '');
        listadoPersonas.push(nuevaPersona);
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
};


function eliminarPersona() {
    inputAdicional.addEventListener('click', (e) => {
        const botonEliminar = e.target.closest('.eliminar-persona');
        if (botonEliminar) {
            e.preventDefault();
            const camposAEliminar = botonEliminar.closest('.fields');
            if (camposAEliminar) {
                listadoPersonas.pop();
                camposAEliminar.remove();
                recalcularTotal();
            }
        }
    });
};


function guardarPersona() {
    listadoPersonas = [];
    const todasLasFilas = containerEmpresarial.querySelectorAll('.fields');
    const datosPersonal = containerPersonal.querySelectorAll('.fields');
    const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked');

    if (formSeleccionado.value === 'empresarial') {
        listadoPersonas = [];
        todasLasFilas.forEach(filaCampos => {
            const nombreInput = filaCampos.querySelector('.nombrePersona');
            const apellidoInput = filaCampos.querySelector('.apellido');
            const dniInput = filaCampos.querySelector('.dni');
            const emailInput = filaCampos.querySelector('.email');
            const telefonoInput = filaCampos.querySelector('.telefono');

            if (nombreInput && nombreInput.value.trim() !== '') {
                const nombreValor = nombreInput.value;
                const apellidoValor = apellidoInput.value;
                const dniValor = dniInput.value;
                const emailValor = emailInput.value;
                const telefonoValor = telefonoInput.value;
                const nuevaPersona = new personaInscripta(nombreValor, apellidoValor, dniValor, emailValor, telefonoValor);
                listadoPersonas.push(nuevaPersona);
            }
        });
    } else if (formSeleccionado.value === 'individual') {
        listadoPersonas = [];
        datosPersonal.forEach(filaCampos => {
            const emailInput = filaCampos.querySelector('.emailPersonal');
            const telefonoInput = filaCampos.querySelector('.telefonoPersonal');

            
                const emailValor = emailInput.value;
                const telefonoValor = telefonoInput.value;
                const nuevaPersona = new personaInscripta('', '', '', emailValor, telefonoValor);
                listadoPersonas.push(nuevaPersona);
        })
    }
};

function generarListadoPersonas() {
    const listadoContenedor = dialog.querySelector('.listado-personas');
    listadoContenedor.innerHTML = '';
    let contadorPersonas = 0;
    const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked');

    if (formSeleccionado.value === 'empresarial') {
    listadoPersonas.forEach((nuevaPersona) => {

        const nombre = nuevaPersona.nombre;
        const apellido = nuevaPersona.apellido;
        const dni = nuevaPersona.dni;
        const email = nuevaPersona.email;
        const telefono = nuevaPersona.telefono;
        contadorPersonas++;

        listadoContenedor.innerHTML = `<h3>Resumen de inscripción - Tipo Empresarial</h3><br>
        <p>Confirmá  que los datos estén correctos</p>
        <h4>Listado de personas inscriptas:</h4>` ;
        listadoContenedor.innerHTML += `${contadorPersonas}. Nombre y Apellido: ${nombre} ${apellido}<br>
        DNI: ${dni} <br> 
        E-mail: ${email} <br>
        Teléfono: ${telefono} <br>
        <br>`
    });
} else if (formSeleccionado.value === 'individual') {
    listadoPersonas.forEach((nuevaPersona) => {
          const email = nuevaPersona.email;
        const telefono = nuevaPersona.telefono;

        listadoContenedor.innerHTML = `<h3>Resumen de inscripción -  Tipo Personal</h3> Confirmá  que los datos estén correctos <br>
        E-mail: ${email} <br>
        Teléfono: ${telefono} <br>`
    });
    };
}

botonFormulario.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validarCampos()) {
        return;
    };
    guardarPersona();
    generarListadoPersonas();
    dialog.showModal();
});

cerrarModal.addEventListener('click', (e) => {
    e.preventDefault();
    dialog.close();
});

function recalcularTotal() {
    let cantidad = listadoPersonas.length + 1;

    const lugar = document.querySelector('.total-curso')
    lugar.innerHTML = `$${buscarPrecioBase() + cantidad * 5000}`
};

function validarCampos() {
    const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked');
    let contenedorActivo;

    if (!formSeleccionado) {
        alert("Por favor, seleccioná un tipo de inscripción (Personal o Empresarial).");
        return false;
    }
    if (formSeleccionado.value === 'empresarial') {
        contenedorActivo = containerEmpresarial;

    } else if (formSeleccionado.value === 'individual') {
        contenedorActivo = containerPersonal;
    }


    const inputsRequeridos = contenedorActivo.querySelectorAll('input[required]');
    const totalInputs = inputsRequeridos.length;
    for (let i = 0; i < totalInputs; i++) {
        const inputActual = inputsRequeridos[i];

        if (inputActual.value.trim() === '' && !inputActual.disabled) {
            alert(`Por favor, completá el campo obligatorio: ${inputActual.placeholder}`);
            inputActual.focus();
            return false;
        }
    }
    return true;
};


function cargarDatosCurso() {
    const cursoJSON = localStorage.getItem('cursoSeleccionado');

    if (!cursoJSON) {
        console.error("Error, no seleccionó ningún curso.");
        return;
    }

    const cursoData = JSON.parse(cursoJSON);

    const nombreCurso = cursoData.titulo;


    const tituloFormulario = document.querySelector('.curso-elegido');
    tituloFormulario.innerHTML = `${nombreCurso}`;
};

function buscarPrecioBase() {
    const cursoJSON = localStorage.getItem('cursoSeleccionado');
    const cursoData = JSON.parse(cursoJSON);
    const precioString = cursoData.valor;

    let precioLimpio = precioString.replace(/[^0-9]/g, '');
    let precioNumero = Number(precioLimpio);

    return precioNumero;
};


cargarDatosCurso();
mostrarFormularioElegido();
limpiarCampos();
agregarPersona();
eliminarPersona();

formulario.addEventListener('submit', (e) => {
    const elementoCurso = document.querySelector('.curso-elegido');
    const tituloCurso = elementoCurso.textContent;
    localStorage.setItem('cursoInscripto', tituloCurso);
});



