// hice una array con los cursos del mes 

const cursos = [
  { dia: 4, mes: 10, año: 2025, titulo: "Curso CSS", 
    resumen: "Aprende CSS desde cero y domina el diseño visual de páginas web. Con este curso podrás crear layouts modernos, animaciones, y responsive design para todo tipo de dispositivos.", 
    link: "../html/Detalle de Cursos/detalleCursoCSS.html" },
  { dia: 10, mes: 10, año: 2025, titulo: "Curso HTML", 
    resumen: "Domina HTML5 y construye la estructura de sitios web profesionales. Aprenderás etiquetas semánticas, formularios, tablas, multimedia y buenas prácticas para un código limpio y accesible.",
     link: "../html/Detalle de Cursos/detalleCursoHtml.html" },
  { dia: 18, mes: 11, año: 2025, titulo: "Curso JavaScript",
     resumen: "JavaScript completo: aprende a agregar interactividad a tus páginas web. Maneja eventos, DOM, funciones, arrays y objetos para crear aplicaciones dinámicas y experiencias de usuario avanzadas.", 
     link: "../html/Detalle de Cursos/detalleCursoJS.html" }
];

// Referencias
const calendario = document.getElementById("calendario");
const tituloMes = document.getElementById("tituloMes");
const popup = document.getElementById("popupCurso");
const tituloPopup = document.getElementById("tituloCurso");
const resumenPopup = document.getElementById("resumenCurso");
const linkPopup = document.getElementById("linkCurso");
const cerrarPopup = document.getElementById("cerrarPopup");


let fechaActual = new Date(2025, 10, 1); 

function generarCalendario() {
  calendario.innerHTML = ""; // "borra" los dias anteriores para hacer con el mes correspondiente

  
  const diasDeLaSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  diasDeLaSemana.forEach(dia => {
    const celda = document.createElement("div");
    celda.classList.add("dia");
    celda.textContent = dia;
    calendario.appendChild(celda);
  });

  const año = fechaActual.getFullYear();
  const mes = fechaActual.getMonth();

  tituloMes.textContent = `Calendario de próximos cursos - ${fechaActual.toLocaleString('es-ES', { month: 'long' })} ${año}`;

  const primerDia = new Date(año, mes, 1).getDay(); // Domingo=0
  let offset = primerDia === 0 ? 6 : primerDia - 1; // Ajuste lunes=0

  // Espacios iniciales
  for (let i = 0; i < offset; i++) {
    const celdaVacia = document.createElement("div");
    celdaVacia.classList.add("celda");
    calendario.appendChild(celdaVacia);
  }

  const diasMes = new Date(año, mes + 1, 0).getDate();
  for (let dia = 1; dia <= diasMes; dia++) {
    const celda = document.createElement("div");
    celda.classList.add("celda");
    celda.textContent = dia;

    // Buscar curso
    const curso = cursos.find(c => c.dia === dia && c.mes === mes && c.año === año);
    if (curso) {
      celda.classList.add("curso");
      celda.style.cursor = "pointer";
      celda.innerHTML = `${dia}<br><span class="curso-nombre">${curso.titulo}</span>`;
      celda.addEventListener("click", () => {
        tituloPopup.textContent = curso.titulo;
        resumenPopup.textContent = curso.resumen;
        linkPopup.href = curso.link;
        popup.style.display = "flex";
      });
    }

    calendario.appendChild(celda);
  }
}

// Navegación de meses
function cambiarMes(delta) {
  fechaActual.setMonth(fechaActual.getMonth() + delta);
  generarCalendario();
}

// Eventos popup
cerrarPopup.addEventListener("click", () => popup.style.display = "none");
popup.addEventListener("click", e => { if (e.target === popup) popup.style.display = "none"; });

// Botones de navegación
const navAnterior = document.createElement("button");
navAnterior.textContent = "« Mes anterior";
navAnterior.addEventListener("click", () => cambiarMes(-1));

const navSiguiente = document.createElement("button");
navSiguiente.textContent = "Mes siguiente »";
navSiguiente.addEventListener("click", () => cambiarMes(1));

// Contenedor de botones
const navContainer = document.createElement("div");
navContainer.classList.add("calendario-nav");
navContainer.appendChild(navAnterior);
navContainer.appendChild(navSiguiente);

// Insertar contenedor arriba del calendario
calendario.parentNode.insertBefore(navContainer, calendario);

// Generar calendario inicial
generarCalendario();

