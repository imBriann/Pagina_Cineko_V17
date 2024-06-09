// Obtener el botón y la ventana modal
var modal = document.getElementById("videoModal");
var closeButton = document.querySelector(".close");

// Función para abrir la ventana modal con el video
function openTrailer(videoUrl) {
    var videoPlayer = document.getElementById("videoPlayer");
    // Cambiar el src del iframe con el enlace del video proporcionado
    videoPlayer.src = videoUrl;
    modal.style.display = "block";
}

// Función para cerrar la ventana modal
function closeModal() {
    var videoPlayer = document.getElementById("videoPlayer");
    // Detener la reproducción del video al cerrar la ventana modal
    videoPlayer.src = "";
    modal.style.display = "none";
}

// Cerrar la ventana modal cuando se haga clic fuera de ella
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
