// Seleccionamos los elementos del modal
const modal = document.getElementById("myModal");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");
const closeBtn = document.querySelector(".close");

// Seleccionamos TODAS las imágenes de certificación
const images = document.querySelectorAll(".cert-img");

// Recorremos cada imagen y le asignamos el evento de clic
images.forEach(img => {
    img.addEventListener("click", function() {
        modal.style.display = "block";
        modalImg.src = this.src;          // Copia la ruta de la imagen clickeada
        captionText.innerHTML = this.alt; // Copia el texto alternativo como título
    });
});

// Evento para cerrar el modal al hacer clic en la (X)
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Opcional: Cerrar el modal si el usuario hace clic fuera de la imagen
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});