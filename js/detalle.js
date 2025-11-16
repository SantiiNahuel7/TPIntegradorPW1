document.addEventListener('DOMContentLoaded', () => {
    
 
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('curso'); 

    const cursoData = cursosDB[cursoId];

    if (!cursoData) {
        
        document.getElementById('detalle-curso-container').innerHTML = 
            '<h1>Curso no encontrado</h1><p>Por favor, regresa al inicio y selecciona un curso válido.</p>';
        
        document.querySelector('.docente').style.display = 'none';
        document.querySelector('#cursos-destacados').style.display = 'none';
        return; 
    }

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
        
        unidadesContainer.innerHTML += unidadHtml;
    });

    document.getElementById('profesor-foto').src = cursoData.docente.foto;
    document.getElementById('nombre-profesor').textContent = cursoData.docente.nombre;
    document.getElementById('profesor-rating').style.setProperty('--percent', cursoData.docente.rating + '%');
    document.getElementById('profesor-bio').textContent = cursoData.docente.bio;

});