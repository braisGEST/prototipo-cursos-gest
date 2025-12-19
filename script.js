/**
 * script.js - Sistema completo de gestión de cursos y eventos
 * Carga dinámica desde JSON, carrusel, modal, filtros y animaciones
 */

// ============================================================================
// VARIABLES GLOBALES
// ============================================================================

let articlesData = [];
let carouselInterval = null;
let originalFeaturedVisible = true;

// Artículos explicativos de Unreal Engine por especialidad
const UNREAL_ENGINE_ARTICLES = {
  "realtime": {
    "id": 9991,
    "titulo": "¿Por qué Unreal Engine para Realtime?",
    "descripcion": "Descubre por qué Unreal Engine de Epic Games es la plataforma líder mundial para producción en tiempo real, rendering interactivo y experiencias inmersivas.",
    "descripcionExtendida": "Unreal Engine 5 de Epic Games revoluciona la producción en tiempo real con tecnologías como Lumen (iluminación global dinámica totalmente en tiempo real), Nanite (geometría virtualizada con millones de polígonos), y un sistema de rendering que permite crear experiencias fotorealistas sin tiempos de espera. Utilizado por estudios de cine como ILM, The Third Floor y más para Virtual Production en series como The Mandalorian. UE5 elimina la barrera entre pre-renderizado y tiempo real, permitiendo iterar creativamente al instante. Ideal para cinematografía virtual, motion graphics, visualización de productos y cualquier proyecto que requiera feedback visual inmediato con calidad cinematográfica.",
    "tags": ["informacion"],
    "tipoEtiqueta": "Información",
    "linkImagen": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=80",
    "featured": false,
    "precio": "Gratis",
    "duracion": "Info",
    "horario": "Siempre disponible",
    "instructor": "Epic Games",
    "orden": 9991
  },
  "produccion-audiovisual": {
    "id": 9992,
    "titulo": "¿Por qué Unreal Engine para Producción Audiovisual?",
    "descripcion": "Unreal Engine de Epic Games transforma la producción audiovisual con Virtual Production, cinematografía virtual y flujos de trabajo revolucionarios.",
    "descripcionExtendida": "Epic Games ha convertido Unreal Engine 5 en el estándar de la industria audiovisual moderna. Producciones de Hollywood como The Mandalorian, Westworld, Batman y cientos más usan UE5 para Virtual Production, eliminando pantallas verdes y permitiendo que directores y cinematógrafos vean el resultado final en tiempo real durante el rodaje. Tecnologías como LED walls con nDisplay, Camera Tracking, Color Grading en tiempo real, y el sistema Sequencer para edición no lineal hacen de UE5 la herramienta definitiva. Empresas como Netflix, Disney+, HBO y Amazon Studios confían en Unreal Engine para reducir costes de postproducción, acelerar entregas y aumentar la creatividad en el set.",
    "tags": ["informacion"],
    "tipoEtiqueta": "Información",
    "linkImagen": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "Gratis",
    "duracion": "Info",
    "horario": "Siempre disponible",
    "instructor": "Epic Games",
    "orden": 9992
  },
  "arquitectura": {
    "id": 9993,
    "titulo": "¿Por qué Unreal Engine para Arquitectura?",
    "descripcion": "Unreal Engine de Epic Games revoluciona la visualización arquitectónica con renders en tiempo real, recorridos virtuales interactivos y presentaciones inmersivas.",
    "descripcionExtendida": "Unreal Engine 5 ha transformado la industria arquitectónica permitiendo a estudios crear visualizaciones fotorealistas en tiempo real. Con Lumen, los arquitectos pueden ver cambios de iluminación natural a lo largo del día instantáneamente. Nanite permite importar modelos CAD con millones de polígonos sin optimización. Estudios como Zaha Hadid Architects, BIG, Foster+Partners y cientos más usan UE5 para presentaciones interactivas a clientes, donde pueden explorar espacios en VR, cambiar materiales al instante, y tomar decisiones de diseño en tiempo real. Twinmotion, basado en Unreal Engine, es usado por más de 500,000 arquitectos. La integración con Revit, Rhino, SketchUp y Datasmith hace que el workflow sea fluido desde CAD hasta experiencia inmersiva.",
    "tags": ["informacion"],
    "tipoEtiqueta": "Información",
    "linkImagen": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "Gratis",
    "duracion": "Info",
    "horario": "Siempre disponible",
    "instructor": "Epic Games",
    "orden": 9993
  },
  "automocion": {
    "id": 9994,
    "titulo": "¿Por qué Unreal Engine para Automoción?",
    "descripcion": "Unreal Engine de Epic Games impulsa la industria automotriz con configuradores en tiempo real, HMI de vehículos, simulación y experiencias de marketing inmersivas.",
    "descripcionExtendida": "La industria automotriz ha adoptado Unreal Engine 5 como su plataforma de referencia. BMW, Mercedes-Benz, Audi, Porsche, Ferrari, Lamborghini y prácticamente todos los fabricantes premium usan UE5 para múltiples aplicaciones: configuradores de vehículos en tiempo real (cambia color, llantas, interiores al instante con rendering fotorealista), desarrollo de interfaces HMI (Human-Machine Interface) para pantallas de vehículos, simuladores de conducción para testing y training, marketing y lanzamientos virtuales de productos, y visualización de diseño antes de producir prototipos físicos. El plugin Automotive de Epic incluye shaders específicos para pintura de coche, sistemas de iluminación vehicular, y herramientas de CAD. Empresas como Tesla usan UE para sus simuladores de Autopilot.",
    "tags": ["informacion"],
    "tipoEtiqueta": "Información",
    "linkImagen": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "Gratis",
    "duracion": "Info",
    "horario": "Siempre disponible",
    "instructor": "Epic Games",
    "orden": 9994
  }
};

