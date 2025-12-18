/**
 * script.js - Sistema completo de gestión de cursos y eventos
 * Carga dinámica desde JSON, carrusel, modal, filtros y animaciones
 */

// ============================================================================
// VARIABLES GLOBALES
// ============================================================================

let articlesData = [];
let carouselInterval = null;

// ============================================================================
// DATOS DE ARTÍCULOS
// ============================================================================

/**
 * Datos de los artículos (incrustados para evitar necesidad de servidor)
 */
const ARTICLES_DATA = [
  {
    "id": 1,
    "titulo": "Programa Intensivo · Producción Realtime",
    "descripcion": "Formación central del año orientada a perfiles técnicos y creativos que buscan dominar flujos profesionales en Unreal Engine, VFX y sistemas en tiempo real.",
    "descripcionExtendida": "Programa intensivo de 4 meses diseñado para profesionales que buscan especializarse en producción realtime. Incluye módulos completos de Unreal Engine 5, Virtual Production, Real-time VFX, cinematografía virtual, y proyectos prácticos con casos reales de la industria. Trabajarás con hardware y software profesional, aprenderás workflows de estudios AAA, y completarás un proyecto final que podrás incluir en tu portfolio.",
    "tags": ["curso", "realtime"],
    "tipoEtiqueta": "Destacado",
    "fechaInicio": "1 Feb 2026",
    "fechaFin": "31 May 2026",
    "linkImagen": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=80",
    "featured": true,
    "precio": "1.499€",
    "duracion": "4 meses (120 horas)",
    "horario": "Lun-Mié 18:00-21:00",
    "instructor": "Carlos Martínez & Laura Gómez",
    "orden": 1
  },
  {
    "id": 2,
    "titulo": "Unreal Engine 5 · Realtime Cinematics",
    "descripcion": "Pipeline profesional para cinemáticas en tiempo real: iluminación, cámaras, Lumen y optimización.",
    "descripcionExtendida": "Aprende a crear cinemáticas cinematográficas en tiempo real con UE5. Domina el Sequencer, cámaras virtuales, iluminación dinámica con Lumen, Nanite para geometría de alta densidad, y técnicas de optimización de rendimiento para diferentes plataformas. Ideal para artistas técnicos y directores de fotografía que quieren dar el salto al realtime.",
    "tags": ["curso", "realtime"],
    "tipoEtiqueta": "Curso",
    "fechaInicio": "12 Mar 2026",
    "fechaFin": "30 Abr 2026",
    "linkImagen": "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "precio": "599€",
    "duracion": "7 semanas (42 horas)",
    "horario": "Mar-Jue 19:00-22:00",
    "instructor": "Laura Gómez",
    "orden": 2
  },
  {
    "id": 3,
    "titulo": "IA aplicada a Producción Audiovisual",
    "descripcion": "Casos reales de uso de IA en preproducción, edición, automatización y flujos creativos.",
    "descripcionExtendida": "Evento intensivo de un día donde exploraremos las aplicaciones prácticas de IA generativa en producción audiovisual. Stable Diffusion para concept art, ChatGPT para guiones, herramientas de edición asistida por IA, upscaling de video, denoising, y automatización de tareas repetitivas. Con ponentes de la industria compartiendo sus workflows reales.",
    "tags": ["evento", "ia"],
    "tipoEtiqueta": "Evento",
    "fechaInicio": "22 Feb 2026",
    "fechaFin": "22 Feb 2026",
    "linkImagen": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "precio": "Gratuito",
    "duracion": "1 día (8 horas)",
    "horario": "Sáb 10:00-18:00",
    "instructor": "Varios ponentes",
    "orden": 3
  },
  {
    "id": 4,
    "titulo": "Houdini · FX para Realtime",
    "descripcion": "Creación de efectos procedurales optimizados para motores en tiempo real.",
    "descripcionExtendida": "Workshop intensivo sobre Houdini para la creación de FX procedurales optimizados para engines de tiempo real. Aprende a crear sistemas de destrucción, simulaciones de fluidos simplificadas, generación de geometría procedural, y exportación eficiente a Unreal Engine. Ideal para artistas técnicos y FX artists.",
    "tags": ["workshop", "realtime"],
    "tipoEtiqueta": "Workshop",
    "fechaInicio": "5 Abr 2026",
    "fechaFin": "7 Abr 2026",
    "linkImagen": "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "349€",
    "duracion": "3 días (24 horas)",
    "horario": "Vie-Dom 09:00-17:00",
    "instructor": "Miguel Ángel Torres",
    "orden": 4
  },
  {
    "id": 5,
    "titulo": "IA para Automatización Creativa",
    "descripcion": "Uso práctico de IA en tareas creativas, scripting y producción audiovisual.",
    "descripcionExtendida": "Curso práctico sobre integración de herramientas de IA en workflows creativos. Aprende a usar APIs de OpenAI, Stable Diffusion, y otras herramientas de IA para automatizar tareas repetitivas, generar assets, optimizar procesos de producción, y crear pipelines inteligentes. Incluye scripting con Python para integración de IA.",
    "tags": ["curso", "ia"],
    "tipoEtiqueta": "Curso",
    "fechaInicio": "10 Mar 2026",
    "fechaFin": "10 Abr 2026",
    "linkImagen": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "449€",
    "duracion": "5 semanas (30 horas)",
    "horario": "Mar-Jue 18:30-21:30",
    "instructor": "Ana Rodríguez",
    "orden": 5
  },
  {
    "id": 6,
    "titulo": "Realtime Tech Meetup",
    "descripcion": "Encuentro técnico sobre flujos realtime, demos y casos reales.",
    "descripcionExtendida": "Meetup mensual gratuito para profesionales del realtime. Presentaciones técnicas, demos en vivo, networking, y discusiones sobre las últimas tecnologías en Unreal Engine, Unity, y producción virtual. Espacio ideal para conocer a otros profesionales del sector y compartir conocimientos.",
    "tags": ["evento", "realtime"],
    "tipoEtiqueta": "Evento",
    "fechaInicio": "5 May 2026",
    "fechaFin": "5 May 2026",
    "linkImagen": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "Gratuito",
    "duracion": "Tarde (4 horas)",
    "horario": "Lun 18:00-22:00",
    "instructor": "Comunidad Realtime",
    "orden": 6
  },
  {
    "id": 7,
    "titulo": "Workshop Houdini FX",
    "descripcion": "Introducción práctica a FX procedurales aplicados a tiempo real.",
    "descripcionExtendida": "Workshop introductorio a Houdini para artistas que quieren empezar con FX procedurales. Aprende los fundamentos de Houdini, creación de sistemas procedurales básicos, y exportación a engines de videojuegos. No se requiere experiencia previa con Houdini.",
    "tags": ["workshop", "realtime"],
    "tipoEtiqueta": "Workshop",
    "fechaInicio": "18 Jun 2026",
    "fechaFin": "20 Jun 2026",
    "linkImagen": "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "299€",
    "duracion": "3 días (18 horas)",
    "horario": "Vie-Dom 10:00-16:00",
    "instructor": "David Sánchez",
    "orden": 7
  },
  {
    "id": 8,
    "titulo": "Blueprint Avanzado en Unreal Engine",
    "descripcion": "Optimización y buenas prácticas para sistemas complejos con visual scripting en UE5.",
    "descripcionExtendida": "Curso avanzado de Blueprints en Unreal Engine 5. Aprende patrones de diseño, optimización de performance, debugging avanzado, comunicación entre sistemas, interfaces, macros, y arquitectura escalable para proyectos grandes. Ideal para programadores visuales que quieren llevar sus skills al siguiente nivel.",
    "tags": ["curso", "realtime"],
    "tipoEtiqueta": "Curso",
    "fechaInicio": "15 Abr 2026",
    "fechaFin": "30 May 2026",
    "linkImagen": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "549€",
    "duracion": "6 semanas (36 horas)",
    "horario": "Lun-Mié 19:00-22:00",
    "instructor": "Pedro Jiménez",
    "orden": 8
  },
  {
    "id": 9,
    "titulo": "Generative AI Summit",
    "descripcion": "Conferencia sobre modelos generativos aplicados a contenido audiovisual y gaming.",
    "descripcionExtendida": "Conferencia de un día sobre el futuro de la IA generativa en entretenimiento digital. Ponentes internacionales presentando las últimas investigaciones, herramientas comerciales, casos de estudio de estudios AAA, y debates sobre ética y futuro de la IA en la creación de contenido. Incluye sesiones de networking y demos interactivas.",
    "tags": ["evento", "ia"],
    "tipoEtiqueta": "Evento",
    "fechaInicio": "8 Jun 2026",
    "fechaFin": "8 Jun 2026",
    "linkImagen": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "89€",
    "duracion": "1 día (9 horas)",
    "horario": "Sáb 09:00-18:00",
    "instructor": "Ponentes internacionales",
    "orden": 9
  },
  {
    "id": 10,
    "titulo": "Visualización Arquitectónica · Unreal Engine",
    "descripcion": "Renderizado fotorealista y recorridos virtuales para proyectos de arquitectura.",
    "descripcionExtendida": "Workshop especializado en visualización arquitectónica con Unreal Engine. Aprende a crear renders fotorealistas, configurar iluminación natural y artificial, materiales PBR para arquitectura, y recorridos virtuales interactivos. Ideal para arquitectos y visualizadores que quieren adoptar realtime.",
    "tags": ["workshop", "arquitectura"],
    "tipoEtiqueta": "Workshop",
    "fechaInicio": "25 Jul 2026",
    "fechaFin": "27 Jul 2026",
    "linkImagen": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "449€",
    "duracion": "3 días (24 horas)",
    "horario": "Vie-Dom 09:00-17:00",
    "instructor": "Carla Martín",
    "orden": 10
  },
  {
    "id": 11,
    "titulo": "Simulación Automovilística · Configuración VR",
    "descripcion": "Desarrollo de experiencias de conducción realista con VR y física avanzada.",
    "descripcionExtendida": "Curso especializado en simulación automovilística con Unreal Engine. Configuración de física vehicular realista, integración con hardware de simulación (volantes, pedales), desarrollo de circuitos, VR para inmersión total, y optimización de rendimiento para experiencias fluidas. Ideal para desarrolladores de simuladores.",
    "tags": ["curso", "automovilismo"],
    "tipoEtiqueta": "Curso",
    "fechaInicio": "1 Sep 2026",
    "fechaFin": "30 Oct 2026",
    "linkImagen": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "649€",
    "duracion": "8 semanas (48 horas)",
    "horario": "Mar-Jue 18:00-21:00",
    "instructor": "Elena Vargas",
    "orden": 11
  },
  {
    "id": 12,
    "titulo": "Virtual Production Forum",
    "descripcion": "Mesa redonda con profesionales sobre el futuro de la producción virtual en España.",
    "descripcionExtendida": "Foro gratuito sobre el estado actual y futuro de la producción virtual en España. Panel de expertos de estudios de cine, productoras, y empresas tech discutiendo tendencias, oportunidades, casos de éxito, y retos del sector. Sesión de Q&A y networking al final.",
    "tags": ["evento", "realtime"],
    "tipoEtiqueta": "Evento",
    "fechaInicio": "12 Oct 2026",
    "fechaFin": "12 Oct 2026",
    "linkImagen": "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "Gratuito",
    "duracion": "Tarde (3 horas)",
    "horario": "Lun 17:00-20:00",
    "instructor": "Panel de expertos",
    "orden": 12
  },
  {
    "id": 13,
    "titulo": "Stable Diffusion para Concept Art",
    "descripcion": "Uso de modelos de difusión para acelerar procesos de preproducción artística.",
    "descripcionExtendida": "Workshop sobre Stable Diffusion y otras herramientas de IA generativa aplicadas a concept art. Aprende a configurar modelos localmente, fine-tuning, ControlNet para control preciso, inpainting, outpainting, y workflows híbridos mezclando IA con herramientas tradicionales de digital painting.",
    "tags": ["workshop", "ia"],
    "tipoEtiqueta": "Workshop",
    "fechaInicio": "20 Nov 2026",
    "fechaFin": "22 Nov 2026",
    "linkImagen": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "299€",
    "duracion": "3 días (18 horas)",
    "horario": "Vie-Dom 10:00-16:00",
    "instructor": "Sofía Ramírez",
    "orden": 13
  },
  {
    "id": 14,
    "titulo": "Niagara VFX Fundamentals",
    "descripcion": "Sistema de partículas de Unreal Engine 5 desde cero hasta efectos avanzados.",
    "descripcionExtendida": "Workshop completo sobre el sistema Niagara de UE5. Desde los fundamentos de emisores y módulos, hasta efectos avanzados como simulaciones de fluidos, GPU particles, ribbons, mesh particles, y optimización de performance. Ideal para artistas VFX que quieren dominar Niagara.",
    "tags": ["workshop", "realtime"],
    "tipoEtiqueta": "Workshop",
    "fechaInicio": "15 Mar 2026",
    "fechaFin": "17 Mar 2026",
    "linkImagen": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    "featured": false,
    "precio": "349€",
    "duracion": "3 días (24 horas)",
    "horario": "Vie-Dom 09:00-17:00",
    "instructor": "Roberto Núñez",
    "orden": 14
  },
  {
    "id": 15,
    "titulo": "Diseño Paramétrico para Arquitectura",
    "descripcion": "Modelado generativo y procedural para proyectos arquitectónicos complejos.",
    "descripcionExtendida": "Curso avanzado de diseño paramétrico aplicado a arquitectura. Uso de Grasshopper, Houdini y Unreal Engine para crear sistemas procedurales, optimización de geometría, generación de fachadas, y visualización en tiempo real. Aprende workflows profesionales de estudios de arquitectura innovadores.",
    "tags": ["evento", "arquitectura"],
    "tipoEtiqueta": "Evento",
    "fechaInicio": "1 Mayo 2026",
    "fechaFin": "1 Mayo 2026",
    "linkImagen": "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "199€",
    "duracion": "1 día (8 horas)",
    "horario": "Sáb 09:00-18:00",
    "instructor": "Jorge López",
    "orden": 15
  },
  {
    "id": 16,
    "titulo": "Grooming & Hair Systems",
    "descripcion": "Creación y renderizado de pelo y sistemas de grooming realtime.",
    "descripcionExtendida": "Workshop especializado en hair systems para realtime. Creación de grooms realistas, optimización para engines, sistemas de LOD para pelo, simulación física, y técnicas de card-based hair. Trabajo con herramientas como Xgen, Ornatrix, y el sistema de grooming nativo de Unreal Engine 5.",
    "tags": ["workshop", "realtime"],
    "tipoEtiqueta": "Workshop",
    "fechaInicio": "10 Jul 2026",
    "fechaFin": "12 Jul 2026",
    "linkImagen": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    "featured": false,
    "precio": "379€",
    "duracion": "3 días (20 horas)",
    "horario": "Vie-Dom 09:30-16:30",
    "instructor": "Marina Castillo",
    "orden": 16
  },
  {
    "id": 17,
    "titulo": "MetaHuman Creator Advanced",
    "descripcion": "Creación de personajes digitales fotorealistas con MetaHuman.",
    "descripcionExtendida": "Curso avanzado sobre MetaHuman Creator de Epic Games. Personalización avanzada de personajes, integración con pipelines de animación facial, uso de performance capture, rigging custom, optimización de assets, y técnicas de rendering para lograr el máximo realismo en personajes digitales.",
    "tags": ["curso", "realtime"],
    "tipoEtiqueta": "Curso",
    "fechaInicio": "1 Ago 2026",
    "fechaFin": "30 Ago 2026",
    "linkImagen": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "featured": false,
    "precio": "499€",
    "duracion": "4 semanas (32 horas)",
    "horario": "Lun-Jue 19:00-23:00",
    "instructor": "Patricia Gil",
    "orden": 17
  },
  {
    "id": 18,
    "titulo": "Real-time Ray Tracing",
    "descripcion": "Masterclass sobre implementación de ray tracing en tiempo real.",
    "descripcionExtendida": "Evento técnico avanzado sobre ray tracing en tiempo real. Teoría de path tracing, implementación en Unreal Engine, optimización de performance, balance entre rasterización y raytracing, DLSS/FSR, y casos prácticos de producciones AAA. Incluye sesiones hands-on con hardware RTX.",
    "tags": ["evento", "realtime"],
    "tipoEtiqueta": "Evento",
    "fechaInicio": "15 Sep 2026",
    "fechaFin": "15 Sep 2026",
    "linkImagen": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    "featured": false,
    "precio": "129€",
    "duracion": "1 día (8 horas)",
    "horario": "Sáb 10:00-18:00",
    "instructor": "Dr. Fernando Ruiz",
    "orden": 18
  },
  {
    "id": 19,
    "titulo": "Substance Designer para Games",
    "descripcion": "Creación de materiales procedurales de alta calidad para videojuegos.",
    "descripcionExtendida": "Curso completo de Substance Designer orientado a videojuegos. Creación de materiales PBR procedurales, texturas tilables, máscaras complejas, generación de variaciones, optimización para realtime, y integración con Unreal Engine y Unity. Aprende el workflow profesional usado en la industria AAA.",
    "tags": ["curso", "realtime"],
    "tipoEtiqueta": "Curso",
    "fechaInicio": "5 Oct 2026",
    "fechaFin": "20 Nov 2026",
    "linkImagen": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
    "featured": false,
    "precio": "579€",
    "duracion": "7 semanas (42 horas)",
    "horario": "Mar-Jue 18:30-21:30",
    "instructor": "Alberto Mendoza",
    "orden": 19
  },
  {
    "id": 20,
    "titulo": "Motion Design con Unreal",
    "descripcion": "Diseño de motion graphics y animaciones con Unreal Engine 5.",
    "descripcionExtendida": "Workshop sobre motion design usando Unreal Engine como herramienta creativa. Desde los fundamentos de composición y timing, hasta técnicas avanzadas de animación procedural, uso de blueprints para motion graphics, render de alta calidad, y pipeline de postproducción. Ideal para motion designers que quieren explorar realtime.",
    "tags": ["workshop", "realtime"],
    "tipoEtiqueta": "Workshop",
    "fechaInicio": "5 Dic 2026",
    "fechaFin": "7 Dic 2026",
    "linkImagen": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    "featured": false,
    "precio": "349€",
    "duracion": "3 días (21 horas)",
    "horario": "Vie-Dom 09:00-16:00",
    "instructor": "Adriana Moreno",
    "orden": 20
  }
];

