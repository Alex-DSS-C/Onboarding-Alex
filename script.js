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
  });
}