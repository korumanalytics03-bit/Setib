/* =========================================================
   TransCundinamarca — Carrusel y controles
   ========================================================= */

(function () {
  const slides = [
    {
      title: "Flota moderna en ruta",
      text: "Buses blancos con mantenimiento preventivo, operando en corredores de la sabana.",
    },
    {
      title: "Interiores limpios y cómodos",
      text: "Asientos de tela en excelente estado, pasillo despejado y ventilación permanente.",
    },
    {
      title: "Cobertura zona industrial",
      text: "Recogidas y entregas dentro de los parques logísticos de Siberia y El Rosal.",
    },
    {
      title: "Seguridad visible",
      text: "Cinturón de seguridad en cada silla y protocolo de control de velocidad.",
    },
  ];

  let active = 0;
  const slideEls = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");
  const titleEl = document.getElementById("slide-title");
  const textEl = document.getElementById("slide-text");
  let timer = null;

  function show(i) {
    active = (i + slides.length) % slides.length;

    slideEls.forEach((el, idx) => {
      el.classList.toggle("active", idx === active);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === active);
    });

    titleEl.textContent = slides[active].title;
    textEl.textContent = slides[active].text;
  }

  function next() {
    show(active + 1);
  }

  function prev() {
    show(active - 1);
  }

  function start() {
    timer = setInterval(next, 6000);
  }

  function reset() {
    clearInterval(timer);
    start();
  }

  document.getElementById("nextBtn").addEventListener("click", () => {
    next();
    reset();
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    prev();
    reset();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      show(parseInt(dot.dataset.index, 10));
      reset();
    });
  });

  start();
})();
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar los iconos de Lucide
  lucide.createIcons();

  // Capturar envío del formulario
  const form = document.getElementById("quoteForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtener valores
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Datos de la solicitud:", data);

    // Feedback visual al usuario
    alert("¡Gracias por su solicitud! Nos pondremos en contacto pronto.");
    form.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.08)";
    }
  });
});

/* Paula */
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Cerrar si hace clic fuera del modal
window.onclick = function(event) {
  if (event.target.classList.contains('modal-overlay')) {
    event.target.style.display = 'none';
  }
}

/*COTIZACIÓN*/

async function procesarEnvio(e) {
  e.preventDefault(); // Evita la redirección a Formspree
  
  const form = e.target;
  const btn = document.getElementById("btnSubmit");
  const status = document.getElementById("form-status");
  const textoOriginal = btn.innerHTML;

  // Estado temporal al presionar
  btn.disabled = true;
  btn.innerHTML = "Enviando...";
  status.style.display = "none";

  try {
    const response = await fetch("https://formspree.io/f/mnpaordp", {
      method: "POST",
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.style.display = "block";
      status.style.backgroundColor = "#dcfce7";
      status.style.color = "#15803d";
      status.innerHTML = "✓ ¡Gracias! Hemos recibido su solicitud. Nos comunicaremos muy pronto.";
      form.reset();
    } else {
      status.style.display = "block";
      status.style.backgroundColor = "#fee2e2";
      status.style.color = "#b91c1c";
      status.innerHTML = "✕ Error al enviar el formulario. Verifica los datos o contáctanos por WhatsApp.";
    }
  } catch (err) {
    status.style.display = "block";
    status.style.backgroundColor = "#fee2e2";
    status.style.color = "#b91c1c";
    status.innerHTML = "✕ Error de conexión. Intenta de nuevo o escríbenos por WhatsApp.";
  } finally {
    btn.disabled = false;
    btn.innerHTML = textoOriginal;
  }
}