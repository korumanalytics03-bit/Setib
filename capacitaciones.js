document.addEventListener("DOMContentLoaded", () => {
  // Inicializar íconos de Lucide
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // 1. VERIFICAR SESIÓN DEL USUARIO
  const usuarioGuardado = localStorage.getItem("usuarioLogueado");

  if (!usuarioGuardado) {
    // Si no se ha logueado, lo regresamos al login
    window.location.href = "login.html";
    return;
  }

  // Cargar datos en la barra superior
  const usuario = JSON.parse(usuarioGuardado);
  document.getElementById("userName").textContent = usuario.nombre || "Conductor";
  document.getElementById("userEmail").textContent = usuario.email || "conductor@setib.com";

  // 2. BOTÓN CERRAR SESIÓN
  const btnLogout = document.getElementById("btnLogout");
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
  });

  // 3. BOTÓN CONTINUAR / MARCAR COMO COMPLETADO
  const btnCompletar = document.getElementById("btnCompletarInducción");
  btnCompletar.addEventListener("click", () => {
    alert("¡Inducción completada con éxito! Redirigiendo a los videos de capacitación...");
    
    // Aquí puedes guardar que ya leyó la inducción o enviarlo a la siguiente página
    // window.location.href = "evaluacion.html";
  });
});

// Opcional en capacitaciones.js para videos .mp4 locales
const video = document.querySelector(".video-wrapper video");
const btnContinuar = document.getElementById("btnCompletarInducción");

if (video) {
  // Deshabilitar botón al inicio
  btnContinuar.style.opacity = "0.5";
  btnContinuar.style.pointerEvents = "none";

  // Habilitar cuando el video termine
  video.addEventListener("ended", () => {
    btnContinuar.style.opacity = "1";
    btnContinuar.style.pointerEvents = "auto";
    alert("¡Has terminado de ver el video! Ya puedes continuar.");
  });
}