// ============================================================================
// CARGA DE DATOS
// ============================================================================

/**
 * Carga los artículos desde los datos incrustados
 */
function loadArticlesFromData() {
  articlesData = ARTICLES_DATA;
  console.log(`✅ Loaded ${articlesData.length} articles from data`);
  return articlesData;
}

// ============================================================================
// RENDERIZADO DE ARTÍCULOS
// ============================================================================

/**
 * Renderiza los artículos regulares en el grid
 */
function renderArticlesFromJSON(articles) {
  const gridSection = document.querySelector('.grid');

  if (!gridSection) {
    console.error('Grid section not found');
    return;
  }

  // Limpiar grid existente
  gridSection.innerHTML = '';

  // Filtrar solo artículos no destacados y ordenar
  const regularArticles = articles
    .filter(a => !a.featured)
    .sort((a, b) => a.orden - b.orden);

  console.log(`📦 Rendering ${regularArticles.length} regular articles`);

  regularArticles.forEach(article => {
    const card = createCardFromJSON(article);
    gridSection.appendChild(card);
  });
}

/**
 * Crea un elemento card desde un objeto artículo
 */
function createCardFromJSON(article) {
  const articleEl = document.createElement('article');
  articleEl.className = 'card';
  articleEl.dataset.tags = article.tags.join(' ');
  articleEl.dataset.articleId = article.id;

  // Escapar HTML para prevenir XSS
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Encontrar la especialidad del artículo
  const specialties = ['realtime', 'ia', 'arquitectura', 'automovilismo'];
  const specialty = article.tags.find(tag => specialties.includes(tag));
  const specialtyLabel = specialty ? specialty.charAt(0).toUpperCase() + specialty.slice(1) : '';

  articleEl.innerHTML = `
    <div class="card-image" style="background-image:url('${escapeHtml(article.linkImagen)}');">
      <span class="tag tag-left">${escapeHtml(article.tipoEtiqueta)}</span>
      ${specialty ? `<span class="tag tag-right tag-specialty-${specialty}">${escapeHtml(specialtyLabel)}</span>` : ''}
    </div>
    <div class="card-content">
      <h3>${escapeHtml(article.titulo)}</h3>
      <p>${escapeHtml(article.descripcion)}</p>
      <div class="date">
        ${article.fechaInicio ? `<span>Inicio: ${escapeHtml(article.fechaInicio)}</span>` : ''}
        ${article.fechaFin ? `<span>Fin: ${escapeHtml(article.fechaFin)}</span>` : ''}
      </div>
    </div>
  `;

  return articleEl;
}

