//Ajustes sobre el reproductor de musica
let progress = document.getElementById("progreso");
let song = document.getElementById("song");
let ctrlIcon = document.getElementById("ctrlIcon");

song.onloadeddata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

function playPause() {
  if (ctrlIcon.classList.contains("fa-pause")) {
    // song.pause();
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    // song.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
  }
}

if (song.play()) {
  setInterval(() => {
    progress.value = song.currentTime;
  }, 1000);
}

progress.onchange = function () {
  song.play();
  song.currentTime = progress.value;
  ctrlIcon.classList.remove("fa-pause");
  ctrlIcon.classList.add("fa-play");
};

//Para actualizar la imagen y la cancion del artista
document.addEventListener("DOMContentLoaded", function cambiarImagen() {
  // Obtener todos los elementos <li> con la clase "single-entry"
  var entradasIndividuales = document.querySelectorAll(".single-entry");

  // Iterar sobre cada elemento <li> con la clase "single-entry"
  entradasIndividuales.forEach(function (entrada) {
    // Agregar un evento de clic a cada elemento <li>
    entrada.addEventListener("click", function () {
      // Obtener la descripción del álbum y del autor dentro de este elemento <li> específico
      var descripcionAlbum = entrada.querySelector(
        ".single-entry-album"
      ).textContent;
      var descripcionAutor = entrada.querySelector(
        ".single-entry-author"
      ).textContent;

      // Obtener la URL de la imagen de fondo
      var imageUrl = entrada.querySelector(
        ".single-entry-image-wrapper .single-entry-image"
      ).style.backgroundImage;
      // Limpiar la URL de la imagen para obtener solo la URL
      imageUrl = imageUrl.replace('url("', "").replace('")', "");

      // Actualizar el contenido de <h4> y <p> con los nuevos valores
      var h4Element = document.querySelector(".info-song h4");
      var pElement = document.querySelector(".info-song p");
      var imagenElement = document.querySelector(".content-player .imagen img");

      h4Element.textContent = descripcionAlbum;
      pElement.textContent = descripcionAutor;
      imagenElement.src = imageUrl;
    });
  });
});

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
  // Obtener todas las imágenes con la clase "cancion"
  var imagenes = document.querySelectorAll(".cancion");

  // Iterar sobre cada imagen
  imagenes.forEach(function (imagen) {
    // Agregar un evento de clic a cada imagen
    imagen.addEventListener("click", function () {
      // Obtener la ruta de la canción asociada a la imagen clicada
      var nuevaCancion = imagen.getAttribute("data-src");
      var nuevoVideo = imagen.getAttribute("data-video");

      // Obtener el elemento de audio
      var reproductor = document.getElementById("song");
      var videoReproductor = document.getElementById("video");

      // Cambiar la fuente de audio del reproductor
      reproductor.src = nuevaCancion;
      videoReproductor.src = nuevoVideo;

      // Reproducir la nueva canción automáticamente
      reproductor.play();
      videoReproductor.play();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var reproductor = document.getElementById("song");
  var tiempoActualSpan = document.getElementById("current-time");
  var tiempoTotalSpan = document.getElementById("song-duration");

  // Actualizar los tiempos cada segundo
  reproductor.addEventListener("timeupdate", function () {
    // Obtener el tiempo actual de la canción en segundos
    var tiempoActual = reproductor.currentTime;

    // Obtener el tiempo total de la canción en segundos
    var tiempoTotal = reproductor.duration;

    // Formatear los tiempos en minutos:segundos
    var tiempoActualFormateado = formatearTiempo(tiempoActual);
    var tiempoTotalFormateado = formatearTiempo(tiempoTotal);

    // Mostrar los tiempos formateados en los spans correspondientes
    tiempoActualSpan.textContent = tiempoActualFormateado;
    tiempoTotalSpan.textContent = tiempoTotalFormateado;
  });

  // Función para formatear el tiempo en minutos:segundos
  function formatearTiempo(tiempoEnSegundos) {
    var minutos = Math.floor(tiempoEnSegundos / 60);
    var segundos = Math.floor(tiempoEnSegundos % 60);
    segundos = segundos < 10 ? "0" + segundos : segundos;
    return minutos + ":" + segundos;
  }
});
//----------------------------------------------------------------------------------------------------------------------------------------------------
/**CAMBIAR A LA PROXIMA CANCION Y FUNCIONALIDAD DEL BOTON PARA PASAR A LA SIGUIENTE CANCION */
//----------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Función para cambiar h4 y p
  function cambiarH4yP(descripcionAlbum, descripcionAutor, imageUrl) {
    var h4Element = document.querySelector(".info-song h4");
    var pElement = document.querySelector(".info-song p");
    var imagenElement = document.querySelector(".content-player .imagen img");

    h4Element.textContent = descripcionAlbum;
    pElement.textContent = descripcionAutor;
    imagenElement.src = imageUrl;
  }

  // Función para cambiar <div class="contenedor">
  function cambiarContenedor(infoCancion) {
    info.forEach(function (cancion) {
      if (cancion.name === infoCancion.nombre) {
        var infoBanda = document.querySelector(".Info-banda");
        infoBanda.innerHTML = `
        <div class="contenedor">
          <img src="${cancion.img}" alt="${cancion.artist}" class="img-info" />
          <div class="info">
            <ul>
              <li class="titulo"><h1>${cancion.name}</h1></li>
              <li class="autor">${cancion.artist}</li>
              <li class="texto">${cancion.info}</li>
            </ul>
          </div>
        </div>`;
      }
    });
  }

  var indiceCancionActual = 0;

  // Obtener el reproductor de audio y video
  var reproductor = document.getElementById("song");
  var videoReproductor = document.getElementById("video");

  // Obtener elementos relacionados con la información de la canción
  var tiempoActualSpan = document.getElementById("current-time");
  var tiempoTotalSpan = document.getElementById("song-duration");
  var nombreCancionDiv = document.getElementById("nombre-cancion");
  var nombreBandaParrafo = document.getElementById("nombre-banda");
  var imagenReproductor = document.getElementById("imagen-cancion");

  // Función para cargar y reproducir la canción en la posición indicada
  function cargarYReproducirCancion() {
    //Cambiar cancion y video
    var siguienteCancion = canciones[indiceCancionActual];
    var siguienteVideo = videos[indiceCancionActual];
    reproductor.src = siguienteCancion;
    videoReproductor.src = siguienteVideo;
    //Informacion de la cancion
    var cancionInfo = infoCanciones[indiceCancionActual];
    nombreCancionDiv.textContent = cancionInfo.nombre;
    nombreBandaParrafo.textContent = cancionInfo.banda;
    imagenReproductor.src = cancionInfo.imagen;
    reproductor.play();
    videoReproductor.play();
  }

  // Función para reproducir la canción anterior
  function reproducirCancionAnterior() {
    indiceCancionActual =
      (indiceCancionActual - 1 + canciones.length) % canciones.length;
    cargarYReproducirCancion(indiceCancionActual);
  }

  // Función para cargar y reproducir la siguiente canción
  function reproducirSiguienteCancion() {
    // Obtener la siguiente canción
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    var siguienteCancion = canciones[indiceCancionActual];
    var siguienteInfo = infoCanciones[indiceCancionActual];
    //para el video
    var siguienteVideo = videos[indiceCancionActual];
    // Cambiar la fuente de audio del reproductor
    reproductor.src = siguienteCancion;
    videoReproductor.src = siguienteVideo;

    // Reproducir la nueva canción automáticamente
    reproductor.play();
    videoReproductor.play();

    // Actualizar el nombre de la canción y el nombre de la banda
    nombreCancionDiv.textContent = siguienteInfo.nombre;
    nombreBandaParrafo.textContent = siguienteInfo.banda;
    imagenReproductor.src = siguienteInfo.imagen;
  }

  // Actualizar los tiempos cada segundo
  reproductor.addEventListener("timeupdate", function () {
    var tiempoActual = reproductor.currentTime;
    var tiempoTotal = reproductor.duration;
    var tiempoActualFormateado = formatearTiempo(tiempoActual);
    var tiempoTotalFormateado = formatearTiempo(tiempoTotal);
    tiempoActualSpan.textContent = tiempoActualFormateado;
    tiempoTotalSpan.textContent = tiempoTotalFormateado;
  });

  // Evento para cargar y reproducir la siguiente canción cuando la actual termine
  reproductor.addEventListener("ended", function () {
    reproducirSiguienteCancion();
    cambiarContenedor(infoCanciones[indiceCancionActual]);
  });

  // Evento de clic en el botón de avanzar música
  var botonAvanzar = document.getElementById("boton-avanzar");
  botonAvanzar.addEventListener("click", function () {
    console.log("Botón de avanzar música clicado"); // Comprobación
    // Actualizar el índice de la canción antes de reproducir la siguiente canción
    if (ctrlIcon.classList.contains("fa-play")) {
      ctrlIcon.classList.remove("fa-play");
      ctrlIcon.classList.add("fa-pause");
    }
    reproducirSiguienteCancion();
    cambiarContenedor(infoCanciones[indiceCancionActual]);
  });

  // Evento de clic en el botón de retroceder música
  var botonRetroceder = document.getElementById("boton-retroceder");
  botonRetroceder.addEventListener("click", function () {
    if (ctrlIcon.classList.contains("fa-play")) {
      ctrlIcon.classList.remove("fa-play");
      ctrlIcon.classList.add("fa-pause");
    }
    reproducirCancionAnterior();
    cambiarContenedor(infoCanciones[indiceCancionActual]);
  });

  // Función para formatear el tiempo en minutos:segundos
  function formatearTiempo(tiempoEnSegundos) {
    var minutos = Math.floor(tiempoEnSegundos / 60);
    var segundos = Math.floor(tiempoEnSegundos % 60);
    segundos = segundos < 10 ? "0" + segundos : segundos;
    return minutos + ":" + segundos;
  }

  var botonReproducir = document.getElementById("boton-reproducir");
  var reproduciendo = false; // Variable para rastrear si la canción está reproduciéndose

  botonReproducir.addEventListener("click", function () {
    if (!reproduciendo) {
      // Si la canción no se está reproduciendo, cargar y reproducir la canción actual
      reproductor.play();
      videoReproductor.play();
      reproduciendo = true;
    } else {
      // Si la canción se está reproduciendo, pausar la canción
      pausarCancion();
      reproduciendo = false;
    }
  });

  // Función para pausar la canción actual
  function pausarCancion() {
    if (!reproductor.paused && !videoReproductor.paused) {
      reproductor.pause(); // Pausa la canción
      videoReproductor.pause(); // Pausa el video
    }
  }

  // Evento para detectar cuándo el reproductor de audio y video están listos
  reproductor.addEventListener("canplay", function () {
    console.log("El reproductor de audio está listo.");
    // Actualizar el estado de reproducción a true solo si se está cargando la canción por primera vez
    if (!reproduciendo) {
      reproduciendo = true;
    }
  });

  videoReproductor.addEventListener("canplay", function () {
    console.log("El reproductor de video está listo.");
    // Actualizar el estado de reproducción a true solo si se está cargando la canción por primera vez
    if (!reproduciendo) {
      reproduciendo = true;
    }
  });
});

