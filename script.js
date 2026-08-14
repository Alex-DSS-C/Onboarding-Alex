const boton = document.querySelector("#btn-bienvenida");
const mensaje = document.querySelector("#mensaje");
const listaLibros = document.querySelector("#lista-libros");

console.log("Biblioteca cargada correctamente.");

async function cargarLibros() {
  if (!listaLibros) return;

  try {
    const respuesta = await fetch("http://localhost:3000/api/libros");

    if (!respuesta.ok) {
      throw new Error("Servidor no disponible");
    }

    const libros = await respuesta.json();

    if (!Array.isArray(libros) || libros.length === 0) {
      listaLibros.innerHTML = "<p class='error-message'>No hay libros disponibles por el momento.</p>";
      return;
    }

    listaLibros.innerHTML = libros
      .map(
        (libro) => `
          <article class="book-item">
            <h4>${libro.titulo}</h4>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Categoría:</strong> ${libro.categoria}</p>
          </article>
        `
      )
      .join("");
  } catch (error) {
    listaLibros.innerHTML = "<p class='error-message'>No se pudieron cargar los libros. Verifica que el servidor esté encendido.</p>";
    console.error("Error al cargar libros:", error);
  }
}

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

cargarLibros();