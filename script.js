// const y let
const hero = document.querySelector(".hero");
const login = document.getElementById("login");
const registro = document.getElementById("registro");
const app = document.getElementById("app");
const search = document.querySelector(".search");
const hotels = document.querySelector(".hotels");
const weather = document.querySelector('.weather');
const events = document.querySelector('.events');
const news = document.querySelector(".news");
const apiKey = "acd9bf9b61a7a8af901af6fad06ed5da";

let hotelesGenerados = [];
let hotelesVisible = 6;
let eventosActuales = [];
let noticiasVisibles = 6;
let categoriaActual = 'all';
//funcion para cambiar de pantalla con animacion
function cambiarPantalla(pantallaActual, pantallaNueva) {
  pantallaActual.style.transition = "opacity 0.5s";
  pantallaActual.style.opacity = "0";

  setTimeout(() => {
    pantallaActual.style.display = "none";
    pantallaNueva.style.display = "flex";
    pantallaNueva.style.transition = "opacity 0.5s";
    pantallaNueva.style.opacity = "0";

    setTimeout(() => {
      pantallaNueva.style.opacity = "1";
    }, 50);
  }, 500);
}

function mostrarSeccionApp(seccion) {
  if (search) search.style.display = 'none';
  if (hotels) hotels.style.display = 'none';
  if (weather) weather.style.display = 'none';
  if (events) events.style.display = 'none';
  if (news) news.style.display = 'none';

  switch (seccion) {
    case 'inicio':
      if (search) search.style.display = 'flex';
      if (hotels) hotels.style.display = 'block';
      break;
    case 'clima':
      if (weather) weather.style.display = 'block';
      break;
    case 'eventos':
      if (events) events.style.display = 'block';
      break;
    case 'noticias':
      if (news) {
        news.style.display = 'block';
        setTimeout(mostrarNoticias, 100);
      }
      break;
    case 'perfil':
      console.log('Sección de perfil - por implementar');
      break;
  }
}

window.addEventListener("load", () => {
  const titulo = document.querySelector(".hero .title");
  const subtitulo = document.querySelector(".hero .paragraph");
  const btnIniciar = document.querySelector(".hero__btn--iniciar");
  const btnCrear = document.querySelector(".hero__btn--crear");

  [titulo, subtitulo, btnIniciar, btnCrear].forEach(el => {
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 1s, transform 1s";
    }
  });

  setTimeout(() => { 
    if (titulo) { 
        titulo.style.opacity = "1"; 
        titulo.style.transform = "translateY(0)"; 
    } 
}, 200);

setTimeout(() => { 
    if (subtitulo) { 
        subtitulo.style.opacity = "1"; 
        subtitulo.style.transform = "translateY(0)"; 
    } 
}, 400);

setTimeout(() => { 
    if (btnIniciar) { 
        btnIniciar.style.opacity = "1"; 
        btnIniciar.style.transform = "translateY(0)"; 
    } 
}, 600);

setTimeout(() => { 
    if (btnCrear) { 
        btnCrear.style.opacity = "1"; 
        btnCrear.style.transform = "translateY(0)"; 
    } 
}, 800);
});

const nombres = ["Caribe", "Andino", "Mirador", "Palmas", "Sunset", "Plaza", "Royal", "Imperial", "Colonial", "Boutique"];
const ciudades = ["Cartagena", "Bogotá", "Medellín", "Cali", "Santa Marta"];
const caracteristicas = ["WiFi gratis", "Piscina", "Spa", "Gimnasio", "Restaurant", "Bar", "Parking", "Pet-friendly"];

function generarHotel() {
  const nombre = "Hotel " + nombres[Math.floor(Math.random() * nombres.length)];
  const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const precio = Math.floor(Math.random() * (300000 - 100000) + 100000);

  const features = [];
  const numFeatures = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < numFeatures; i++) {
    const feature = caracteristicas[Math.floor(Math.random() * caracteristicas.length)];
    if (!features.includes(feature)) {
      features.push(feature);
    }
  }

  return { nombre, ciudad, rating, precio, features };
}

function formatearPrecio(precio) {
  return precio.toLocaleString('es-CO');
}

