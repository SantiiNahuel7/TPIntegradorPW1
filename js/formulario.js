
import { personaInscripta } from './personaInscripta.js';

const tipoDeFomulario = document.querySelector('.form__info');
const containerEmpresarial = document.querySelector('.container-empresarial');
const containerPersonal = document.querySelector('.container-personal');

const botonAgregarPersona = document.getElementById('agregar-persona');
const inputAdicional = document.getElementById('input-adicional');

const formulario = document.querySelector('form');

const botonlimpiarCampos = document.querySelectorAll('.vaciar-campos');

let contadorId = 1;

const dialog = document.querySelector('.modal');
const botonFormulario = document.getElementById('enviar-form');

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
        } else {
            containerEmpresarial.style.display = 'none'
            containerPersonal.style.display = 'block'
            inputsEmpresarial.forEach(input => input.disabled = true);
            inputsPersonal.forEach(input => input.disabled = false);
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
                        <input type="number" name="dni${contadorId}" id="dni${contadorId}" placeholder="DNI (sin puntos ni espacios)" required
                            title="Debe ingresar el DNI de la persona (sin puntos ni espacios)">
                        <input type="text" name="emailEmpresarial${contadorId}" id="emailEmpresarial${contadorId}" placeholder="Email" required
                            title="Debe ingresar el email de la persona">
                        <input type="number" name="telefonoEmpresarial${contadorId}" id="telefonoEmpresarial${contadorId}" placeholder="Teléfono" required
                            title="Debe ingresar el teléfono de la persona">
                        <div class="resume">
                            <span class="price">$10000</span>
                        </div>
                        <button class="eliminar-persona"><i class="fa-solid fa-circle-minus"></i></button>
                    </div>`;

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
                camposAEliminar.remove();
            }
        }
    });
}


function enviarFormulario() {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const formSeleccionado = document.querySelector('input[name="inscriptionType"]:checked');
        if (formSeleccionado.value === 'empresarial') {
            e.target.submit();
        } else if (formSeleccionado.value === 'individual') {
            e.target.submit();
        }
    });
};



function guardarPersona() {
    listadoPersonas = []; 
    const todasLasFilas = containerEmpresarial.querySelectorAll('.fields'); 
    
    todasLasFilas.forEach(filaCampos => {
        const nombreInput = filaCampos.querySelector('.nombrePersona');
        const apellidoInput = filaCampos.querySelector('.apellido');

        if (nombreInput && nombreInput.value.trim() !== '') {
            const nombreValor = nombreInput.value;
            const apellidoValor = apellidoInput.value;
            const nuevaPersona = new personaInscripta(nombreValor, apellidoValor); 
            listadoPersonas.push(nuevaPersona);
        }
    });
};

function generarListadoPersonas() {
    const listadoContenedor = dialog.querySelector('.listado-personas');  
        listadoPersonas.forEach((nuevaPersona) => {
            const nombre = nuevaPersona.nombre; 
            const apellido = nuevaPersona.apellido;
    
            listadoContenedor.innerHTML += `<li>${nombre} ${apellido}</li>`;
        });
    }

botonFormulario.addEventListener('click', (e) => {
    e.preventDefault();
    guardarPersona();
    generarListadoPersonas();
    dialog.showModal();

});


mostrarFormularioElegido();
limpiarCampos();
agregarPersona();
eliminarPersona();
enviarFormulario();