//----------------------------------------------------------------------------------------------------------------------------------------------------
/**Encontrar la informacion en el fichero informacion.js segun el nombre de la cancion*/
//----------------------------------------------------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  // Función para cambiar h4 y p
  function cambiarH4yP(descripcionAlbum, descripcionAutor, imageUrl) {
    var h4Element = document.querySelector(".info-song h4");
    var pElement = document.querySelector(".info-song p");
    var imagenElement = document.querySelector(".content-player .imagen img");

    h4Element.textContent = descripcionAlbum;
    pElement.textContent = descripcionAutor;
    imagenElement.src = imageUrl;
  }

  // Función para cambiar <div class="contenedor">
  function cambiarContenedor(infoCancion) {
    var infoBanda = document.querySelector(".Info-banda");
    infoBanda.innerHTML = `
    <div class="contenedor">
      <img src="${infoCancion.img}" alt="${infoCancion.artist}" class="img-info" />
      <div class="info">
        <ul>
          <li class="titulo"><h1>${infoCancion.name}</h1></li>
          <li class="autor">${infoCancion.artist}</li>
          <li class="texto">${infoCancion.info}</li>
        </ul>
      </div>
    </div>`;
  }

  // Obtener todos los elementos <li> con la clase "single-entry"
  var entradasIndividuales = document.querySelectorAll(".single-entry");

  // Iterar sobre cada elemento <li> con la clase "single-entry"
  entradasIndividuales.forEach(function (entrada) {
    // Agregar un evento de clic a cada elemento <li>
    entrada.addEventListener("click", function () {
      // Obtener la descripción del álbum y del autor dentro de este elemento <li> específico
      var descripcionAlbum = entrada.querySelector(
        ".single-entry-album"
      ).textContent;
      var descripcionAutor = entrada.querySelector(
        ".single-entry-author"
      ).textContent;

      // Obtener la URL de la imagen de fondo
      var imageUrl = entrada.querySelector(
        ".single-entry-image-wrapper .single-entry-image"
      ).style.backgroundImage;
      // Limpiar la URL de la imagen para obtener solo la URL
      imageUrl = imageUrl.replace('url("', "").replace('")', "");

      // Llamar a la función para cambiar h4 y p
      cambiarH4yP(descripcionAlbum, descripcionAutor, imageUrl);

      // Buscar la información en el archivo "informacion.js"
      var nombreCancion = descripcionAlbum.trim(); // Eliminar espacios en blanco al principio y al final
      var infoCancion = info.find(function (cancion) {
        return cancion.name === nombreCancion;
      });

      // Si se encontró información para la canción
      if (infoCancion) {
        // Llamar a la función para cambiar <div class="contenedor">
        cambiarContenedor(infoCancion);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el parámetro 'nombre' de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const nombre = urlParams.get("nombre");

  // Obtener el elemento <h2>
  const h2Bienvenida = document.getElementById("bienvenida");
  const botonLogout = document.getElementById("Logout-button");

  // Si el parámetro 'nombre' está presente, mostrar el mensaje de bienvenida
  if (nombre) {
    h2Bienvenida.textContent = "Bienvenido de vuelta, " + nombre;
    h2Bienvenida.style.display = "block";
    botonLogout.style.display = "block";
  }
});