// ============================================================================
// CARRUSEL DE DESTACADOS
// ============================================================================

/**
 * Renderiza el carrusel con los artículos destacados
 */
function renderCarouselFromJSON(articles) {
  const featuredArticles = articles
    .filter(a => a.featured)
    .slice(0, 3); // Solo los primeros 3 destacados

  if (featuredArticles.length === 0) {
    console.warn('No featured articles found');
    return;
  }

  console.log(`🎠 Rendering carousel with ${featuredArticles.length} featured articles`);

  const carouselTrack = document.querySelector('.carousel-track');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  if (!carouselTrack || !indicatorsContainer) {
    console.error('Carousel elements not found');
    return;
  }

  // Limpiar contenedores
  carouselTrack.innerHTML = '';
  indicatorsContainer.innerHTML = '';

  // Crear slides
  featuredArticles.forEach((article, index) => {
    const slide = createCarouselSlide(article, index === 0);
    carouselTrack.appendChild(slide);

    // Crear indicador
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
    indicator.dataset.slide = index;
    indicator.setAttribute('aria-label', `Ir al slide ${index + 1}`);
    indicatorsContainer.appendChild(indicator);
  });
}

/**
 * Crea un slide del carrusel
 */
function createCarouselSlide(article, isActive) {
  const slide = document.createElement('div');
  slide.className = `carousel-slide ${isActive ? 'active' : ''}`;

  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  slide.innerHTML = `
    <article class="featured-card" data-article-id="${article.id}">
      <div class="featured-image" style="background-image:url('${escapeHtml(article.linkImagen)}')"></div>
      <div class="featured-content">
        <span class="featured-tag">${escapeHtml(article.tipoEtiqueta)}</span>
        <h2>${escapeHtml(article.titulo)}</h2>
        <p>${escapeHtml(article.descripcion)}</p>
        <div class="featured-dates">
          ${article.fechaInicio ? `<span>Inicio: ${escapeHtml(article.fechaInicio)}</span>` : ''}
          ${article.fechaFin ? `<span>Fin: ${escapeHtml(article.fechaFin)}</span>` : ''}
        </div>
      </div>
    </article>
  `;

  return slide;
}

