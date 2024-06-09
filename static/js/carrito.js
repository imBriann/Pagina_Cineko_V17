document.addEventListener('DOMContentLoaded', function () {
    // Agrega un evento al formulario cuando se envía
    document.getElementById('seleccionPelicula').addEventListener('submit', function (event) {
        event.preventDefault(); // Evita que se envíe el formulario

        // Obtiene el nombre de la película
        var nombrePelicula = document.getElementById('nombrePelicula').textContent.trim();

        // Obtiene todos los asientos seleccionados
        var asientosSeleccionados = document.querySelectorAll('.seat.selected');
        var asientos = Array.from(asientosSeleccionados).map(function (asiento) {
            return asiento.textContent;
        });

        // Supongamos que tienes las siguientes variables definidas:
        var precioSala2D = 10000; // Precio por asiento en sala 2D
        var precioSala3D = 15000; // Precio por asiento en sala 3D

        // Cuenta el número de asientos seleccionados
        var numeroDeAsientosSeleccionados = asientosSeleccionados.length;

        // Obtiene el formato de película seleccionado
        var formatoPelicula = document.getElementById('tipo').value;

        // Define el precio de la sala según el tipo
        var precioSala = formatoPelicula === '2D' ? precioSala2D : precioSala3D;

        // Calcula el precio total
        var precioTotal = numeroDeAsientosSeleccionados * precioSala;

        // Obtiene el día de la función seleccionado
        var diaFuncion = document.getElementById('calendario').value;

        // Obtiene el horario de la función seleccionado
        var horarioFuncion = document.getElementById('horario').value;

        // Construye la URL de redirección con todos los datos seleccionados
        var urlRedireccion = '/templates/carrito.html?' +
            'pelicula=' + encodeURIComponent(nombrePelicula) +
            '&asientos=' + encodeURIComponent(asientos.join(',')) +
            '&formato=' + encodeURIComponent(formatoPelicula) +
            '&dia=' + encodeURIComponent(diaFuncion) +
            '&horario=' + encodeURIComponent(horarioFuncion) +
            '&precio=' + encodeURIComponent(precioTotal);

        // Redirecciona a la página de carrito.html con los datos seleccionados en la URL
        window.location.href = urlRedireccion;
    });
});

function comprarMembresia(element) {
    // Obtener el nombre de la membresía
    var nombreMembresia = element.getAttribute('data-nombre');

    // Redirigir al usuario a la página de compra con el nombre de la membresía como parámetro
    window.location.href = "/templates/carrito.html?membresia=" + nombreMembresia;
}

function comprarPromocion(element) {
    // Obtener el nombre de la promoción
    var nombrePromocion = element.getAttribute('data-nombre');

    // Redirigir al usuario a la página de compra con el nombre de la promoción como parámetro
    window.location.href = "/templates/carrito.html?confiteria=" + nombrePromocion;
}

function comprarProducto() {
    // Obtener el nombre del producto del modal
    const nombreProducto = document.getElementById('modalNombre').innerText;

    // Redirigir al usuario a la página de compra con el nombre del producto como parámetro en la URL
    window.location.href = "/templates/carrito.html?confiteria=" + encodeURIComponent(nombreProducto);
}

function obtenerParametroDeURL(nombre) {
    nombre = nombre.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + nombre + "=([^&#]*)"),
        resultados = regex.exec(location.search);
    return resultados === null ? "" : decodeURIComponent(resultados[1].replace(/\+/g, " "));
}


