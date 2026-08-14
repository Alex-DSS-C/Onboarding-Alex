const boton = document.querySelector("#btn-bienvenida");
const mensaje = document.querySelector("#mensaje");

console.log("Biblioteca cargada correctamente.");

if (boton && mensaje) {
  boton.addEventListener("click", function () {
    mensaje.textContent = "¡Gracias por visitar la Biblioteca NeoLiteraria! Que tengas una excelente lectura.";
    mensaje.style.color = "#8ef0ff";
    mensaje.style.fontWeight = "700";
    mensaje.style.transform = "translateY(-2px)";
    boton.textContent = "Saludo activado";
    boton.disabled = true;
    boton.style.opacity = "0.8";

    setTimeout(function () {
      mensaje.textContent = "Te saluda tu amigo Lex C'x";
      mensaje.style.color = "#dffcff";
      mensaje.style.fontWeight = "700";
      mensaje.style.transform = "translateY(0)";
      boton.textContent = "Mostrar saludo";
      boton.disabled = false;
      boton.style.opacity = "1";
    }, 10000);
  });
}

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const email = document.querySelector("#email").value.trim();
    const telefono = document.querySelector("#telefono").value.trim();
    const errores = [];

    if (exitoBox) {
      exitoBox.textContent = "";
    }

    if (!nombre || !email || !telefono) {
      errores.push("Todos los campos son obligatorios.");
    }

    if (email && (!email.includes("@") || !email.includes("."))) {
      errores.push("El correo debe contener @ y un punto.");
    }

    if (telefono && telefono.length !== 10) {
      errores.push("El teléfono debe tener exactamente 10 dígitos.");
    }

    if (errorBox) {
      errorBox.textContent = errores.join(" ");
    }

    if (errores.length === 0) {
      if (exitoBox) {
        exitoBox.textContent = "¡Solicitud enviada correctamente!";
      }
      if (errorBox) {
        errorBox.textContent = "";
      }
      formulario.reset();

      setTimeout(function () {
        if (exitoBox) {
          exitoBox.textContent = "";
        }
      }, 10000);
    }
  });
}