// ============================================================================
// DATOS DE ARTÍCULOS
// ============================================================================

/**
 * Datos de los artículos (incrustados para evitar necesidad de servidor)
 */
const ARTICLES_DATA = [
  {
    "id": 1,
    "titulo": "Máster en Virtual Production y Realtime Rendering",
    "descripcion": "Programa completo que cubre desde los fundamentos de Unreal Engine 5 hasta técnicas avanzadas de producción virtual, iluminación LED wall, tracking de cámaras y flujos de trabajo profesionales.",
    "descripcionExtendida": "Máster intensivo de 4 meses diseñado para profesionales del audiovisual, VFX y 3D que quieren dominar la producción virtual. Aprenderás Unreal Engine 5 desde cero, configuración de LED walls con nDisplay, sistemas de tracking óptico y mecánico, Lumen y Nanite, color grading en tiempo real, y gestión completa de proyectos de Virtual Production. Incluye prácticas con equipamiento profesional en platós con LED walls, casos de estudio de producciones reales como The Mandalorian, y proyecto final tutorizado. El programa culmina con certificación reconocida por la industria.",
    "tags": ["formacion", "realtime", "produccion-audiovisual"],
    "tipoEtiqueta": "Máster",
    "fechaInicio": "3 Feb 2026",
    "fechaFin": "31 May 2026",
    "linkImagen": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1400&q=80",
    "featured": true,
    "precio": "2.499€",
    "duracion": "4 meses (160 horas)",
    "horario": "Lun-Mié 18:00-22:00",
    "instructor": "Carlos Martínez & Laura Gómez",
    "orden": 1,
    "certification": "epic"
  },
  {
    "id": 2,
    "titulo": "Cinematografía Virtual con Unreal Engine 5",
    "descripcion": "Domina el arte de crear cinemáticas y secuencias cinematográficas en tiempo real. Desde el Sequencer hasta técnicas avanzadas de composición, iluminación narrativa y postproducción integrada.",
    "descripcionExtendida": "Curso avanzado de 7 semanas centrado en la creación de contenido cinematográfico con Unreal Engine 5. Aprenderás a usar el Sequencer como herramienta de edición no lineal, control avanzado de cámaras virtuales, técnicas de iluminación narrativa con Lumen, composición de planos según gramática cinematográfica, integración de audio y música, uso de Movie Render Queue para renders de alta calidad, y técnicas de postproducción dentro de UE5. Incluye análisis de secuencias reales de cine y videojuegos, ejercicios prácticos semanales, y proyecto final de cortometraje.",
    "tags": ["formacion", "realtime", "produccion-audiovisual"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "12 Mar 2026",
    "fechaFin": "30 Abr 2026",
    "linkImagen": "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "precio": "749€",
    "duracion": "7 semanas (56 horas)",
    "horario": "Mar-Jue 19:00-23:00",
    "instructor": "Laura Gómez",
    "orden": 2,
    "certification": "unreal"
  },
  {
    "id": 3,
    "titulo": "Workshop Intensivo: Virtual Production en Producción Audiovisual",
    "descripcion": "Fin de semana práctico en plató real con LED wall, cámaras tracking y workflow completo de VP. De la preproducción al resultado final.",
    "descripcionExtendida": "Workshop inmersivo de fin de semana en instalaciones profesionales equipadas con LED wall, sistemas de tracking, y cámaras broadcast. Trabajarás en equipos simulando una producción real: planificación técnica, creación de entornos 3D optimizados, configuración de nDisplay multi-pantalla, calibración de color LED wall vs cámara, tracking en vivo, dirección de fotografía con iluminación práctica y virtual, y captura con cámaras profesionales. Incluye sesión de troubleshooting de problemas típicos, casos de estudio de producciones reales, y material didáctico completo. Ideal para directores de fotografía, gaffer, operadores de cámara y técnicos de VP que quieren experiencia hands-on.",
    "tags": ["demo", "realtime", "produccion-audiovisual"],
    "tipoEtiqueta": "Workshop Práctico",
    "fechaInicio": "14 Feb 2026",
    "fechaFin": "16 Feb 2026",
    "linkImagen": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80",
    "featured": true,
    "precio": "899€",
    "duracion": "3 días (24 horas)",
    "horario": "Vie-Dom 09:00-17:00",
    "instructor": "Equipo VP Studio",
    "orden": 3
  },
  {
    "id": 4,
    "titulo": "Houdini para Realtime FX y Procedural Workflows",
    "descripcion": "Aprende a crear efectos procedurales optimizados para engines en tiempo real. Destrucciones, simulaciones, herramientas custom y pipeline de exportación a Unreal Engine.",
    "descripcionExtendida": "Workshop intensivo de 3 días sobre Houdini aplicado a producción realtime. Crearás sistemas de destrucción reutilizables, simulaciones de fluidos y humo optimizadas para baking, generadores procedurales de props y entornos, herramientas HDA personalizadas para tu equipo, y dominarás el workflow de exportación a Unreal Engine via FBX, Alembic y Houdini Engine. Incluye técnicas de optimización de geometría, LODs automáticos, vertex animation textures (VAT), y casos prácticos de estudios AAA. Requisito: conocimientos básicos de 3D y Unreal Engine.",
    "tags": ["formacion", "realtime"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "5 Abr 2026",
    "fechaFin": "7 Abr 2026",
    "linkImagen": "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "549€",
    "duracion": "3 días (24 horas)",
    "horario": "Vie-Dom 09:00-17:00",
    "instructor": "Miguel Ángel Torres",
    "orden": 4
  },
  {
    "id": 5,
    "titulo": "BIM a Realtime: Revit + Datasmith + Unreal para Arquitectura",
    "descripcion": "Pipeline completo desde modelado BIM hasta visualización interactiva en tiempo real. Optimización, materiales arquitectónicos y presentaciones inmersivas para clientes.",
    "descripcionExtendida": "Curso especializado de 4 semanas para arquitectos y visualizadores que trabajan con Revit y quieren adoptar tecnología realtime. Aprenderás el workflow completo con Datasmith para importar proyectos BIM a Unreal Engine 5 manteniendo jerarquías y metadatos, técnicas de optimización de geometría arquitectónica, creación de librerías de materiales PBR realistas, iluminación arch-viz con Lumen y luz natural dinámica, configuración de recorridos virtuales interactivos, integración de VR para revisiones de cliente, y renders de alta calidad con Path Tracer. Incluye plantillas de proyecto listas para usar y casos de estudio de estudios como Zaha Hadid Architects.",
    "tags": ["formacion", "arquitectura"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "10 Mar 2026",
    "fechaFin": "7 Abr 2026",
    "linkImagen": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "679€",
    "duracion": "4 semanas (32 horas)",
    "horario": "Mar-Jue 18:30-22:30",
    "instructor": "Ana Rodríguez",
    "orden": 5
  },
  {
    "id": 6,
    "titulo": "Meetup Realtime Spain: Networking y Tech Talks",
    "descripcion": "Encuentro mensual gratuito de la comunidad realtime española. Charlas técnicas, demos en vivo, networking y cervezas. Comparte proyectos y conecta con profesionales del sector.",
    "descripcionExtendida": "Meetup presencial gratuito y abierto a toda la comunidad de desarrolladores, artistas y técnicos que trabajan con tecnologías realtime. Cada mes presenta talks de 15-20 minutos sobre temas técnicos actuales, demos de proyectos personales o de estudio, sesiones de Q&A con expertos, y networking informal con bebidas y snacks. Ambiente relajado perfecto para compartir conocimientos, resolver dudas, encontrar colaboradores o simplemente conocer gente del sector. Temas recientes: Lumen optimization tips, Virtual Production troubleshooting, procedural world building, etc. Sin inscripción previa necesaria, entrada libre hasta completar aforo.",
    "tags": ["demo", "realtime"],
    "tipoEtiqueta": "Meetup Gratuito",
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
    "titulo": "Configuradores 3D para Automoción con Unreal Engine",
    "descripcion": "Crea configuradores interactivos de vehículos en tiempo real. Cambio de colores, materiales, llantas y opciones al instante con calidad fotorealista.",
    "descripcionExtendida": "Curso especializado de 5 semanas sobre desarrollo de configuradores 3D para la industria automotriz usando Unreal Engine 5. Aprenderás a importar y preparar modelos CAD de vehículos, crear sistemas de materiales procedurales para pintura automotive (metallic, pearlescent, matte), configurar variantes de piezas (llantas, spoilers, interiores), iluminación de showroom con HDRI, cámaras orbitales suaves, UI/UX para selección de opciones, y exportación para web con Pixel Streaming. Incluye casos prácticos de BMW, Audi y Tesla, optimización para real-time rendering, y proyecto final de configurador completo. Ideal para developers de automotive, diseñadores de producto y studios de visualización.",
    "tags": ["formacion", "automocion"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "18 Jun 2026",
    "fechaFin": "23 Jul 2026",
    "linkImagen": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "799€",
    "duracion": "5 semanas (40 horas)",
    "horario": "Vie-Dom 10:00-18:00",
    "instructor": "David Sánchez",
    "orden": 7
  },
  {
    "id": 8,
    "titulo": "Blueprint Avanzado: Arquitectura de Sistemas en UE5",
    "descripcion": "Domina patrones de diseño, comunicación entre sistemas, interfaces, debugging avanzado y arquitecturas escalables para proyectos complejos en Unreal Engine.",
    "descripcionExtendida": "Curso avanzado de 6 semanas enfocado en programación visual profesional con Blueprints. Aprenderás arquitectura MVC/MVVM aplicada a Blueprints, interfaces y abstract classes para código modular, event dispatchers y delegates para desacoplamiento, macros y function libraries reutilizables, debugging avanzado con breakpoints y watches, profiling y optimización (evitar Tick, usar timers, object pooling), comunicación Player-GameMode-GameState, manejo de datos con Data Tables y Structs, y patrones de diseño (Singleton, Factory, Observer). Incluye proyecto práctico de sistema de inventory, quest system y combat framework. Requisito: conocimientos intermedios de Blueprints.",
    "tags": ["formacion", "realtime"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "15 Abr 2026",
    "fechaFin": "30 May 2026",
    "linkImagen": "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "649€",
    "duracion": "6 semanas (48 horas)",
    "horario": "Lun-Mié 19:00-23:00",
    "instructor": "Pedro Jiménez",
    "orden": 8,
    "certification": "epic"
  },
  {
    "id": 9,
    "titulo": "Twinmotion Live: Presentaciones Arquitectónicas en Tiempo Real",
    "descripcion": "Workshop práctico de Twinmotion para arquitectos. Importa desde Revit/SketchUp, crea presentaciones impactantes y paseos virtuales en minutos.",
    "descripcionExtendida": "Workshop intensivo de fin de semana sobre Twinmotion, la herramienta de Unreal Engine diseñada específicamente para arquitectos. Perfecto para profesionales que buscan resultados rápidos sin curva de aprendizaje compleja. Aprenderás importación directa desde Revit, ArchiCAD, SketchUp con sincronización en vivo, librería de materiales y objetos arch-viz, configuración rápida de iluminación natural y artificial, creación de recorridos animados y presentaciones modo slideshow, exportación de imágenes y videos 4K, y presentaciones interactivas en tiempo real para clientes. Incluye licencia de prueba de Twinmotion, bibliotecas de assets, y plantillas listas para usar. Más de 500,000 arquitectos usan Twinmotion worldwide.",
    "tags": ["demo", "arquitectura"],
    "tipoEtiqueta": "Workshop Rápido",
    "fechaInicio": "7 Jun 2026",
    "fechaFin": "8 Jun 2026",
    "linkImagen": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "299€",
    "duracion": "2 días (16 horas)",
    "horario": "Sáb-Dom 09:00-17:00",
    "instructor": "Carla Martín",
    "orden": 9
  },
  {
    "id": 10,
    "titulo": "Niagara VFX: De Fundamentos a Efectos Avanzados",
    "descripcion": "Sistema de partículas de Unreal Engine 5. Fuego, humo, magia, explosiones, clima y efectos GPU-driven optimizados para producciones AAA.",
    "descripcionExtendida": "Curso completo de 4 semanas sobre Niagara, el sistema de partículas next-gen de UE5. Desde los fundamentos (emisores, módulos, parámetros) hasta técnicas avanzadas: GPU particles para miles de elementos, ribbon emitters para trails y beams, mesh particles para debris, simulaciones de fluidos simplificadas, sistemas modulares reutilizables, integración con Blueprints y gameplay, optimización de performance (LOD, culling, bounds), y debugging con Niagara Debugger. Incluye librería de +50 efectos listos (fuego, explosiones, magia, clima, impactos), análisis de VFX de juegos AAA, y proyecto final. Requisito: conocimientos básicos de UE5.",
    "tags": ["formacion", "realtime"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "15 Mar 2026",
    "fechaFin": "12 Abr 2026",
    "linkImagen": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    "featured": false,
    "precio": "549€",
    "duracion": "4 semanas (32 horas)",
    "horario": "Mar-Jue 19:00-23:00",
    "instructor": "Roberto Núñez",
    "orden": 10
  },
  {
    "id": 11,
    "titulo": "Simuladores de Conducción Racing con VR y Hardware Real",
    "descripcion": "Desarrollo completo de simuladores de conducción profesionales. Física vehicular realista, integración con volantes/pedales, circuitos, VR y optimización para 90fps+.",
    "descripcionExtendida": "Curso especializado de 8 semanas en desarrollo de simuladores de conducción usando Unreal Engine 5. Aprenderás configuración avanzada del Chaos Vehicle System para física realista (suspensión, neumáticos, aerodinámica), integración con hardware Logitech/Thrustmaster/Fanatec via plugins, Force Feedback programming, diseño de circuitos con splines y checkpoints, sistema de telemetría y data logging, optimización extrema para VR (90-120fps), sonido espacial de motores, multiplayer para carreras online, y AI opponents. Incluye análisis de sims profesionales como iRacing y Assetto Corsa, hardware de prueba disponible, y proyecto final funcional. Ideal para developers de automotive, gaming y training simulators.",
    "tags": ["formacion", "automocion", "realtime"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "1 Sep 2026",
    "fechaFin": "31 Oct 2026",
    "linkImagen": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "899€",
    "duracion": "8 semanas (64 horas)",
    "horario": "Mar-Jue 18:00-22:00",
    "instructor": "Elena Vargas & Racing Team",
    "orden": 11,
    "certification": "unreal"
  },
  {
    "id": 12,
    "titulo": "Foro Virtual Production España: Futuro del Audiovisual",
    "descripcion": "Mesa redonda gratuita con directores, cinematógrafos y técnicos de VP. Casos reales, tecnología LED wall, tracking, y oportunidades laborales en producción virtual.",
    "descripcionExtendida": "Evento presencial gratuito sobre el estado y futuro de la Virtual Production en España. Panel con profesionales de producciones nacionales e internacionales, directores de fotografía que han trabajado con LED walls, supervisores técnicos de VP, y representantes de Epic Games. Temas: proyectos en producción actualmente en España, casos de éxito y lecciones aprendidas, tecnologías LED wall vs green screen, inversión necesaria y ROI, formación y perfiles más demandados, y oportunidades para freelancers y estudios pequeños. Incluye demos en vivo de setup LED wall, sesión extendida de Q&A, y networking con buffet. Inscripción gratuita pero plazas limitadas, registro previo obligatorio.",
    "tags": ["demo", "realtime", "produccion-audiovisual"],
    "tipoEtiqueta": "Foro Gratuito",
    "fechaInicio": "12 Oct 2026",
    "fechaFin": "12 Oct 2026",
    "linkImagen": "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "Gratuito",
    "duracion": "Tarde (4 horas)",
    "horario": "Dom 16:00-20:00",
    "instructor": "Panel de la Industria",
    "orden": 12
  },
  {
    "id": 13,
    "titulo": "Substance 3D Suite Completa: Painter, Designer y Sampler",
    "descripcion": "Domina las tres herramientas de Adobe Substance para crear materiales PBR profesionales. Desde scanning hasta materiales procedurales 100% optimizados para realtime.",
    "descripcionExtendida": "Curso integral de 6 semanas cubriendo todo el ecosistema Substance 3D: Painter para hand-painting y texturizado de assets, Designer para materiales procedurales infinitamente variables, y Sampler para convertir fotos en materiales PBR. Aprenderás workflow completo desde high-poly sculpt hasta texturas optimizadas, smart materials y masks, generadores custom, integración con Unreal/Unity, atlas packing para mobile, exportación de texture sets, y automation con Python. Incluye librería de +200 materiales base, análisis de assets de juegos AAA, y proyecto final de texturizado completo de personaje o entorno. Usado por 95% de estudios AAA worldwide.",
    "tags": ["formacion", "realtime"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "1 Oct 2026",
    "fechaFin": "12 Nov 2026",
    "linkImagen": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80",
    "featured": false,
    "precio": "649€",
    "duracion": "6 semanas (48 horas)",
    "horario": "Mar-Jue 19:00-23:00",
    "instructor": "Alberto Mendoza",
    "orden": 13
  },
  {
    "id": 14,
    "titulo": "MetaHuman Facial Animation: De Mocap a Performance Realtime",
    "descripcion": "Crea personajes digitales fotorealistas y anima expresiones faciales con iPhone, Faceware o sistemas ópticos. Pipeline completo para cine, streaming y videojuegos.",
    "descripcionExtendida": "Curso avanzado de 5 semanas sobre MetaHuman Creator y animación facial profesional. Crearás personajes custom con MetaHuman Creator (anatomía, age, ethnicity), personalizarás meshes con Maya/Blender, configurarás rigs para animación facial (ARKit, FACS), capturarás performance con iPhone Live Link Face, integrarás sistemas profesionales como Faceware o Vicon, y optimizarás para diferentes plataformas (cine 4K, streaming, VR, mobile). Incluye retargeting de mocap, blendshapes authoring, corrective shapes, integración con body mocap, y casos de uso en The Matrix Awakens y Senua's Saga. Proyecto final: personaje completo con performance capture.",
    "tags": ["formacion", "realtime", "produccion-audiovisual"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "1 Ago 2026",
    "fechaFin": "5 Sep 2026",
    "linkImagen": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "featured": false,
    "precio": "749€",
    "duracion": "5 semanas (50 horas)",
    "horario": "Lun-Vie 19:00-23:00",
    "instructor": "Patricia Gil & Mocap Team",
    "orden": 14,
    "certification": "epic"
  },
  {
    "id": 15,
    "titulo": "Grasshopper + Unreal: Diseño Paramétrico y Viz Arquitectónica",
    "descripcion": "Conecta diseño paramétrico con visualización realtime. Genera fachadas procedurales, estructuras complejas y presenta proyectos interactivos a clientes en UE5.",
    "descripcionExtendida": "Workshop avanzado de fin de semana sobre diseño paramétrico con Grasshopper y visualización en Unreal Engine 5. Aprenderás fundamentos de Grasshopper para arquitectura, generación de geometrías complejas y fachadas paramétricas, exportación optimizada desde Rhino a UE5, conversión de definiciones de Grasshopper a Blueprints para interactividad en tiempo real, y creación de configuradores de diseño para clientes (cambia parámetros y ve resultados al instante). Incluye casos de estudios como Zaha Hadid, BIG y MVRDV, plugins útiles (Human, Lunchbox), y plantillas de proyectos. Ideal para arquitectos computacionales y parametric designers que quieren mostrar diseños de forma impactante.",
    "tags": ["demo", "arquitectura"],
    "tipoEtiqueta": "Workshop Avanzado",
    "fechaInicio": "15 Mayo 2026",
    "fechaFin": "16 Mayo 2026",
    "linkImagen": "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "399€",
    "duracion": "2 días (16 horas)",
    "horario": "Sáb-Dom 09:00-17:00",
    "instructor": "Jorge López",
    "orden": 15
  },
  {
    "id": 16,
    "titulo": "Postproducción en Realtime: Compositing y Color en UE5",
    "descripcion": "Lleva postproducción a tiempo real. Color grading, lens effects, atmospheric fog, post-process volumes y pipeline de finishing dentro de Unreal Engine.",
    "descripcionExtendida": "Curso de 3 semanas sobre postproducción y finishing dentro de Unreal Engine 5. Aprenderás el sistema completo de Post Process: color grading con LUTs y curves, bloom y lens flares cinematográficos, depth of field y bokeh shapes, motion blur, chromatic aberration, vignette, atmospheric effects (fog, god rays, volumetrics), y compositing multi-layer. También cubrirás Movie Render Queue para outputs de alta calidad, integración con DaVinci Resolve/Nuke, render passes y AOVs, y matching de look entre realtime y offline render. Ideal para coloristas, editors y DITs que trabajan en Virtual Production o quieren acelerar workflows de finishing.",
    "tags": ["formacion", "realtime", "produccion-audiovisual"],
    "tipoEtiqueta": "Formación",
    "fechaInicio": "10 Jul 2026",
    "fechaFin": "31 Jul 2026",
    "linkImagen": "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80",
    "featured": false,
    "precio": "549€",
    "duracion": "3 semanas (30 horas)",
    "horario": "Vie-Dom 17:00-23:00",
    "instructor": "Marina Castillo",
    "orden": 16
  },
  {
    "id": 17,
    "titulo": "Lumen Deep Dive: Iluminación Global Dinámica Optimizada",
    "descripcion": "Masterclass técnica sobre Lumen, el sistema de GI de UE5. Software ray tracing, hardware RT, optimización, troubleshooting y best practices para producción.",
    "descripcionExtendida": "Workshop técnico avanzado de un día completo sobre Lumen, el revolucionario sistema de Global Illumination dinámica de Unreal Engine 5. Profundizarás en la arquitectura interna de Lumen, diferencias entre software y hardware ray tracing, configuración de Lumen Scene para mejores resultados, optimización de performance (surface cache, probes, update rates), troubleshooting de light leaks y artifacts, balance entre calidad y framerate, mejores prácticas para diferentes plataformas (next-gen consoles, PC, VR), y uso de reflection captures como fallback. Incluye comparativas con otros sistemas GI, perfilado con Unreal Insights, y casos extremos. Requisito: experiencia con iluminación en UE5.",
    "tags": ["demo", "realtime"],
    "tipoEtiqueta": "Masterclass Técnica",
    "fechaInicio": "20 Sep 2026",
    "fechaFin": "20 Sep 2026",
    "linkImagen": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    "featured": false,
    "precio": "199€",
    "duracion": "1 día (8 horas)",
    "horario": "Sáb 10:00-18:00",
    "instructor": "Dr. Fernando Ruiz",
    "orden": 17
  },
  {
    "id": 18,
    "titulo": "Showroom Interactivo Automotive con Pixel Streaming",
    "descripcion": "Crea experiencias web interactivas de alta calidad para presentación de vehículos. Configurador 3D accesible desde cualquier navegador sin instalación.",
    "descripcionExtendida": "Workshop práctico de 2 días sobre creación de showrooms virtuales para la industria automotriz usando Pixel Streaming de Unreal Engine. Aprenderás a crear un configurador 3D completo de vehículo (colores, llantas, interiores, opciones), optimización extrema para streaming de alta calidad y baja latencia, configuración de servidores Linux/Windows con Cirrus, integración de UI web responsive (HTML/CSS/JS) que controla UE5, sistema de cámaras smooth para mostrar detalles, iluminación de showroom premium, y deployment en AWS/Azure para acceso global. Incluye análisis de configuradores reales de BMW y Porsche, best practices de UX para automotive, y plantilla de proyecto lista para customizar. Ideal para estudios de visualización y marketing automotive.",
    "tags": ["demo", "automocion"],
    "tipoEtiqueta": "Workshop Aplicado",
    "fechaInicio": "5 Nov 2026",
    "fechaFin": "6 Nov 2026",
    "linkImagen": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "499€",
    "duracion": "2 días (16 horas)",
    "horario": "Jue-Vie 09:00-17:00",
    "instructor": "David Sánchez",
    "orden": 18
  },
  {
    "id": 19,
    "titulo": "Lighting Artist Bootcamp: De Naturalista a Estilizado",
    "descripcion": "Domina iluminación en Unreal Engine 5. Desde daylight systems realistas con Lumen hasta estilos artísticos, mood lighting y cinematografía avanzada.",
    "descripcionExtendida": "Bootcamp intensivo de 4 semanas enfocado 100% en iluminación profesional con UE5. Cubrirás teoría de iluminación (3-point lighting, practical lights, motivated lighting), iluminación natural con Sky Atmosphere y SkyLight, Lumen vs baked lighting (cuándo usar cada uno), iluminación de interiores con volumetrics, luz nocturna y neon lights, estilos artísticos (noir, cyberpunk, fantasy), matching de reference photography, color temperature y mood, lighting para personajes y productos, optimización de shadowmaps y cascades, y cinematografía con lighting narrativo. Incluye análisis frame-by-frame de películas (Blade Runner 2049, The Batman), ejercicios diarios de reiluminación de escenas, y portfolio final de 5 scenes con diferentes moods.",
    "tags": ["formacion", "realtime", "produccion-audiovisual"],
    "tipoEtiqueta": "Bootcamp",
    "fechaInicio": "1 Nov 2026",
    "fechaFin": "28 Nov 2026",
    "linkImagen": "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1200&q=80",
    "featured": false,
    "precio": "799€",
    "duracion": "4 semanas (48 horas)",
    "horario": "Lun-Jue 19:00-22:00 + Sáb 10:00-16:00",
    "instructor": "Laura Gómez & Lighting Team",
    "orden": 19,
    "certification": "unreal"
  },
  {
    "id": 20,
    "titulo": "Motion Design Procedural: Unreal + Houdini + Niagara",
    "descripcion": "Crea motion graphics complejos y animaciones procedurales. Integra Houdini Engine, Niagara y Blueprints para efectos imposibles de animar manualmente.",
    "descripcionExtendida": "Workshop avanzado de 3 días sobre motion design procedural usando el poder combinado de Houdini, Niagara y Unreal Engine 5. Aprenderás a generar animaciones procedurales con Houdini (transforms, deformers, instancing), exportar como Houdini Digital Assets (HDA), integrar HDAs en UE5 con Houdini Engine plugin, crear efectos Niagara que reaccionan a audio (spectrum analysis, beat detection), animar con Blueprints y Timeline para control preciso, compositing de múltiples layers, y render de alta calidad para broadcast. Incluye análisis de trabajos de estudios como ManvsMachine y Territory Studio, técnicas de rendering optimizado, y proyecto final estilo broadcast package. Ideal para motion designers, VJ artists y creative coders.",
    "tags": ["demo", "realtime", "produccion-audiovisual"],
    "tipoEtiqueta": "Workshop Creativo",
    "fechaInicio": "5 Dic 2026",
    "fechaFin": "7 Dic 2026",
    "linkImagen": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    "featured": false,
    "precio": "599€",
    "duracion": "3 días (24 horas)",
    "horario": "Vie-Dom 10:00-18:00",
    "instructor": "Adriana Moreno & Miguel Ángel Torres",
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

  // Encontrar todas las especialidades del artículo
  const specialties = ['realtime', 'produccion-audiovisual', 'arquitectura', 'automocion'];
  const articleSpecialties = article.tags.filter(tag => specialties.includes(tag));

  // Mapeo de especialidades a etiquetas
  const specialtyLabels = {
    'realtime': 'Realtime',
    'produccion-audiovisual': 'Producción Audiovisual',
    'arquitectura': 'Arquitectura',
    'automocion': 'Automoción'
  };

  // Generar HTML para múltiples especialidades
  const specialtyTagsHTML = articleSpecialties.map(specialty =>
    `<span class="tag tag-specialty tag-specialty-${specialty}">${escapeHtml(specialtyLabels[specialty])}</span>`
  ).join('');

  // Certificación badge HTML si existe
  const certificationBadgeHTML = article.certification ?
    `<div class="certification-badge certification-${article.certification}">
      <img src="data/${article.certification === 'epic' ? 'certified epic.png' : 'certified unreal.png'}" alt="Certified ${article.certification === 'epic' ? 'Epic' : 'Unreal'}">
    </div>` : '';

  articleEl.innerHTML = `
    <div class="card-image" style="background-image:url('${escapeHtml(article.linkImagen)}');">
      ${certificationBadgeHTML}
      <div class="card-dates">
        ${article.fechaInicio ? `<span>📅 ${escapeHtml(article.fechaInicio)}</span>` : ''}
        ${article.fechaFin && article.fechaFin !== article.fechaInicio ? `<span>→ ${escapeHtml(article.fechaFin)}</span>` : ''}
      </div>
    </div>
    <div class="card-content">
      <h3>${escapeHtml(article.titulo)}</h3>
      <p>${escapeHtml(article.descripcion)}</p>
      <div class="card-footer">
        <span class="tag tag-type">${escapeHtml(article.tipoEtiqueta)}</span>
        ${specialtyTagsHTML}
      </div>
      <button type="button" class="btn-inscribirse" data-article-id="${article.id}">
        Inscribirse
      </button>
    </div>
  `;

  // Event listener para el botón de inscripción (abre popup global)
  const btnInscribirse = articleEl.querySelector('.btn-inscribirse');
  btnInscribirse.addEventListener('click', (e) => {
    e.stopPropagation();
    openInscriptionPopup(article);
  });

  return articleEl;
}

// ============================================================================
// POPUP DE INSCRIPCIÓN
// ============================================================================

/**
 * Abre el popup de inscripción para un artículo
 */
function openInscriptionPopup(article) {
  // Crear overlay si no existe
  let overlay = document.querySelector('.form-inscripcion-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'form-inscripcion-overlay';
    document.body.appendChild(overlay);
  }

  // Crear popup si no existe
  let popup = document.querySelector('.form-inscripcion');
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'form-inscripcion';
    document.body.appendChild(popup);
  }

  // Escapar HTML
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Crear contenido del formulario
  popup.innerHTML = `
    <form class="inscription-form">
      <div class="inscription-form-header">
        <h3 class="inscription-form-title">Inscripción: ${escapeHtml(article.titulo)}</h3>
        <button type="button" class="btn-form-close">×</button>
      </div>
      <div class="form-group">
        <label for="nombre-popup">Nombre</label>
        <input type="text" id="nombre-popup" name="nombre" required>
      </div>
      <div class="form-group">
        <label for="apellidos-popup">Apellidos</label>
        <input type="text" id="apellidos-popup" name="apellidos" required>
      </div>
      <div class="form-group">
        <label for="correo-popup">Correo electrónico</label>
        <input type="email" id="correo-popup" name="correo" required>
      </div>
      <div class="form-group">
        <label for="telefono-popup">Teléfono (opcional)</label>
        <input type="tel" id="telefono-popup" name="telefono">
      </div>
      <div class="form-actions">
        <button type="submit" class="btn-form-submit">Enviar inscripción</button>
        <button type="button" class="btn-form-cancel">Cancelar</button>
      </div>
    </form>
  `;

  // Mostrar popup y overlay
  setTimeout(() => {
    overlay.classList.add('active');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
  }, 10);

  // Event listeners
  const form = popup.querySelector('.inscription-form');
  const btnClose = popup.querySelector('.btn-form-close');
  const btnCancel = popup.querySelector('.btn-form-cancel');

  const closePopup = () => {
    overlay.classList.remove('active');
    popup.classList.remove('active');
    document.body.style.overflow = '';
    form.reset();
  };

  // Cerrar con botón X
  btnClose.addEventListener('click', closePopup);

  // Cerrar con botón cancelar
  btnCancel.addEventListener('click', closePopup);

  // Cerrar con click en overlay
  overlay.addEventListener('click', closePopup);

  // Cerrar con ESC
  const handleEsc = (e) => {
    if (e.key === 'Escape') {
      closePopup();
      document.removeEventListener('keydown', handleEsc);
    }
  };
  document.addEventListener('keydown', handleEsc);

  // Enviar formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      articleId: article.id,
      articleTitulo: article.titulo,
      nombre: formData.get('nombre'),
      apellidos: formData.get('apellidos'),
      correo: formData.get('correo'),
      telefono: formData.get('telefono') || 'No proporcionado'
    };

    console.log('📝 Inscripción recibida:', data);
    alert(`¡Gracias por tu inscripción, ${data.nombre}!\n\nTe hemos enviado un correo de confirmación a ${data.correo}`);

    closePopup();
    document.removeEventListener('keydown', handleEsc);
  });
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

  // Certificación badge HTML para carrusel si existe
  const certificationBadgeHTML = article.certification ?
    `<div class="certification-badge certification-${article.certification} featured-certification">
      <img src="data/${article.certification === 'epic' ? 'certified epic.png' : 'certified unreal.png'}" alt="Certified ${article.certification === 'epic' ? 'Epic' : 'Unreal'}">
    </div>` : '';

  slide.innerHTML = `
    <article class="featured-card" data-article-id="${article.id}">
      <div class="featured-image" style="background-image:url('${escapeHtml(article.linkImagen)}')">
        ${certificationBadgeHTML}
      </div>
      <div class="featured-content">
        <span class="featured-tag">${escapeHtml(article.tipoEtiqueta)}</span>
        <h2>${escapeHtml(article.titulo)} </h2>
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
    // Ignorar clicks en botones de inscripción y formularios
    if (e.target.closest('.btn-inscribirse') ||
        e.target.closest('.form-inscripcion') ||
        e.target.closest('.tag')) {
      return;
    }

    // Click en card regular
    const card = e.target.closest('.card');
    if (card && card.dataset.articleId) {
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
    threshold: 0.05,
    rootMargin: '0px 0px -10px 0px'
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
  const featuredCarousel = document.querySelector('.featured-carousel');

  if (buttons.length === 0 || cards.length === 0) {
    console.warn('Filter buttons or cards not found');
    return;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      const isActive = btn.classList.contains('active');

      // Scroll suave hacia arriba
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      // Si el botón ya está activo, desactivar filtro (toggle)
      if (isActive) {
        btn.classList.remove('active');

        // Restaurar carrusel de destacados
        if (featuredCarousel) {
          featuredCarousel.style.display = 'block';
          originalFeaturedVisible = true;
        }

        // Eliminar artículo de Unreal Engine
        removeUnrealEngineArticle();

        // Mostrar todas las cards
        cards.forEach(card => {
          card.classList.remove('hidden', 'fade-out', 'filtering');

          setTimeout(() => {
            if (window.cardObserver) {
              window.cardObserver.observe(card);
            }
          }, 50);
        });

        return;
      }

      // Actualizar botón activo
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Si es "Todos", restaurar estado original
      if (filter === 'all') {
        if (featuredCarousel) {
          featuredCarousel.style.display = 'block';
          originalFeaturedVisible = true;
        }

        removeUnrealEngineArticle();

        cards.forEach(card => {
          card.classList.remove('hidden', 'fade-out', 'filtering');

          setTimeout(() => {
            if (window.cardObserver) {
              window.cardObserver.observe(card);
            }
          }, 50);
        });

        return;
      }

      // Ocultar carrusel de destacados y mostrar artículo de Unreal Engine
      if (featuredCarousel) {
        featuredCarousel.style.display = 'none';
        originalFeaturedVisible = false;

        // Mostrar artículo explicativo de Unreal Engine específico
        showUnrealEngineArticle(filter);
      }

      // Fade out rápido para todas las cards
      cards.forEach(card => {
        card.classList.add('filtering', 'fade-out');
      });

      setTimeout(() => {
        cards.forEach(card => {
          const tags = card.dataset.tags;

          if (tags.includes(filter)) {
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

/**
 * Muestra el artículo explicativo de Unreal Engine según especialidad
 */
function showUnrealEngineArticle(specialty) {
  const container = document.querySelector('.container');
  const gridSection = document.querySelector('.grid');
  if (!container || !gridSection) return;

  // Primero eliminar cualquier artículo de Unreal Engine previo
  removeUnrealEngineArticle();

  // Obtener el artículo específico de la especialidad
  const unrealArticle = UNREAL_ENGINE_ARTICLES[specialty];
  if (!unrealArticle) return;

  // Escapar HTML
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  // Crear la card hero de Unreal Engine
  const heroCard = document.createElement('section');
  heroCard.className = 'unreal-hero-card';
  heroCard.dataset.unrealArticle = 'true';

  heroCard.innerHTML = `
    <div class="unreal-hero-content">
      <div class="unreal-hero-image" style="background-image: url('${escapeHtml(unrealArticle.linkImagen)}');">
        <div class="unreal-hero-overlay"></div>
      </div>
      <div class="unreal-hero-text">
        <span class="unreal-hero-tag">${escapeHtml(unrealArticle.tipoEtiqueta)}</span>
        <h2 class="unreal-hero-title">${escapeHtml(unrealArticle.titulo)}</h2>
        <p class="unreal-hero-description">${escapeHtml(unrealArticle.descripcionExtendida)}</p>
        <div class="unreal-hero-footer">
          <span class="unreal-hero-powered">Powered by Epic Games</span>
          <button type="button" class="unreal-hero-btn" onclick="alert('Más información sobre Unreal Engine')">
            Explorar Unreal Engine →
          </button>
        </div>
      </div>
    </div>
  `;

  // Insertarlo antes del grid
  container.insertBefore(heroCard, gridSection);

  // Animar entrada
  setTimeout(() => {
    heroCard.classList.add('visible');
  }, 100);
}

/**
 * Elimina el artículo explicativo de Unreal Engine
 */
function removeUnrealEngineArticle() {
  const unrealArticle = document.querySelector('[data-unreal-article="true"]');
  if (unrealArticle) {
    unrealArticle.remove();
  }
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
      const eventType = event.tags.find(tag => ['formacion', 'demo'].includes(tag)) || 'formacion';
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
