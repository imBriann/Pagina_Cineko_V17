function mostrarFicha(element) {
    const data = JSON.parse(element.getAttribute('data-info'));
    document.getElementById('modalNombre').innerText = data.nombre;
    document.getElementById('modalImagen').src = data.imagen;

    // Limpiar el contenido anterior de la descripción
    const descripcionElement = document.getElementById('modalDescripcion');
    descripcionElement.innerHTML = '';

    // Crear una lista y añadir los elementos de la descripción
    const ul = document.createElement('ul');
    data.descripcion.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        ul.appendChild(li);
    });
    descripcionElement.appendChild(ul);

    document.getElementById('modalPrecio').innerText = data.precio;
    document.getElementById('modalFicha').style.display = "block";
}

function cerrarModal() {
    document.getElementById('modalFicha').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('modalFicha');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}