function renderizarHotel(hotel, index) {
  const featuresHTML = hotel.features.map(feature =>
    `<span class="hotel-card__feature">${feature}</span>`
  ).join('');

  const badgeText = hotel.rating >= 4.5 ? "⭐ Premium" : hotel.rating >= 4.0 ? "✨ Popular" : "💫 Buena opción";

  const imagenesHoteles = [
    "hero14.jpg",
    "hero15.jpg",
    "hero16.jpg",
    "hero17.jpg",
    "hero18.jpg",
    "hero19.jpg",
    "hero20.jpg",
    "hero21.jpg",
    "hero22.jpg",
    "hero23.jpg",
    "hero24.jpg",
  ];

  return `
    <div class="hotel-card" data-ciudad="${hotel.ciudad}">
      <div class="hotel-card__image">
        <img src="${imagenesHoteles[index % imagenesHoteles.length]}" alt="${hotel.nombre}">
        <div class="hotel-card__badge">${badgeText}</div>
      </div>
      <div class="hotel-card__content">
        <h3 class="hotel-card__name">${hotel.nombre}</h3>
        <p class="hotel-card__city"><i class="fa-solid fa-city"></i> ${hotel.ciudad}</p>
        <div class="hotel-card__info">
          <div class="hotel-card__rating"><i class="fa-solid fa-star"></i> ${hotel.rating}/5</div>
          <div class="hotel-card__price">
            <div class="hotel-card__price-amount">$${formatearPrecio(hotel.precio)}</div>
            <div class="hotel-card__price-label">COP/noche</div>
          </div>
        </div>
        <div class="hotel-card__features">${featuresHTML}</div>
        <button class="hotel-card__btn" onclick="verMasHotel('${hotel.nombre}', '${hotel.ciudad}')">Ver detalles</button>
      </div>
    </div>
  `;
}

function inicializarHoteles() {
  for (let i = 0; i < 12; i++) {
    hotelesGenerados.push(generarHotel());
  }
  mostrarHoteles();
}

function mostrarHoteles(filtro = 'all') {
  const hotelList = document.getElementById("hotel-list");
  let hotelesFiltrados = hotelesGenerados;

  if (filtro !== 'all') {
    hotelesFiltrados = hotelesGenerados.filter(hotel => hotel.ciudad === filtro);
  }

  const hotelesAMostrar = hotelesFiltrados.slice(0, hotelesVisible);
  hotelList.innerHTML = hotelesAMostrar.map((hotel, index) =>
    renderizarHotel(hotel, index)
  ).join('');
}

function cargarMasHoteles() {
  while (hotelesGenerados.length < hotelesVisible + 6) {
    hotelesGenerados.push(generarHotel());
  }
  hotelesVisible += 6;
  mostrarHoteles();
}

function verMasHotel(nombre, ciudad) {
  alert(`¡Excelente elección! \n\nEstás viendo: ${nombre}\nUbicado en: ${ciudad}\n\n¿Te gustaría hacer una reserva?`);
}

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (res.ok) {
      let tempClass = 'templado';
      if (data.main.temp < 18) tempClass = 'frio';
      else if (data.main.temp > 28) tempClass = 'caliente';

      const weatherEmojis = {
        'clear sky': '☀️',
        'few clouds': '🌤️',
        'scattered clouds': '⛅',
        'broken clouds': '☁️',
        'shower rain': '🌦️',
        'rain': '🌧️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️'
      };

      const emoji = weatherEmojis[data.weather[0].description] || '<i class="fa-solid fa-cloud-sun"></i>';

      const climaHTML = `
        <div class="clima-card">
          <div class="ciudad-name">
            <i class="fa-solid fa-city"></i> ${data.name}, ${data.sys.country}
          </div>
          <div class="temperatura-principal ${tempClass}">
            ${Math.round(data.main.temp)}°C
          </div>
          <div class="descripcion-clima">
            ${emoji} ${data.weather[0].description}
          </div>
          <div class="detalles-clima">
            <div class="detalle-item">
              <span class="detalle-emoji"><i class="fa-solid fa-temperature-three-quarters"></i></span>
              <div class="detalle-valor">${Math.round(data.main.feels_like)}°C</div>
              <div class="detalle-label">Sensación</div>
            </div>
            <div class="detalle-item">
              <span class="detalle-emoji"><i class="fa-solid fa-droplet"></i></span>
              <div class="detalle-valor">${data.main.humidity}%</div>
              <div class="detalle-label">Humedad</div>
            </div>
            <div class="detalle-item">
              <span class="detalle-emoji"><i class="fa-solid fa-wind"></i></span>
              <div class="detalle-valor">${(data.wind.speed * 3.6).toFixed(1)} km/h</div>
              <div class="detalle-label">Viento</div>
            </div>
            <div class="detalle-item">
              <span class="detalle-emoji"><i class="fa-solid fa-gauge"></i></span>
              <div class="detalle-valor">${data.main.pressure} hPa</div>
              <div class="detalle-label">Presión</div>
            </div>
          </div>
        </div>
      `;

      document.getElementById("clima").innerHTML += climaHTML;

    } else {
      document.getElementById("clima").innerHTML += `
        <div class="error">
          <i class="fa-solid fa-circle-xmark"></i> No se encontró información para: <strong>${city}</strong>
        </div>
      `;
    }
  } catch (error) {
    document.getElementById("clima").innerHTML += `
      <div class="error">
        <i class="fa-solid fa-circle-exclamation"></i> Error al consultar el clima de: <strong>${city}</strong>
      </div>
    `;
  }
}

