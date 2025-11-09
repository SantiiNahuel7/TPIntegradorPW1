const tipoDeFomulario = document.querySelector('.form__info');
const containerEmpresarial = document.querySelector('.container-empresarial');
const containerPersonal = document.querySelector('.container-personal');


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

mostrarFormularioElegido();