function mostrarInformacionConfiteria() {
    // Obtener el parámetro 'confiteria' de la URL
    var idConfiteria = obtenerParametroDeURL('confiteria');

    // Obtener el nombre y el póster de la película según el parámetro 'confiteria'
    var confiteria = {
        'promo1': { 'nombre': 'Promo 1', 'img': '/static/img/Confiteria/combo1.png', "descripcion": ["2 Palomitas grandes", "2 Gaseosas grandes", "2 Perros grandes", "2 Chocolatinas"], "precio": "$---" },
        'promo2': { 'nombre': 'Promo 2', 'img': '/static/img/Confiteria/combo2.png', "descripcion": ["1 Palomita grande", "1 Gaseosa grande", "1 Perro sencillo", "1 Chocolatina"], "precio": "$---" },
        'promo3': { 'nombre': 'Promo 3', 'img': '/static/img/Confiteria/combo3.png', "descripcion": ["1 Palomita grande", "2 Gaseosas grandes", "1 Perro", "1 Hamburguesa grande", "1 Paquete de Detodito"], "precio": "$---" },
        'promo4': { 'nombre': 'Promo 4', 'img': '/static/img/Confiteria/combo4.png', "descripcion": ["1 Palomita mediana", "1 Gaseosa mediana", "1 Paquete de gomitas"], "precio": "$---" },
        'Combo 1': { 'nombre': 'Combo 1', 'img': '/static/img/Confiteria/combo1.png', "descripcion": ["2 Palomitas grandes", "2 Gaseosas grandes", "2 Perros grandes", "2 Chocolatinas"], "precio": "$75.000" },
        'Combo 2': { 'nombre': 'Combo 2', 'img': '/static/img/Confiteria/combo2.png', "descripcion": ["2 Palomitas grandes", "2 Gaseosas grandes", "2 Perros sencillos", "1 Chocolatina"], "precio": "$68.000" },
        'Combo 3': { 'nombre': 'Combo 3', 'img': '/static/img/Confiteria/combo3.png', "descripcion": ["1 Palomita grande", "1 Gaseosa grande", "1 Perro sencillo", "1 Chocolatina"], "precio": "$40.000" },
        'Combo 4': { 'nombre': 'Combo 4', 'img': '/static/img/Confiteria/combo4.png', "descripcion": ["1 Palomita grande", "1 Gaseosa grande", "1 Paquete de Detodito", "1 Perro sencillo"], "precio": "$45.000" },
        'Combo 5': { 'nombre': 'Combo 5', 'img': '/static/img/Confiteria/combo5.png', "descripcion": ["1 Palomita grande", "2 Gaseosas grandes", "1 Perro", "1 Hamburguesa grande", "1 Paquete de Detodito"], "precio": "$58.000" },
        'Combo 6': { 'nombre': 'Combo 6', 'img': '/static/img/Confiteria/combo6.png', "descripcion": ["1 Palomita grande", "1 Gaseosa grande", "1 Hamburguesa grande"], "precio": "$40.000" },
        'Combo 7': { 'nombre': 'Combo 7', 'img': '/static/img/Confiteria/combo7.png', "descripcion": ["1 Palomita mediana", "1 Gaseosa mediana", "1 Paquete de gomitas"], "precio": "$25.000" },
        'Palomitas': { 'nombre': 'Palomitas', 'img': '/static/img/Confiteria/image.png' },
    };

    // Obtén los elementos HTML donde se mostrará la información
    const descripcionElement = document.getElementById('descripcion');

    if (confiteria[idConfiteria]) {
        document.getElementById('nombre').textContent = confiteria[idConfiteria].nombre;
        document.getElementById('img').src = confiteria[idConfiteria].img;

        // Crear una lista y añadir los elementos de la descripción
        const ul = document.createElement('ul');
        confiteria[idConfiteria].descripcion.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            ul.appendChild(li);
        });
        descripcionElement.appendChild(ul);

        document.getElementById('precio').textContent = confiteria[idConfiteria].precio;
    } else {
        console.log('ID de confiteria no encontrado.');
    }
}

