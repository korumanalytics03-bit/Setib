document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") lucide.createIcons();

  const loginForm = document.getElementById("loginForm");
  const googleBtn = document.getElementById("googleBtn");

  // 1. SIMULAR LOGIN TRADICIONAL (3 Correos de prueba)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Lista de usuarios autorizados para la simulación
    const usuariosPermitidos = [
      {
        email: "admin@setib.com",
        password: "123456",
        nombre: "Administrador SETIB",
        rol: "Administrador"
      },
      {
        email: "za.jjfa@hotmail.com",
        password: "123456",
        nombre: "Usuario Prueba Hotmail",
        rol: "Conductor / Personal"
      },
      {
        email: "conductor@setib.com",
        password: "123456",
        nombre: "Conductor Principal",
        rol: "Conductor / Personal"
      }
    ];

    // Buscamos si coincide correo y contraseña
    const usuarioValido = usuariosPermitidos.find(
      (u) => u.email === email && u.password === password
    );

    if (usuarioValido) {
      // Guardamos la sesión del usuario (excluyendo la contraseña)
      const usuarioLogueado = {
        nombre: usuarioValido.nombre,
        email: usuarioValido.email,
        rol: usuarioValido.rol
      };

      localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));

      // Redirigimos a la página de capacitaciones
      window.location.href = "capacitaciones.html";
    } else {
      alert(
        "Credenciales incorrectas.\n\nPuedes probar con alguno de estos correos (Contraseña: 123456):\n- admin@setib.com\n- za.jjfa@hotmail.com\n- conductor@setib.com"
      );
    }
  });

  // 2. SIMULAR LOGIN CON GOOGLE EN LOCALHOST
  googleBtn.addEventListener("click", () => {
    const usuarioGoogle = {
      nombre: "Juan Pérez (Google)",
      email: "juan.perez@gmail.com",
      rol: "Usuario Google",
    };

    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioGoogle));
    
    alert("¡Autenticado con Google (Simulado)!");
    window.location.href = "capacitaciones.html";
  });
});