/**
 * Inicializa la funcionalidad del carrusel
 */
function initializeCarousel() {
  const track = document.querySelector('.carousel-track');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const indicators = document.querySelectorAll('.indicator');

  if (!track || slides.length === 0) {
    console.warn('Carousel not ready');
    return;
  }

  let currentSlide = 0;
  const totalSlides = slides.length;

  /**
   * Navega a un slide específico
   */
  function goToSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Actualizar estados activos
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === currentSlide);
    });
  }

  // Event listeners para navegación
  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  }

  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => goToSlide(i));
  });

  // Auto-play (cada 5 segundos)
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }

  carouselInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);

  // Pausar auto-play al hacer hover
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
    });

    carouselContainer.addEventListener('mouseleave', () => {
      if (carouselInterval) {
        clearInterval(carouselInterval);
      }
      carouselInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 5000);
    });
  }

  // Touch swipe support para móvil
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
      goToSlide(currentSlide + 1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      goToSlide(currentSlide - 1);
    }
  }, { passive: true });

  console.log('✅ Carousel initialized with', totalSlides, 'slides');
}

// ============================================================================
// MODAL DE ARTÍCULO
// ============================================================================

/**
 * Inicializa la funcionalidad del modal
 */
function initializeModal() {
  const modal = document.getElementById('article-modal');
  const overlay = modal?.querySelector('.modal-overlay');
  const closeBtn = modal?.querySelector('.modal-close');

  if (!modal) {
    console.error('Modal not found');
    return;
  }

  /**
   * Abre el modal con la información del artículo
   */
  function openModal(articleId) {
    const article = articlesData.find(a => a.id === parseInt(articleId));

    if (!article) {
      console.error('Article not found:', articleId);
      return;
    }

    populateModal(article);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el modal
   */
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Rellena el modal con los datos del artículo
   */
  function populateModal(article) {
    const modalImage = modal.querySelector('.modal-image');
    const modalTag = modal.querySelector('.modal-tag');
    const modalTitle = modal.querySelector('.modal-body h2');
    const modalDescription = modal.querySelector('.modal-description');
    const modalPrecio = modal.querySelector('#modal-precio');
    const modalDuracion = modal.querySelector('#modal-duracion');
    const modalHorario = modal.querySelector('#modal-horario');
    const modalInstructor = modal.querySelector('#modal-instructor');
    const modalFechaInicio = modal.querySelector('#modal-fecha-inicio');
    const modalFechaFin = modal.querySelector('#modal-fecha-fin');

    if (modalImage) modalImage.style.backgroundImage = `url('${article.linkImagen}')`;
    if (modalTag) modalTag.textContent = article.tipoEtiqueta;
    if (modalTitle) modalTitle.textContent = article.titulo;
    if (modalDescription) modalDescription.textContent = article.descripcionExtendida || article.descripcion;
    if (modalPrecio) modalPrecio.textContent = article.precio || 'Consultar';
    if (modalDuracion) modalDuracion.textContent = article.duracion || 'Por definir';
    if (modalHorario) modalHorario.textContent = article.horario || 'Flexible';
    if (modalInstructor) modalInstructor.textContent = article.instructor || 'Por confirmar';
    if (modalFechaInicio) modalFechaInicio.textContent = article.fechaInicio ? `Inicio: ${article.fechaInicio}` : '';
    if (modalFechaFin) modalFechaFin.textContent = article.fechaFin ? `Fin: ${article.fechaFin}` : '';
  }

  // Event listeners del modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  // Cerrar con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Abrir modal al hacer click en cards
  document.addEventListener('click', (e) => {
    // Click en card regular
    const card = e.target.closest('.card');
    if (card && card.dataset.articleId && !e.target.closest('.tag')) {
      openModal(card.dataset.articleId);
      return;
    }

    // Click en featured card del carrusel
    const featuredCard = e.target.closest('.featured-card');
    if (featuredCard && featuredCard.dataset.articleId) {
      openModal(featuredCard.dataset.articleId);
      return;
    }
  });

  console.log('✅ Modal initialized');
}

// ============================================================================
// EFECTOS DE SCROLL
// ============================================================================

/**
 * Inicializa los efectos de scroll del header
 */
function initializeScrollEffects() {
  const header = document.querySelector('header');

  if (!header) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  console.log('✅ Scroll effects initialized');
}

// ============================================================================
// ANIMACIONES DE CARDS
// ============================================================================

/**
 * Inicializa los observers para animaciones de aparición de cards
 */
function initializeCardObservers() {
  const allCards = document.querySelectorAll('.card');

  if (allCards.length === 0) {
    console.warn('No cards found for observation');
    return;
  }

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('fade-out');
      } else {
        if (entry.target.classList.contains('visible')) {
          entry.target.classList.add('fade-out');
          entry.target.classList.remove('visible');
        }
      }
    });
  }, observerOptions);

  allCards.forEach(card => {
    cardObserver.observe(card);
  });

  // Guardar observer globalmente para poder re-inicializar
  window.cardObserver = cardObserver;

  console.log(`✅ Card observers initialized for ${allCards.length} cards`);
}

