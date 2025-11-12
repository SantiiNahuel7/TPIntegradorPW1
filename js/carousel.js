export const btnLeft = document.querySelector(".btn-left"),
    btnRight = document.querySelector(".btn-right"),                // Seleccionamos los botones
    slider = document.querySelector("#slider"),
    sliderSection = document.querySelectorAll(".slider-section");

console.log(sliderSection);

btnLeft.addEventListener("click", e => moveToLeft())    // Listener para escuchar las acciones al apretar los botones de izquierda y derecha
btnRight.addEventListener("click", e => moveToRight())

setInterval(() => {
    moveToRight()      // Mueve a la derecha cada una cierta cantidad de tiempo, en este caso 5 seg
}, 5000);

let operacion = 0;
let counter = 0;
let widthImg = 100 / sliderSection.length;    // 100 / la cantidad de imagenes que tengamos, para realizar la operación de abajo
                                                // y calcular como se tiene que mover el slide cada vez que se apreta. En este caso sería 33,33 el widthImg

                                                 
function moveToRight() {                       


    if(counter >= sliderSection.length-1) {  // Una vez que se llega a la última imagen restable a 0 las cuentas y salta a la primer imagen
                                                

        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        return;

    } 

    counter++;                                  // Sino sigue contando y pasando a la siguiente imagen hacía la derecha
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`
    slider.style.transition = "all ease .6s"



}

function moveToLeft() {

    counter--;                      
        if(counter < 0) {           // Acá sería al reves, si es menor que cero pasa a la última imagen

        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1);  // Calculo para pasar a la última imagen
        slider.style.transform = `translate(-${operacion}%)`;
        return;

    }

    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`
    slider.style.transition = "all ease .6s"
        

    
}