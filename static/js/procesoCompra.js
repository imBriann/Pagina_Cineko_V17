function obtenerParametroDeURL(nombre) {
  nombre = nombre.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + nombre + "=([^&#]*)"),
    resultados = regex.exec(location.search);
  return resultados === null ? "" : decodeURIComponent(resultados[1].replace(/\+/g, " "));
}

function mostrarInformacionPelicula() {
  var idPelicula = obtenerParametroDeURL('id');
  var peliculas = {
    '10234': { 'nombre': 'Dune', 'poster': '/static/img/Cartelera/Poster_dune.jpg' },
    '20468': { 'nombre': 'Avengers: Endgame', 'poster': '/static/img/Cartelera/Poster_endGame.jpg' },
    '30692': { 'nombre': 'Interstellar', 'poster': '/static/img/Cartelera/Poster_Interstellar.jpg' },
    '40916': { 'nombre': 'La Ballena', 'poster': '/static/img/Cartelera/Poster_laBallena.jpg' },
    '50140': { 'nombre': 'Top Gun: Maverick', 'poster': '/static/img/Cartelera/Poster_topGunMaverick.jpeg' },
    '60374': { 'nombre': 'Aquaman', 'poster': '/static/img/Cartelera/Poster_aquaman.jpg' },
    '70608': { 'nombre': 'Avatar: El Camino del Agua', 'poster': '/static/img/Cartelera/Poster_avatar.jpg' },
    '80832': { 'nombre': 'Barbie', 'poster': '/static/img/Cartelera/Poster_Barbie.jpg' },
    '90156': { 'nombre': 'Creed III', 'poster': '/static/img/Cartelera/Poster_Creed3.jpg' },
    '100380': { 'nombre': 'Guardianes de la Galaxia Vol.3', 'poster': '/static/img/Cartelera/Poster_guardianesdelaGalaxiaVol3.jpg' },
    '110604': { 'nombre': 'Jhon Wick 4', 'poster': '/static/img/Cartelera/Poster_jhonWick4.jpg' },
    '120828': { 'nombre': 'Mision Imposible', 'poster': '/static/img/Cartelera/Poster_MisonImposible.jpg' },
    '131052': { 'nombre': 'Oppenheimer', 'poster': '/static/img/Cartelera/Poster_oppenheimer.jpg' },
    '141276': { 'nombre': 'Rapidos y Furiosos 10', 'poster': '/static/img/Cartelera/Poster_RyF.jpg' },
    '151500': { 'nombre': 'Super Mario Bros', 'poster': '/static/img/Cartelera/Poster_SuperMarioBros.jpg' }
  };

  if (peliculas[idPelicula]) {
    document.getElementById('nombrePelicula').textContent = peliculas[idPelicula].nombre;
    document.getElementById('posterPelicula').src = peliculas[idPelicula].poster;
  } else {
    console.log('ID de película no encontrado.');
  }
}

function actualizarTiposDePelicula() {
  const tipoSelect = document.getElementById('tipo');
  tipoSelect.innerHTML = '';

  const tipos = ['2D', '3D'];
  tipos.forEach(tipo => {
    const option = document.createElement('option');
    option.textContent = tipo;
    option.value = tipo;
    tipoSelect.appendChild(option);
  });
}