// ============================================================================
// SISTEMA DE FILTROS
// ============================================================================

/**
 * Inicializa el sistema de filtros de artículos
 */
function initializeFilterSystem() {
  const buttons = document.querySelectorAll('.tag[data-filter]');
  const cards = document.querySelectorAll('.card[data-tags]');

  if (buttons.length === 0 || cards.length === 0) {
    console.warn('Filter buttons or cards not found');
    return;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Actualizar botón activo
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Fade out rápido para todas las cards
      cards.forEach(card => {
        card.classList.add('filtering', 'fade-out');
      });

      setTimeout(() => {
        cards.forEach(card => {
          const tags = card.dataset.tags;

          if (filter === 'all' || tags.includes(filter)) {
            card.classList.remove('hidden', 'fade-out');

            // Re-observar la card para la animación de scroll
            if (window.cardObserver) {
              window.cardObserver.unobserve(card);
            }

            card.classList.remove('visible');

            setTimeout(() => {
              if (window.cardObserver) {
                window.cardObserver.observe(card);
              }
              card.classList.remove('filtering');
            }, 50);
          } else {
            card.classList.add('hidden');
            card.classList.remove('visible', 'fade-out', 'filtering');
          }
        });
      }, 200);
    });
  });

  console.log(`✅ Filter system initialized with ${buttons.length} buttons`);
}

