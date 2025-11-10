const tipoDeFomulario = document.querySelector('.form__info');
const containerEmpresarial = document.querySelector('.container-empresarial');
const containerPersonal = document.querySelector('.container-personal');

const botonAgregarPersona = document.getElementById('agregar-persona');
const inputAdicional = document.getElementById('input-adicional');



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
        inputAdicional.innerHTML += `
                    <div class="fields">
                        <input type="text" name="firstName1" id="firstName1" placeholder="Nombre" required
                            title="Debe ingresar el nombre de la persona">
                        <input type="text" name="lastName1" id="lastName1" placeholder="Apellido" required
                            title="Debe ingresar el apellido de la persona">
                        <input type="number" name="dni1" id="dni1" placeholder="DNI (sin puntos ni espacios)" required
                            title="Debe ingresar el DNI de la persona (sin puntos ni espacios)">
                        <input type="text" name="emailEmpresarial" id="emailEmpresarial" placeholder="Email" required
                            title="Debe ingresar el email de la persona">
                        <input type="number" name="telefonoEmpresarial" id="telefonoEmpresarial" placeholder="Teléfono" required
                            title="Debe ingresar el teléfono de la persona">
                        <div class="resume">
                            <span id="price">$10000</span>
                        </div>
                        <button><i class="fa-solid fa-circle-minus"></i></button>
                    </div>`;
    });
}


mostrarFormularioElegido();
agregarPersona();