function actualizarDiasDisponibles(idPelicula, tipo) {
  var horarios = {
    "10234": {
      lunes: { '2D': ['16:00'], '3D': [] },
      martes: { '2D': ['15:00', '17:00'], '3D': [] },
      miércoles: { '2D': ['14:30', '16:30'], '3D': [] },
      jueves: { '2D': ['15:30'], '3D': [] },
      viernes: { '2D': ['14:00', '16:00'], '3D': [] },
      sábado: { '2D': ['12:00', '16:00'], '3D': ['18:00'] },
      domingo: { '2D': ['12:00', '16:00'], '3D': [] }
    },
    "20468": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['19:00'], '3D': [] },
      miércoles: { '2D': ['14:30', '18:30'], '3D': [] },
      jueves: { '2D': ['15:30'], '3D': [] },
      viernes: { '2D': ['14:00', '20:00'], '3D': [] },
      sábado: { '2D': ['12:00', '20:00'], '3D': ['18:00'] },
      domingo: { '2D': ['12:00', '14:00', '20:00'], '3D': [] }
    },
    "30692": {
      lunes: { '2D': ['14:00', '18:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': ['17:00'] },
      miércoles: { '2D': ['16:30', '19:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['13:00'], '3D': ['15:00'] },
      sábado: { '2D': ['12:00', '16:00'], '3D': [] },
      domingo: { '2D': ['11:00', '15:00'], '3D': [] }
    },
    "40916": {
      lunes: { '2D': ['13:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': ['14:30'] },
      jueves: { '2D': ['15:30'], '3D': [] },
      viernes: { '2D': ['14:00', '20:00'], '3D': [] },
      sábado: { '2D': ['12:00', '20:00'], '3D': [] },
      domingo: { '2D': ['12:00', '14:00', '20:00'], '3D': [] }
    },

    "50140": {
      lunes: { '2D': ['15:00'], '3D': [] },
      martes: { '2D': ['14:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': ['20:00'] },
      domingo: { '2D': ['13:00'], '3D': [] }
    },
    "60374": {
      lunes: { '2D': ['17:00'], '3D': [] },
      martes: { '2D': ['16:00'], '3D': [] },
      miércoles: { '2D': ['14:30'], '3D': [] },
      jueves: { '2D': ['16:30'], '3D': [] },
      viernes: { '2D': ['17:00'], '3D': [] },
      sábado: { '2D': ['18:00'], '3D': [] },
      domingo: { '2D': ['17:00'], '3D': ['19:00'] }
    },
    "70608": {
      lunes: { '2D': ['19:00'], '3D': ['21:00'] },
      martes: { '2D': ['18:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['18:30'], '3D': [] },
      viernes: { '2D': ['19:00'], '3D': [] },
      sábado: { '2D': ['20:00'], '3D': [] },
      domingo: { '2D': ['19:00'], '3D': ['21:00'] }
    },
    "80832": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': ['22:00'] },
      domingo: { '2D': ['13:00'], '3D': [] }
    },
    "90156": {
      lunes: { '2D': ['15:00'], '3D': [] },
      martes: { '2D': ['14:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': [] }
    },
    "100380": {
      lunes: { '2D': ['14:00'], '3D': ['18:00', '20:00'] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': [] }
  },
  "110604": {
      lunes: { '2D': ['15:00'], '3D': ['19:00'] },
      martes: { '2D': ['14:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': [] }
  },
  "120828": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': ['17:00'] }
  },
  "131052": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': ['20:30'] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': ['17:00'] }
  },
  "141276": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': ['19:00'] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': ['18:00'] },
      domingo: { '2D': ['13:00'], '3D': [] }
  },
  "151500": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': ['20:30'] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': ['18:00'] },
      domingo: { '2D': ['13:00'], '3D': [] }
  }
  };

  const diasDisponibles = Object.keys(horarios[idPelicula]).filter(dia => horarios[idPelicula][dia][tipo].length > 0);

  const calendario = document.getElementById('calendario');
  calendario.innerHTML = '';

  diasDisponibles.forEach(dia => {
    const option = document.createElement('option');
    option.textContent = dia.charAt(0).toUpperCase() + dia.slice(1);
    option.value = dia;
    calendario.appendChild(option);
  });

  if (diasDisponibles.length === 0) {
    const option = document.createElement('option');
    option.textContent = 'No hay días disponibles';
    option.value = '';
    calendario.appendChild(option);
  }
}

