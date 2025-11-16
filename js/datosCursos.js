const cursosDB = {
    
    "css": {
        titulo: "Curso de CSS",
        tiempo: "30hs",
        descripcion: "El curso de CSS (Cascading Style Sheets) enseña a dar estilo y diseño a páginas web. Comienza con lo básico: cómo aplicar reglas CSS a elementos HTML, trabajar con colores, tipografías, márgenes y bordes. Luego avanza hacia temas más complejos como posicionamiento, modelos de caja, uso de flexbox y grid para crear diseños responsivos y modernos.",
        requisitos: "HTML",
        valor: "$25.000",
        imagen: "../../Imagenes/Cursos/css.png",
        linkFormulario: "../html/formulario.html",
        unidades: [
            {
                titulo: "INTRODUCCIÓN",
                temas: [
                    "¿Qué es CSS y para qué sirve?",
                    "Diferencia entre HTML y CSS",
                    "Formas de aplicar CSS: inline, interno y externo",
                    "Estructura básica de una regla CSS"
                ]
            },
            {
                titulo: "UNIDAD 1",
                temas: [
                    "Selectores básicos (elementos, clases, IDs)",
                    "Propiedades de texto y tipografía",
                    "Colores, fondos y bordes",
                    "El modelo de caja (box model)",
                    "Márgenes, padding y dimensiones"
                ]
            },
            {
                titulo: "UNIDAD 2",
                temas: [
                    "Posicionamiento (static, relative, absolute, fixed, sticky)",
                    "Flexbox: diseño flexible y alineación",
                    "CSS Grid: creación de layouts avanzados",
                    "Media Queries y diseño responsivo"
                ]
            }
        ],
        docente: {
            nombre: "Martín Fernández",
            foto: "../../Imagenes/Detalle de Curso/profesorCSS.jpg",
            bio: "Martín es diseñador web y front-end developer con más de 8 años de experiencia creando sitios y aplicaciones responsivas. Se especializa en CSS, animaciones y frameworks modernos, ayudando a sus alumnos a dominar desde lo básico hasta las técnicas más avanzadas de maquetación.",
            rating: 80 
        }
    },
    
    "html": {
        titulo: "Curso de HTML",
        tiempo: "20hs",
        descripcion: "Aprende a estructurar contenido web con HTML. Este curso cubre desde las etiquetas fundamentales hasta formularios, tablas y la semántica de HTML5, sentando la base indispensable para cualquier desarrollador web.",
        requisitos: "Ninguno",
        valor: "$20.000",
        imagen: "../../Imagenes/Cursos/html.png",
        linkFormulario: "../html/formulario.html",
        unidades: [
            {
                titulo: "INTRODUCCIÓN",
                temas: [
                    "¿Qué es HTML?",
                    "Estructura básica de un documento HTML",
                    "Etiquetas y atributos"
                ]
            },
            {
                titulo: "UNIDAD 1",
                temas: [
                    "Etiquetas de texto (p, h1-h6, strong, em)",
                    "Listas (ul, ol, li)",
                    "Enlaces (a) e Imágenes (img)"
                ]
            },
            {
                titulo: "UNIDAD 2",
                temas: [
                    "Formularios (form, input, label, button)",
                    "Tablas (table, tr, th, td)",
                    "HTML Semántico (header, footer, nav, article)"
                ]
            }
        ],
        docente: {
            nombre: "Jose Perez",
            foto: "../../Imagenes/Detalle de Curso/profesor.jpg",
            bio: "Jose es un desarrollador Front-End apasionado por la enseñanza. Con 6 años de experiencia, se especializa en crear experiencias de usuario accesibles y bien estructuradas. Su enfoque es construir una base sólida en HTML para todos sus estudiantes.",
            rating: 90
        }
    },

    "js": {
        titulo: "Curso de JavaScript",
        tiempo: "30hs",
        descripcion: "Domina el lenguaje de la web. Este curso te lleva desde los fundamentos (variables, funciones, condicionales) hasta conceptos avanzados como el DOM, asincronía (fetch, promesas) y ES6+, preparando el camino para frameworks modernos.",
        requisitos: "HTML y CSS",
        valor: "$30.000",
        imagen: "../../Imagenes/Cursos/javascript.png",
        linkFormulario: "../html/formulario.html",
        unidades: [
            {
                titulo: "FUNDAMENTOS",
                temas: [
                    "Variables (var, let, const) y Tipos de Datos",
                    "Operadores",
                    "Funciones y Scope",
                    "Condicionales (if, switch) y Bucles (for, while)"
                ]
            },
            {
                titulo: "DOM Y EVENTOS",
                temas: [
                    "¿Qué es el DOM?",
                    "Seleccionar elementos",
                    "Manipular el DOM (crear, modificar, eliminar)",
                    "Manejo de eventos (click, submit, input)"
                ]
            },
            {
                titulo: "JAVASCRIPT AVANZADO",
                temas: [
                    "Arrays y Objetos",
                    "Asincronía: Promesas y async/await",
                    "Fetch API para consumir datos",
                    "Conceptos de ES6+ (arrow functions, template literals)"
                ]
            }
        ],
        docente: {
            nombre: "Carlos Rivas",
            foto: "../../Imagenes/Detalle de Curso/profesorjsjpg.jpg", 
            bio: "Carlos es Full Stack Developer con una década de experiencia, especializándose en JavaScript y el ecosistema de React y Node.js. Le encanta desmitificar conceptos complejos y hacer que la programación sea accesible y divertida.",
            rating: 95
        }
    },

   "sql": {
        titulo: "Curso de SQL",
        tiempo: "35hs",
        descripcion: "Domina las bases de datos. Aprende a consultar, manipular y gestionar datos con SQL, el lenguaje estándar para bases de datos relacionales, desde cero.",
        requisitos: "Ninguno",
        valor: "$40.000",
        imagen: "../../Imagenes/Cursos/sql.png", 
        linkFormulario: "../html/formulario.html", 
        unidades: [
            {
                titulo: "INTRODUCCIÓN A BBDD",
                temas: [
                    "¿Qué es una base de datos relacional?",
                    "Modelos de datos",
                    "Introducción a SQL y principales motores (MySQL, PostgreSQL)"
                ]
            },
            {
                titulo: "CONSULTAS (SELECT)",
                temas: [
                    "SELECT y FROM",
                    "Filtrado de datos con WHERE",
                    "Ordenamiento con ORDER BY",
                    "Operadores lógicos (AND, OR, NOT)"
                ]
            },
            {
                titulo: "MANIPULACIÓN Y JOINS",
                temas: [
                    "INNER JOIN, LEFT JOIN, RIGHT JOIN",
                    "Funciones de agregación (COUNT, SUM, AVG, MAX, MIN)",
                    "Agrupamiento con GROUP BY",
                    "INSERT, UPDATE y DELETE"
                ]
            }
        ],
        docente: {
            nombre: "Laura Torres",
            foto: "../../Imagenes/Detalle de Curso/profesorasql.jpg", 
            bio: "Laura es Administradora de Bases de Datos (DBA) con 10 años de experiencia. Se especializa en optimización de consultas y modelado de datos para grandes volúmenes de información.",
            rating: 85
        }
    },

    "java": {
        titulo: "Curso de Java",
        tiempo: "30hs",
        descripcion: "Aprende Java, uno de los lenguajes más robustos y demandados. Este curso te llevará desde los fundamentos de la sintaxis hasta la Programación Orientada a Objetos (POO) y el desarrollo de aplicaciones backend.",
        requisitos: "Lógica de programación (deseable)",
        valor: "$30.000",
        imagen: "../../Imagenes/Cursos/java.png", 
        linkFormulario: "../html/formulario.html", 
        unidades: [
            {
                titulo: "FUNDAMENTOS DE JAVA",
                temas: [
                    "Instalación (JDK, IDE)",
                    "Sintaxis básica, variables y tipos de datos",
                    "Estructuras de control (if, else, switch)",
                    "Bucles (for, while)"
                ]
            },
            {
                titulo: "PROGRAMACIÓN ORIENTADA A OBJETOS (POO)",
                temas: [
                    "Clases y Objetos",
                    "Herencia y Polimorfismo",
                    "Encapsulamiento y Abstracción",
                    "Interfaces y Clases Abstractas"
                ]
            },
            {
                titulo: "TEMAS AVANZADOS",
                temas: [
                    "Manejo de colecciones (ArrayList, HashMap)",
                    "Manejo de Excepciones (Try-Catch)",
                    "Introducción a Spring Boot (Framework Backend)"
                ]
            }
        ],
        docente: {
            nombre: "Sofia Castro",
            foto: "../../Imagenes/Detalle de Curso/profesorJava.jpg", 
            bio: "Sofia es Arquitecta de Software con 15 años de experiencia en el ecosistema Java. Se especializa en construir soluciones empresariales escalables y microservicios.",
            rating: 92
        }
    },

    "uxui": {
        titulo: "Curso de Diseño UX/UI",
        tiempo: "70hs",
        descripcion: "Aprende a diseñar productos digitales que los usuarios amen. Cubriremos el proceso completo, desde la investigación de usuario (UX) hasta el diseño de interfaces visuales (UI).",
        requisitos: "Ninguno",
        valor: "$60.000",
        imagen: "../../Imagenes/Cursos/ui.png", 
        linkFormulario: "../html/formulario.html", 
        unidades: [
            {
                titulo: "FUNDAMENTOS UX (USER EXPERIENCE)",
                temas: [
                    "¿Qué es UX? Principios clave",
                    "Investigación de usuarios (User Research)",
                    "Creación de User Personas",
                    "Mapas de viaje del usuario (Journey Maps)"
                ]
            },
            {
                titulo: "FUNDAMENTOS UI (USER INTERFACE)",
                temas: [
                    "Principios de diseño visual (Jerarquía, Contraste, Espacio)",
                    "Teoría del color y Tipografía",
                    "Componentes de UI y Sistemas de Diseño"
                ]
            },
            {
                titulo: "DISEÑO Y PROTOTIPADO",
                temas: [
                    "Arquitectura de la Información",
                    "Wireframes (Baja y Alta fidelidad)",
                    "Prototipado interactivo (Figma)",
                    "Test de usabilidad"
                ]
            }
        ],
        docente: {
            nombre: "Sofía Medina",
            foto: "../../Imagenes/Detalle de Curso/profeux.jpg", 
            bio: "Sofía es Product Designer líder con experiencia en startups y grandes corporaciones. Le apasiona crear interfaces intuitivas y estéticas que resuelvan problemas reales del usuario.",
            rating: 90
        }
    }
};