// ===== Función para cambiar pantallas con efecto =====
function cambiarPantalla(pantallaActual, pantallaNueva) {
  // Fade out de pantalla actual
  pantallaActual.style.transition = "opacity 0.5s";
  pantallaActual.style.opacity = "0";
  
  setTimeout(() => {
    pantallaActual.style.display = "none";
    
    // Mostrar nueva pantalla
    pantallaNueva.style.display = "flex";
    pantallaNueva.style.transition = "opacity 0.5s";
    pantallaNueva.style.opacity = "0";
    
    setTimeout(() => {
      pantallaNueva.style.opacity = "1"; // Fade in
    }, 50);
  }, 500);
}

// ===== Inicializar cuando carga la página =====
window.addEventListener("load", () => {
  // Animación inicial del hero
  const titulo = document.querySelector(".hero .title");
  const subtitulo = document.querySelector(".hero .paragraph");
  const btnIniciar = document.querySelector(".hero__btn--iniciar");
  const btnCrear = document.querySelector(".hero__btn--crear");

  // Inicialmente invisible y desplazado
  [titulo, subtitulo, btnIniciar, btnCrear].forEach(el => {
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 1s, transform 1s";
    }
  });

  // Animaciones escalonadas
  setTimeout(() => { if (titulo) { titulo.style.opacity = "1"; titulo.style.transform = "translateY(0)"; }}, 200);
  setTimeout(() => { if (subtitulo) { subtitulo.style.opacity = "1"; subtitulo.style.transform = "translateY(0)"; }}, 400);
  setTimeout(() => { if (btnIniciar) { btnIniciar.style.opacity = "1"; btnIniciar.style.transform = "translateY(0)"; }}, 600);
  setTimeout(() => { if (btnCrear) { btnCrear.style.opacity = "1"; btnCrear.style.transform = "translateY(0)"; }}, 800);
});

// ===== Referencias a pantallas =====
const hero = document.querySelector(".hero"); // Cambiado a .hero consistente
const login = document.getElementById("login");
const registro = document.getElementById("registro");
const app = document.getElementById("app");

// ===== Event Listeners para navegación =====
document.addEventListener("DOMContentLoaded", () => {
  // Botones del Hero
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

  // Botones de continuar
  const btnLoginContinuar = document.getElementById("btnLoginContinuar");
  const btnRegistroContinuar = document.getElementById("btnRegistroContinuar");
  
  if (btnLoginContinuar) {
    btnLoginContinuar.addEventListener("click", () => {
      if (login && app) cambiarPantalla(login, app);
    });
  }
  
  if (btnRegistroContinuar) {
    btnRegistroContinuar.addEventListener("click", () => {
      if (registro && app) cambiarPantalla(registro, app);
    });
  }

  // ===== Efectos hover para todos los botones =====
  const todosLosBotones = document.querySelectorAll(".hero__btn, #btnLoginContinuar, #btnRegistroContinuar");
  
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
});