function actualizarHorarios(idPelicula, dia, tipo) {
  var horarios = {
    "10234": {
      lunes: { '2D': ['16:00'], '3D': [] },
      martes: { '2D': ['15:00', '17:00'], '3D': [] },
      miércoles: { '2D': ['14:30', '16:30'], '3D': [] },
      jueves: { '2D': ['15:30'], '3D': [] },
      viernes: { '2D': ['14:00', '16:00'], '3D': [] },
      sábado: { '2D': ['12:00', '16:00'], '3D': ['18:00'] },
      domingo: { '2D': ['12:00', '16:00'], '3D': [] }
    },
    "20468": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['19:00'], '3D': [] },
      miércoles: { '2D': ['14:30', '18:30'], '3D': [] },
      jueves: { '2D': ['15:30'], '3D': [] },
      viernes: { '2D': ['14:00', '20:00'], '3D': [] },
      sábado: { '2D': ['12:00', '20:00'], '3D': ['18:00'] },
      domingo: { '2D': ['12:00', '14:00', '20:00'], '3D': [] }
    },
    "30692": {
      lunes: { '2D': ['14:00', '18:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': ['17:00'] },
      miércoles: { '2D': ['16:30', '19:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['13:00'], '3D': ['15:00'] },
      sábado: { '2D': ['12:00', '16:00'], '3D': [] },
      domingo: { '2D': ['11:00', '15:00'], '3D': [] }
    },
    "40916": {
      lunes: { '2D': ['13:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': ['14:30'] },
      jueves: { '2D': ['15:30'], '3D': [] },
      viernes: { '2D': ['14:00', '20:00'], '3D': [] },
      sábado: { '2D': ['12:00', '20:00'], '3D': [] },
      domingo: { '2D': ['12:00', '14:00', '20:00'], '3D': [] }
    },

    "50140": {
      lunes: { '2D': ['15:00'], '3D': [] },
      martes: { '2D': ['14:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': ['20:00'] },
      domingo: { '2D': ['13:00'], '3D': [] }
    },
    "60374": {
      lunes: { '2D': ['17:00'], '3D': [] },
      martes: { '2D': ['16:00'], '3D': [] },
      miércoles: { '2D': ['14:30'], '3D': [] },
      jueves: { '2D': ['16:30'], '3D': [] },
      viernes: { '2D': ['17:00'], '3D': [] },
      sábado: { '2D': ['18:00'], '3D': [] },
      domingo: { '2D': ['17:00'], '3D': ['19:00'] }
    },
    "70608": {
      lunes: { '2D': ['19:00'], '3D': ['21:00'] },
      martes: { '2D': ['18:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['18:30'], '3D': [] },
      viernes: { '2D': ['19:00'], '3D': [] },
      sábado: { '2D': ['20:00'], '3D': [] },
      domingo: { '2D': ['19:00'], '3D': ['21:00'] }
    },
    "80832": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': ['22:00'] },
      domingo: { '2D': ['13:00'], '3D': [] }
    },
    "90156": {
      lunes: { '2D': ['15:00'], '3D': [] },
      martes: { '2D': ['14:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': [] }
    },
    "100380": {
      lunes: { '2D': ['14:00'], '3D': ['18:00', '20:00'] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': [] }
  },
  "110604": {
      lunes: { '2D': ['15:00'], '3D': ['19:00'] },
      martes: { '2D': ['14:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': [] }
  },
  "120828": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': ['17:00'] }
  },
  "131052": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': ['20:30'] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': [] },
      domingo: { '2D': ['13:00'], '3D': ['17:00'] }
  },
  "141276": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': ['19:00'] },
      miércoles: { '2D': ['16:30'], '3D': [] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': ['18:00'] },
      domingo: { '2D': ['13:00'], '3D': [] }
  },
  "151500": {
      lunes: { '2D': ['14:00'], '3D': [] },
      martes: { '2D': ['15:00'], '3D': [] },
      miércoles: { '2D': ['16:30'], '3D': ['20:30'] },
      jueves: { '2D': ['14:30'], '3D': [] },
      viernes: { '2D': ['15:00'], '3D': [] },
      sábado: { '2D': ['14:00'], '3D': ['18:00'] },
      domingo: { '2D': ['13:00'], '3D': [] }
  }
  };

  const horarioSelect = document.getElementById('horario');
  horarioSelect.innerHTML = '';

  if (horarios[idPelicula] && horarios[idPelicula][dia] && horarios[idPelicula][dia][tipo]) {
    horarios[idPelicula][dia][tipo].forEach(hora => {
      const option = document.createElement('option');
      option.textContent = hora;
      option.value = hora;
      horarioSelect.appendChild(option);
    });
  } else {
    const option = document.createElement('option');
    option.textContent = 'No hay horarios disponibles';
    option.value = '';
    horarioSelect.appendChild(option);
  }
}

function actualizarDiasYHorarios() {
  const idPelicula = obtenerParametroDeURL('id');
  const tipoSeleccionado = document.getElementById('tipo').value;
  actualizarDiasDisponibles(idPelicula, tipoSeleccionado);
  actualizarHorariosSeleccionados(); // Actualiza horarios después de actualizar días disponibles
}

function actualizarHorariosSeleccionados() {
  const idPelicula = obtenerParametroDeURL('id');
  const diaSeleccionado = document.getElementById('calendario').value;
  const tipoSeleccionado = document.getElementById('tipo').value;
  actualizarHorarios(idPelicula, diaSeleccionado, tipoSeleccionado);
}

document.querySelectorAll('.seat').forEach(seat => {
  seat.addEventListener('click', () => {
      seat.classList.toggle('selected');
      if (seat.classList.contains('selected')) {
          seat.textContent = seat.dataset.originalText;
      } else {
          seat.textContent = seat.dataset.originalText;
      }
  });
});

// Guardar el texto original de cada asiento en un data attribute
document.querySelectorAll('.seat').forEach(seat => {
  seat.dataset.originalText = seat.textContent;
});

window.onload = function () {
  mostrarInformacionPelicula();
  actualizarTiposDePelicula();
  document.getElementById('tipo').addEventListener('change', actualizarDiasYHorarios);
  document.getElementById('calendario').addEventListener('change', actualizarHorariosSeleccionados);
  actualizarDiasYHorarios(); // Para actualizar los días y horarios al cargar la página
};