function buscarClima() {
  const ciudad = document.getElementById("ciudad").value.trim();

  if (ciudad === "") {
    document.getElementById("clima").innerHTML = `
      <div class="empty-state">
        Escribe el nombre de una ciudad para consultar el clima
      </div>
    `;
    return;
  }

  document.getElementById("clima").innerHTML = `
    <div class="loading">
      <i class="fa-solid fa-cloud-sun-rain"></i> Consultando clima de ${ciudad}...
    </div>
  `;

  setTimeout(() => {
    document.getElementById("clima").innerHTML = "";
    getWeather(ciudad);
  }, 800);

  document.getElementById("ciudad").value = "";
}

function cargarClimaInicial() {
  document.getElementById("clima").innerHTML = `
    <div class="loading">
      <i class="fa-solid fa-cloud-sun-rain"></i> Cargando clima de las principales ciudades de Colombia...
    </div>
  `;

  setTimeout(() => {
    document.getElementById("clima").innerHTML = "";
    const ciudades = ["Bogota", "Cartagena", "Medellin", "Cali", "Santa Marta", "Barranquilla"];

    ciudades.forEach((ciudad, index) => {
      setTimeout(() => {
        getWeather(ciudad);
      }, index * 400);
    });
  }, 1000);
}

const eventosSimulados = [
  {
    id: "1",
    nombre: "Festival de Rock al Parque 2025",
    fecha: "2025-10-15",
    hora: "18:00",
    lugar: "Parque Simón Bolívar",
    descripcion: "El festival de rock más grande de Colombia con bandas nacionales e internacionales",
    precio: "Gratis",
    categoria: "Música",
    imagen: "hero25.jpg"
  },
  {
    id: "2",
    nombre: "Mercado de las Pulgas Usaquén",
    fecha: "2025-09-22",
    hora: "09:00",
    lugar: "Plaza de Usaquén",
    descripcion: "Mercado dominical con artesanías, antigüedades y comida típica",
    precio: "Gratis",
    categoria: "Cultural",
    imagen: "hero26.jpg"
  },
  {
    id: "3",
    nombre: "Stand Up Comedy Night",
    fecha: "2025-09-25",
    hora: "20:00",
    lugar: "Teatro Café",
    descripcion: "Noche de comedia con los mejores humoristas bogotanos",
    precio: "$30.000",
    categoria: "Entretenimiento",
    imagen: "hero27.jpg"
  },
  {
    id: "4",
    nombre: "Conferencia Tech Bogotá",
    fecha: "2025-09-28",
    hora: "14:00",
    lugar: "Centro de Convenciones Ágora",
    descripcion: "Conferencia sobre las últimas tendencias en tecnología",
    precio: "$50.000",
    categoria: "Educación",
    imagen: "hero28.jpg"
  },
  {
    id: "5",
    nombre: "Ciclovía Nocturna",
    fecha: "2025-09-30",
    hora: "19:00",
    lugar: "Carrera 7ma",
    descripcion: "Recorrido nocturno en bicicleta por el centro histórico",
    precio: "Gratis",
    categoria: "Deportes",
    imagen: "hero29.jpg"
  },
  {
    id: "6",
    nombre: "Festival Gastronómico",
    fecha: "2025-10-05",
    hora: "12:00",
    lugar: "Parque 93",
    descripcion: "Degustación de platos típicos y fusión internacional",
    precio: "$25.000",
    categoria: "Gastronomía",
    imagen: "hero30.jpg"
  },
  {
    id: "7",
    nombre: "Exposición Botero",
    fecha: "2025-10-10",
    hora: "10:00",
    lugar: "Museo Botero",
    descripcion: "Nueva colección de obras del maestro Fernando Botero",
    precio: "$15.000",
    categoria: "Arte",
    imagen: "hero31.jpg"
  },
  {
    id: "8",
    nombre: "Salsa en la Plaza",
    fecha: "2025-10-01",
    hora: "16:00",
    lugar: "Plaza Bolívar",
    descripcion: "Clases gratuitas de salsa y presentaciones en vivo",
    precio: "Gratis",
    categoria: "Danza",
    imagen: "hero32.jpg"
  }
];

