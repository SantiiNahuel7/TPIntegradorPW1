document.addEventListener('DOMContentLoaded', () => {
    
    // 1. OBTENER EL ID DEL CURSO DESDE LA URL
    // (ej: de "detalle-curso.html?curso=css", obtiene "css")
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('curso'); // 'css', 'html', 'js', etc.

    // 2. BUSCAR LOS DATOS DEL CURSO en la "base de datos" (cursosDB)
    // Usamos el ID de la URL para encontrar el objeto correcto
    const cursoData = cursosDB[cursoId];

    // 3. MANEJAR SI EL CURSO NO SE ENCUENTRA
    if (!cursoData) {
        // Si no se encuentra el curso (ej. URL errónea), muestra un error
        document.getElementById('detalle-curso-container').innerHTML = 
            '<h1>Curso no encontrado</h1><p>Por favor, regresa al inicio y selecciona un curso válido.</p>';
        
        // Ocultar las otras secciones
        document.querySelector('.docente').style.display = 'none';
        document.querySelector('#cursos-destacados').style.display = 'none';
        return; // Detiene la ejecución del script
    }

    // 4. RELLENAR LA PLANTILLA CON LOS DATOS
    
    // Cambiar el título de la pestaña del navegador
    document.title = cursoData.titulo + ' - MentorApp';

    // Rellenar sección principal de información
    document.getElementById('imagen-curso').src = cursoData.imagen;
    document.getElementById('titulo-curso').textContent = cursoData.titulo;
    document.getElementById('tiempo-de-curso').textContent = 'Tiempo de Dedicación Necesario: ' + cursoData.tiempo;
    document.getElementById('descripcion').textContent = cursoData.descripcion;
    document.getElementById('requisito').textContent = 'Requisitos Previos: ' + cursoData.requisitos;
    document.getElementById('valor').textContent = cursoData.valor;
    document.getElementById('link-inscripcion').href = cursoData.linkFormulario;

    // Rellenar dinámicamente las unidades del curso
    const unidadesContainer = document.getElementById('unidades-container');
    unidadesContainer.innerHTML = ''; // Limpiamos el contenedor

    cursoData.unidades.forEach(unidad => {
        // 1. Crear la lista de temas (los <li>)
        const temasHtml = unidad.temas.map(tema => `<li>${tema}</li>`).join('');

        // 2. Crear el bloque <details> completo
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
        
        // 3. Añadirlo al contenedor
        unidadesContainer.innerHTML += unidadHtml;
    });

    // Rellenar sección del docente
    document.getElementById('profesor-foto').src = cursoData.docente.foto;
    document.getElementById('nombre-profesor').textContent = cursoData.docente.nombre;
    document.getElementById('profesor-rating').style.setProperty('--percent', cursoData.docente.rating + '%');
    document.getElementById('profesor-bio').textContent = cursoData.docente.bio;

});