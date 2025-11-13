// barraDeBusqueda.js
export const cursos = [
  { name: "Html", url: "/TPIntegradorPW1/html/Detalle de Cursos/detalleCursoHtml.html" },
  { name: "Css", url: "/TPIntegradorPW1/html/Detalle de Cursos/detalleCursoCSS.html" },
  { name: "JavaScript", url: "/TPIntegradorPW1/html/Detalle de Cursos/detalleCursoJS.html" },
  { name: "Java", url: "/TPIntegradorPW1/html/Detalle de Cursos/detalleCursoJava.html" },
  { name: "SQL", url: "/TPIntegradorPW1/html/Detalle de Cursos/detalleCursoSQL.html" },
  { name: "UX", url: "/TPIntegradorPW1/html/Detalle de Cursos/detalleCursoUx.html" }
];

function performSearch(event) {
  if (event) event.preventDefault();

  const input = document.getElementById('search-input');
  if (!input) return;

  const query = input.value.trim().toLowerCase();
  const results = cursos.filter(c => c.name.toLowerCase().includes(query));

  const resultsContainer = document.getElementById('search-results');
  const autocompleteList = document.getElementById('autocomplete-list');

  if (!resultsContainer || !autocompleteList) return;

  autocompleteList.innerHTML = '';
  resultsContainer.innerHTML = '';

  if (results.length > 0) {
    resultsContainer.innerHTML = results
      .map(c => `<p class="resultado" data-url="${c.url}">${c.name}</p>`)
      .join('');

    document.querySelectorAll('.resultado').forEach(item => {
      item.addEventListener('click', function () {
        window.location.href = this.dataset.url;
      });
    });
  } else {
    resultsContainer.textContent = 'No se encontraron resultados';
  }
}

function setupAutocomplete() {
  const input = document.getElementById('search-input');
  const autocompleteList = document.getElementById('autocomplete-list');
  const resultsContainer = document.getElementById('search-results');

  if (!input || !autocompleteList || !resultsContainer) return;

  // 👇 Bloque modificado: muestra la lista solo cuando hay coincidencias
  input.addEventListener('input', function () {
    const query = this.value.trim().toLowerCase();
    autocompleteList.innerHTML = '';
    resultsContainer.innerHTML = '';

    if (query === "") {
      autocompleteList.style.display = 'none';
      return;
    }

    const filtered = cursos.filter(c => c.name.toLowerCase().includes(query));

    if (filtered.length === 0) {
      autocompleteList.style.display = 'none';
      return;
    }

    filtered.forEach(course => {
      const suggestion = document.createElement('div');
      suggestion.classList.add('autocomplete-suggestion');
      suggestion.textContent = course.name;
      suggestion.tabIndex = 0;

      suggestion.addEventListener('click', () => {
        input.value = course.name;
        autocompleteList.innerHTML = '';
        autocompleteList.style.display = 'none';
        window.location.href = course.url;
      });

      suggestion.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          input.value = course.name;
          autocompleteList.innerHTML = '';
          autocompleteList.style.display = 'none';
          window.location.href = course.url;
        }
      });

      autocompleteList.appendChild(suggestion);
    });

    autocompleteList.style.display = 'block';
  });
  // 👆 Hasta acá

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const q = this.value.trim().toLowerCase();
      const match = cursos.find(c => c.name.toLowerCase() === q);
      if (match) window.location.href = match.url;
      else performSearch();
    }
  });

  const btn = document.getElementById('search-button');
  if (btn) btn.addEventListener('click', performSearch);
}

export function initSearch() {
  if (!document.getElementById('search-input')) {
    document.addEventListener('DOMContentLoaded', () => {
      setupAutocomplete();
    });
  } else {
    setupAutocomplete();
  }
}