function formatearFecha(fecha) {
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

function renderizarEventos(eventos) {
  const container = document.getElementById('eventosContainer');
  const noEventos = document.getElementById('noEventos');

  if (!container) return;

  if (eventos.length === 0) {
    container.innerHTML = '';
    if (noEventos) noEventos.style.display = 'block';
    return;
  }

  if (noEventos) noEventos.style.display = 'none';

  container.innerHTML = eventos.map(evento => `
    <div class="evento-card" onclick="verDetalleEvento('${evento.id}')">
      <div class="evento-imagen">
  <img src="${evento.imagen}" alt="${evento.nombre}">
</div>
      <div class="evento-content">
        <h3 class="evento-titulo">${evento.nombre}</h3>
        
        <div class="evento-info">
          <span><i class="fa-solid fa-calendar"></i></span>
          <span>${formatearFecha(evento.fecha)}</span>
        </div>
        
        <div class="evento-info">
          <span><i class="fa-solid fa-clock"></i></span>
          <span>${evento.hora}</span>
        </div>
        
        <div class="evento-info">
          <span><i class="fa-solid fa-building"></i></span>
          <span>${evento.lugar}</span>
        </div>
        
        <p class="evento-descripcion">${evento.descripcion}</p>
        
        <div class="evento-precio">${evento.precio}</div>
        
        <span class="evento-categoria">${evento.categoria}</span>
      </div>
    </div>
  `).join('');
}

async function getEventosData() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'block';

  return new Promise((resolve) => {
    setTimeout(() => {
      if (loading) loading.style.display = 'none';
      resolve(eventosSimulados);
    }, 800);
  });
}

function filtrarEventos() {
  const busqueda = document.getElementById('buscarEventos');
  const categoria = document.getElementById('filtroCategoria');

  if (!busqueda || !categoria) return;

  const busquedaValue = busqueda.value.toLowerCase();
  const categoriaValue = categoria.value;

  let eventosFiltrados = eventosActuales;

  if (busquedaValue) {
    eventosFiltrados = eventosFiltrados.filter(evento =>
      evento.nombre.toLowerCase().includes(busquedaValue) ||
      evento.descripcion.toLowerCase().includes(busquedaValue) ||
      evento.lugar.toLowerCase().includes(busquedaValue)
    );
  }

  if (categoriaValue) {
    eventosFiltrados = eventosFiltrados.filter(evento =>
      evento.categoria === categoriaValue
    );
  }

  renderizarEventos(eventosFiltrados);
}

function verDetalleEvento(id) {
  const evento = eventosActuales.find(e => e.id === id);
  if (evento) {
    alert(`🎉 ${evento.nombre}\n\n<i class="fa-solid fa-calendar"></i> ${formatearFecha(evento.fecha)}\n<i class="fa-solid fa-clock"></i> ${evento.hora}\n<i class="fa-solid fa-building"></i> ${evento.lugar}\n<i class="fa-solid fa-money-bill-wave"></i> ${evento.precio}\n\n${evento.descripcion}`);
  }
}

async function iniciarEventos() {
  eventosActuales = await getEventosData();
  renderizarEventos(eventosActuales);
}

