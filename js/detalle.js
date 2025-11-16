document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    
  
=======

    // 1. OBTENER EL ID DEL CURSO DESDE LA URL
    // (ej: de "detalle-curso.html?curso=css", obtiene "css")
>>>>>>> 01a72c0caf72b303a32b57a5b8d317c0932db361
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('curso'); 


    const cursoData = cursosDB[cursoId];

 
    if (!cursoData) {
<<<<<<< HEAD
      
        document.getElementById('detalle-curso-container').innerHTML = 
            '<h1>Curso no encontrado</h1><p>Por favor, regresa al inicio y selecciona un curso válido.</p>';
        
     
=======
        // Si no se encuentra el curso (ej. URL errónea), muestra un error
        document.getElementById('detalle-curso-container').innerHTML =
            '<h1>Curso no encontrado</h1><p>Por favor, regresa al inicio y selecciona un curso válido.</p>';

        // Ocultar las otras secciones
>>>>>>> 01a72c0caf72b303a32b57a5b8d317c0932db361
        document.querySelector('.docente').style.display = 'none';
        document.querySelector('#cursos-destacados').style.display = 'none';
        return; 
    }

<<<<<<< HEAD

    
=======
    // 4. RELLENAR LA PLANTILLA CON LOS DATOS

    // Cambiar el título de la pestaña del navegador
>>>>>>> 01a72c0caf72b303a32b57a5b8d317c0932db361
    document.title = cursoData.titulo + ' - MentorApp';

   
    document.getElementById('imagen-curso').src = cursoData.imagen;
    document.getElementById('titulo-curso').textContent = cursoData.titulo;
    document.getElementById('tiempo-de-curso').textContent = 'Tiempo de Dedicación Necesario: ' + cursoData.tiempo;
    document.getElementById('descripcion').textContent = cursoData.descripcion;
    document.getElementById('requisito').textContent = 'Requisitos Previos: ' + cursoData.requisitos;
    document.getElementById('valor').textContent = cursoData.valor;
    document.getElementById('link-inscripcion').href = cursoData.linkFormulario;

   
    const unidadesContainer = document.getElementById('unidades-container');
    unidadesContainer.innerHTML = ''; 

    cursoData.unidades.forEach(unidad => {
        
        const temasHtml = unidad.temas.map(tema => `<li>${tema}</li>`).join('');

    
        const unidadHtml = `
            <details>
                <summary>${unidad.titulo}</summary>
                <div>
                    <ul class="content">
                        ${temasHtml}
                    </ul>
                </div>
            </details>
        `;
<<<<<<< HEAD
        
=======

        // 3. Añadirlo al contenedor
>>>>>>> 01a72c0caf72b303a32b57a5b8d317c0932db361
        unidadesContainer.innerHTML += unidadHtml;
    });

    document.getElementById('profesor-foto').src = cursoData.docente.foto;
    document.getElementById('nombre-profesor').textContent = cursoData.docente.nombre;
    document.getElementById('profesor-rating').style.setProperty('--percent', cursoData.docente.rating + '%');
    document.getElementById('profesor-bio').textContent = cursoData.docente.bio;


   const botonInscribirse = document.getElementById('boton-inscribirse');

    botonInscribirse.addEventListener('click', (e) => {
        const datosEsenciales = {
            titulo: cursoData.titulo,
            valor: cursoData.valor,
        };

        localStorage.setItem('cursoSeleccionado', JSON.stringify(datosEsenciales));
    });

});

 