function mostrarInformacionMembresia() {
    // Obtener el parámetro 'confiteria' de la URL
    var idMembresia = obtenerParametroDeURL('membresia');

    // Obtener el nombre y el póster de la película según el parámetro 'confiteria'
    var membresia = {
        'memGold': { 'nombre': 'Membresia Gold', 'img': '/static/img/MemGold.jpg', "descripcion": ["Puntos", "Estreno Exclusivo", "Palomitas Premium", "Noches de Cineko", "Beneficios de la Membresia Plus"], "precio": "$34.990" },
        'memPlus': { 'nombre': 'Membresia Plus', 'img': '/static/img/MemPlus.jpg', "descripcion": ["Puntos", "Funciones Dobles", "Descuentos en Combo", "Contenido Exclusivo"], "precio": "$24.990" },
    };

    // Obtén los elementos HTML donde se mostrará la información
    const descripcionElement = document.getElementById('descripcion');

    if (membresia[idMembresia]) {
        document.getElementById('nombre').textContent = membresia[idMembresia].nombre;
        document.getElementById('img').src = membresia[idMembresia].img;

        // Crear una lista y añadir los elementos de la descripción
        const ul = document.createElement('ul');
        membresia[idMembresia].descripcion.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            ul.appendChild(li);
        });
        descripcionElement.appendChild(ul);

        document.getElementById('precio').textContent = membresia[idMembresia].precio;

    } else {
        console.log('ID de confiteria no encontrado.');
    }
}

function mostrarInformacionPelicula() {

    var idPelicula = obtenerParametroDeURL('pelicula');
    var peliculas = {
        'Dune': { 'nombre': 'Dune', 'img': '/static/img/Cartelera/Poster_dune.jpg' },
        'Avengers: Endgame': { 'nombre': 'Avengers: Endgame', 'img': '/static/img/Cartelera/Poster_endGame.jpg' },
        'Interstellar': { 'nombre': 'Interstellar', 'img': '/static/img/Cartelera/Poster_Interstellar.jpg' },
        'La Ballena': { 'nombre': 'La Ballena', 'img': '/static/img/Cartelera/Poster_laBallena.jpg' },
        'Top Gun: Maverick': { 'nombre': 'Top Gun: Maverick', 'img': '/static/img/Cartelera/Poster_topGunMaverick.jpeg' },
        'Aquaman': { 'nombre': 'Aquaman', 'img': '/static/img/Cartelera/Poster_aquaman.jpg' },
        'Avatar: El Camino del Agua': { 'nombre': 'Avatar: El Camino del Agua', 'img': '/static/img/Cartelera/Poster_avatar.jpg' },
        'Barbie': { 'nombre': 'Barbie', 'img': '/static/img/Cartelera/Poster_Barbie.jpg' },
        'Creed III': { 'nombre': 'Creed III', 'img': '/static/img/Cartelera/Poster_Creed3.jpg' },
        'Guardianes de la Galaxia Vol.3': { 'nombre': 'Guardianes de la Galaxia Vol.3', 'img': '/static/img/Cartelera/Poster_guardianesdelaGalaxiaVol3.jpg' },
        'Jhon Wick 4': { 'nombre': 'Jhon Wick 4', 'img': '/static/img/Cartelera/Poster_jhonWick4.jpg' },
        'Mision Imposible': { 'nombre': 'Mision Imposible', 'img': '/static/img/Cartelera/Poster_MisonImposible.jpg' },
        'Oppenheimer': { 'nombre': 'Oppenheimer', 'img': '/static/img/Cartelera/Poster_oppenheimer.jpg' },
        'Rapidos y Furiosos 10': { 'nombre': 'Rapidos y Furiosos 10', 'img': '/static/img/Cartelera/Poster_RyF.jpg' },
        'Super Mario Bros': { 'nombre': 'Super Mario Bros', 'img': '/static/img/Cartelera/Poster_SuperMarioBros.jpg' }
    };

    if (peliculas[idPelicula]) {
        document.getElementById('nombre').textContent = peliculas[idPelicula].nombre;
        document.getElementById('img').src = peliculas[idPelicula].img;
        document.getElementById('formato').textContent = "• Formato = " + obtenerParametroDeURL('formato');
        document.getElementById('dia').textContent = "• Dia = " + obtenerParametroDeURL('dia');
        document.getElementById('horario').textContent = "• Hora = " + obtenerParametroDeURL('horario');
        document.getElementById('asientos').textContent = "• Asientos = " + obtenerParametroDeURL('asientos');
        document.getElementById('precio').textContent = "$" + obtenerParametroDeURL('precio')
    }
}

// Llamar a la función para mostrar la información cuando se cargue la página
mostrarInformacionPelicula();
mostrarInformacionConfiteria();
mostrarInformacionMembresia();