const noticiasData = [
  {
    id: 1,
    titulo: "Colombia registra récord de turistas internacionales en 2024",
    extracto: "El país recibió más de 6.2 millones de visitantes extranjeros, superando las cifras prepandemia y consolidándose como destino preferido en Latinoamérica.",
    categoria: "economia",
    fecha: "2025-8-15",
    fuente: "MinComercio",
    imagen: "hero12.jpg"
  },
  {
    id: 2,
    titulo: "Nuevas rutas aéreas conectarán Medellín con Europa",
    extracto: "Tres aerolíneas internacionales anunciaron vuelos directos desde el Aeropuerto José María Córdova hacia Madrid, París y Ámsterdam a partir de marzo.",
    categoria: "destinos",
    fecha: "2025-9-1",
    fuente: "Aerocivil",
    imagen: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    titulo: "Refuerzan seguridad en principales destinos turísticos",
    extracto: "La Policía Nacional implementa operativo especial en Cartagena, San Andrés y Santa Marta para garantizar la tranquilidad de los visitantes.",
    categoria: "seguridad",
    fecha: "2025-9-13",
    fuente: "Policía Nacional",
    imagen: "hero13.jpg"
  },
  {
    id: 4,
    titulo: "Festival de Flores de Medellín 2025 presenta su programación",
    extracto: "Más de 200 eventos culturales, desfiles y actividades gastronómicas conforman la agenda del evento más importante del año en la Ciudad de la Eterna Primavera.",
    categoria: "eventos",
    fecha: "2025-8-30",
    fuente: "Alcaldía Medellín",
    imagen: "hero9.jpg"
  },
  {
    id: 5,
    titulo: "Cartagena implementa nueva app para turistas",
    extracto: "La aplicación móvil oficial ofrece mapas interactivos, recomendaciones personalizadas y alertas de seguridad en tiempo real para visitantes.",
    categoria: "destinos",
    fecha: "2025-9-20",
    fuente: "Alcaldía Cartagena",
    imagen: "hero10.jpg"
  },
  {
    id: 6,
    titulo: "Alerta por temporada de lluvias en región Andina",
    extracto: "Recomiendan a turistas planificar viajes considerando las precipitaciones previstas para enero y febrero en Bogotá, Medellín y zona cafetera.",
    categoria: "seguridad",
    fecha: "2025-9-10",
    fuente: "IDEAM",
    imagen: "hero11.jpg"
  },
  {
    id: 7,
    titulo: "Rock al Parque 2025 confirma artistas internacionales",
    extracto: "El festival gratuito más grande de Latinoamérica anuncia la participación de bandas de renombre mundial para su edición del próximo año.",
    categoria: "eventos",
    fecha: "2025-9-09",
    fuente: "IDARTES",
    imagen: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop"
  },
  {
    id: 8,
    titulo: "Amazonas colombiano abre nuevas rutas ecoturísticas",
    extracto: "Comunidades indígenas presentan circuitos sostenibles que incluyen avistamiento de fauna, pesca artesanal y rituales ancestrales.",
    categoria: "destinos",
    fecha: "2025-9-08",
    fuente: "Corpoamazonia",
    imagen: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop"
  }
];

function formatearFechaNoticias(fecha) {
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(fecha).toLocaleDateString('es-CO', opciones);
}

function getCategoryName(categoria) {
  const nombres = {
    'destinos': 'Destinos',
    'seguridad': 'Seguridad',
    'eventos': 'Eventos',
    'economia': 'Economía'
  };
  return nombres[categoria] || 'General';
}

function renderizarNoticia(noticia) {
  return `
    <div class="news-card" data-category="${noticia.categoria}">
      <div class="news-card__image">
        <img src="${noticia.imagen}" alt="${noticia.titulo}">
        <div class="news-card__category">${getCategoryName(noticia.categoria)}</div>
      </div>
      <div class="news-card__content">
        <h3 class="news-card__title">${noticia.titulo}</h3>
        <p class="news-card__excerpt">${noticia.extracto}</p>
        <div class="news-card__meta">
          <div class="news-card__date"><i class="fa-solid fa-calendar"></i> ${formatearFechaNoticias(noticia.fecha)}</div>
          <div class="news-card__source">${noticia.fuente}</div>
        </div>
        <button class="news-card__btn" onclick="leerNoticia(${noticia.id})">Leer más</button>
      </div>
    </div>
  `;
}

function mostrarNoticias() {
  const newsGrid = document.getElementById('news-grid');
  if (!newsGrid) return;
  
  let noticiasFiltradas = noticiasData;

  if (categoriaActual !== 'all') {
    noticiasFiltradas = noticiasData.filter(noticia => noticia.categoria === categoriaActual);
  }

  const noticiasAMostrar = noticiasFiltradas.slice(0, noticiasVisibles);
  newsGrid.innerHTML = noticiasAMostrar.map(noticia => renderizarNoticia(noticia)).join('');
}