// ============================================================================
// CALENDARIO DE EVENTOS
// ============================================================================

/**
 * Renderiza el calendario de eventos por mes
 */
function renderEventCalendar(articles) {
  const calendarContainer = document.getElementById('event-calendar');

  if (!calendarContainer) {
    console.warn('Calendar container not found');
    return;
  }

  // Meses del año
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Agrupar artículos por mes
  const eventsByMonth = {};

  articles.forEach(article => {
    if (!article.fechaInicio) return;

    // Parsear la fecha (formato: "1 Feb 2026" o "12 Mar 2026")
    const dateParts = article.fechaInicio.split(' ');
    const monthName = dateParts[1];

    // Convertir nombre de mes a número
    const monthMap = {
      'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11,
      'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
      'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };

    const monthIndex = monthMap[monthName];

    if (monthIndex !== undefined) {
      if (!eventsByMonth[monthIndex]) {
        eventsByMonth[monthIndex] = [];
      }

      eventsByMonth[monthIndex].push({
        ...article,
        day: parseInt(dateParts[0])
      });
    }
  });

  // Limpiar calendario
  calendarContainer.innerHTML = '';

  // Renderizar cada mes que tenga eventos
  months.forEach((monthName, index) => {
    const monthEvents = eventsByMonth[index];

    if (!monthEvents || monthEvents.length === 0) return;

    // Ordenar eventos por día
    monthEvents.sort((a, b) => a.day - b.day);

    const monthCard = document.createElement('div');
    monthCard.className = 'calendar-month';

    const monthHeader = document.createElement('div');
    monthHeader.className = 'month-header';
    monthHeader.textContent = monthName;

    const eventsContainer = document.createElement('div');
    eventsContainer.className = 'month-events';

    monthEvents.forEach(event => {
      const eventEl = document.createElement('div');
      const eventType = event.tags.find(tag => ['curso', 'evento', 'workshop'].includes(tag)) || 'evento';
      eventEl.className = `calendar-event ${eventType}`;
      eventEl.dataset.articleId = event.id;

      eventEl.innerHTML = `
        <div class="event-date">${event.fechaInicio}${event.fechaFin && event.fechaFin !== event.fechaInicio ? ' - ' + event.fechaFin : ''}</div>
        <div class="event-title">${event.titulo}</div>
        <div class="event-type">${event.tipoEtiqueta}</div>
      `;

      // Click para abrir modal
      eventEl.addEventListener('click', () => {
        const modal = document.getElementById('article-modal');
        if (modal) {
          const article = articlesData.find(a => a.id === event.id);
          if (article) {
            // Usar la misma función que abre el modal desde las cards
            const modalImage = modal.querySelector('.modal-image');
            const modalTag = modal.querySelector('.modal-tag');
            const modalTitle = modal.querySelector('.modal-body h2');
            const modalDescription = modal.querySelector('.modal-description');
            const modalPrecio = modal.querySelector('#modal-precio');
            const modalDuracion = modal.querySelector('#modal-duracion');
            const modalHorario = modal.querySelector('#modal-horario');
            const modalInstructor = modal.querySelector('#modal-instructor');
            const modalFechaInicio = modal.querySelector('#modal-fecha-inicio');
            const modalFechaFin = modal.querySelector('#modal-fecha-fin');

            if (modalImage) modalImage.style.backgroundImage = `url('${article.linkImagen}')`;
            if (modalTag) modalTag.textContent = article.tipoEtiqueta;
            if (modalTitle) modalTitle.textContent = article.titulo;
            if (modalDescription) modalDescription.textContent = article.descripcionExtendida || article.descripcion;
            if (modalPrecio) modalPrecio.textContent = article.precio || 'Consultar';
            if (modalDuracion) modalDuracion.textContent = article.duracion || 'Por definir';
            if (modalHorario) modalHorario.textContent = article.horario || 'Flexible';
            if (modalInstructor) modalInstructor.textContent = article.instructor || 'Por confirmar';
            if (modalFechaInicio) modalFechaInicio.textContent = article.fechaInicio ? `Inicio: ${article.fechaInicio}` : '';
            if (modalFechaFin) modalFechaFin.textContent = article.fechaFin ? `Fin: ${article.fechaFin}` : '';

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        }
      });

      eventsContainer.appendChild(eventEl);
    });

    monthCard.appendChild(monthHeader);
    monthCard.appendChild(eventsContainer);
    calendarContainer.appendChild(monthCard);
  });

  console.log(`📅 Calendar rendered with events from ${Object.keys(eventsByMonth).length} months`);
}

// ============================================================================
// INICIALIZACIÓN PRINCIPAL
// ============================================================================

/**
 * Inicializa toda la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing application...');

  // 1. Inicializar scroll effects inmediatamente
  initializeScrollEffects();

  // 2. Cargar artículos desde datos incrustados
  const articles = loadArticlesFromData();

  if (articles && articles.length > 0) {
    // Datos cargados correctamente
    console.log('📊 Rendering content from data...');

    // Renderizar carrusel y artículos
    renderCarouselFromJSON(articles);
    renderArticlesFromJSON(articles);
    renderEventCalendar(articles);

    // Pequeña espera para que el DOM se actualice
    setTimeout(() => {
      // Inicializar componentes interactivos
      initializeCarousel();
      initializeCardObservers();
      initializeFilterSystem();
      initializeModal();

      console.log('✨ Application initialized successfully!');
    }, 100);
  } else {
    // Fallback: usar artículos hardcodeados si existen
    console.warn('⚠️ Using fallback hardcoded articles (if any)');

    // Inicializar componentes básicos
    initializeCardObservers();
    initializeFilterSystem();
  }
});
