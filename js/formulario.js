const tipoDeFomulario = document.querySelector('.form__info');
const containerEmpresarial = document.querySelector('.container-empresarial');
const containerPersonal = document.querySelector('.container-personal');

const botonAgregarPersona = document.getElementById('agregar-persona');
const inputAdicional = document.getElementById('input-adicional');

const formulario = document.querySelector('form');

const botonlimpiarCampos = document.querySelectorAll('.vaciar-campos');
const botonEliminarPersona = document.querySelectorAll('.eliminar-persona');

let contadorId = 2;




function mostrarFormularioElegido() {
    tipoDeFomulario.addEventListener('change', (e) => {
        if (e.target.value === 'empresarial') {
            containerEmpresarial.style.display = 'block'
            containerPersonal.style.display = 'none'
        } else {
            containerEmpresarial.style.display = 'none'
            containerPersonal.style.display = 'block'
        }
    });
}

function agregarPersona() {
    botonAgregarPersona.addEventListener('click', (e) => {
        e.preventDefault(); // Evita que el formulario se envíe y recargue la página 
        contadorId++;
        inputAdicional.innerHTML += `
                    <div class="fields">
                        <input type="text" name="firstName${contadorId}" id="firstName${contadorId}" placeholder="Nombre" required
                            title="Debe ingresar el nombre de la persona">
                        <input type="text" name="lastName${contadorId}" id="lastName${contadorId}" placeholder="Apellido" required
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

mostrarFormularioElegido();
limpiarCampos();
agregarPersona();
eliminarPersona();