function cargarMasNoticias() {
  noticiasVisibles += 4;
  mostrarNoticias();
}

function leerNoticia(id) {
  const noticia = noticiasData.find(n => n.id === id);
  alert(`📰 ${noticia.titulo}\n\n${noticia.extracto}\n\nFuente: ${noticia.fuente}\nFecha: ${formatearFechaNoticias(noticia.fecha)}`);
}

function initEventListeners() {
  const buscarInput = document.getElementById('buscarEventos');
  const categoriaSelect = document.getElementById('filtroCategoria');

  if (buscarInput) {
    buscarInput.addEventListener('input', filtrarEventos);
  }

  if (categoriaSelect) {
    categoriaSelect.addEventListener('change', filtrarEventos);
  }
}

function setupDateValidation() {
  const today = new Date().toISOString().split('T')[0];
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');

  if (checkinInput && checkoutInput) {
    checkinInput.min = today;
    checkoutInput.min = today;

    checkinInput.addEventListener('change', function () {
      const checkinDate = new Date(this.value);
      const nextDay = new Date(checkinDate);
      nextDay.setDate(checkinDate.getDate() + 1);

      checkoutInput.min = nextDay.toISOString().split('T')[0];

      if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
        checkoutInput.value = nextDay.toISOString().split('T')[0];
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const btnIniciar = document.querySelector(".hero__btn--iniciar");
  const btnCrear = document.querySelector(".hero__btn--crear");

  if (btnIniciar) {
    btnIniciar.addEventListener("click", () => {
      if (hero && login) cambiarPantalla(hero, login);
    });
  }

  if (btnCrear) {
    btnCrear.addEventListener("click", () => {
      if (hero && registro) cambiarPantalla(hero, registro);
    });
  }

  const btnLoginContinuar = document.getElementById("btnLoginContinuar");
  const btnRegistroContinuar = document.getElementById("btnRegistroContinuar");

  if (btnLoginContinuar) {
    btnLoginContinuar.addEventListener("click", () => {
      if (login && app && search && hotels) {
        cambiarPantalla(login, app);
        setTimeout(() => {
          search.style.display = "flex";
          search.style.opacity = "1";
          hotels.style.display = "block";
          hotels.style.opacity = "1";
          if (weather) weather.style.display = "none";
          if (events) events.style.display = "none";
          if (news) news.style.display = "none";
        }, 550);
      }
    });
  }

  if (btnRegistroContinuar) {
    btnRegistroContinuar.addEventListener("click", () => {
      if (registro && app && search && hotels) {
        cambiarPantalla(registro, app);
        setTimeout(() => {
          search.style.display = "flex";
          search.style.opacity = "1";
          hotels.style.display = "block";
          hotels.style.opacity = "1";
          if (weather) weather.style.display = "none";
          if (events) events.style.display = "none";
          if (news) news.style.display = "none";
        }, 550);
      }
    });
  }

  const navLinks = document.querySelectorAll('.app__nav-list a[data-section]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const seccion = link.getAttribute('data-section');
      mostrarSeccionApp(seccion);

      navLinks.forEach(l => l.parentElement.classList.remove('active'));
      link.parentElement.classList.add('active');
    });
  });

  const todosLosBotones = document.querySelectorAll(".hero__btn, #btnLoginContinuar, #btnRegistroContinuar, .search__btn");

  todosLosBotones.forEach(btn => {
    if (btn) {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
        btn.style.transition = "transform 0.3s ease";
      });

      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
      });
    }
  });

  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filtro = btn.dataset.filter;
      hotelesVisible = 6;
      mostrarHoteles(filtro);
    });
  });

  const filterNewsBtn = document.querySelectorAll('.news-filter-btn');
  
  filterNewsBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      filterNewsBtn.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      categoriaActual = btn.dataset.category;
      noticiasVisibles = 6;
      mostrarNoticias();
    });
  });

  const ciudadInput = document.getElementById("ciudad");
  if (ciudadInput) {
    ciudadInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        buscarClima();
      }
    });
  }

  setupDateValidation();
  inicializarHoteles();
  cargarClimaInicial();
  initEventListeners();
  iniciarEventos();
  mostrarNoticias();
});