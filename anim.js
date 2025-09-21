// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Eres", time: 27.41 },
  { text: "Lo que más quiero en este mundo, eso eres", time: 30.69 },
  { text: "Mi pensamiento más profundo también eres", time: 37.15 },
  { text: "Tan sólo dime lo que hago, aquí me tienes", time: 43.51 },
  { text: "Eres", time: 53.03 },
  { text: "Cuando despierto, lo primero, eso eres", time: 56.26 },
  { text: "Lo que a mi vida le hace falta si no vienes", time: 62.68 },
  { text: "Lo único, preciosa, que en mi mente habita hoy", time: 69.09 },
  { text: "¿Qué más puedo decirte?", time: 78.77 },
  { text: "Tal vez puedo mentirte sin razón", time: 82.15 },
  { text: "Pero lo que hoy siento", time: 88.41 },
  { text: "Es que sin ti estoy muerto, pues eres", time: 91.58 },
  { text: "Lo que más quiero en este mundo, eso eres", time: 98.14 },
  { text: "Eres", time: 133.01 },
  { text: "El tiempo que comparto, eso eres", time: 136.49 },
  { text: "Lo que la gente promete cuando se quiere", time: 142.74 },
  { text: "Mi salvación, mi esperanza y mi fe", time: 149.20 },
  { text: "Soy", time: 158.46 },
  { text: "El que quererte quiere como nadie, soy", time: 162.02 },
  { text: "El que te llevaría el sustento día a día, día a día", time: 168.37 },
  { text: "El que por ti daría la vida, ese soy", time: 174.73 },
  { text: "Aquí estoy a tu lado", time: 184.37 },
  { text: "Y espero aquí sentado hasta el final", time: 187.64 },
  { text: "No te has imaginado", time: 194.00 },
  { text: "Lo que por ti he esperado, pues eres", time: 197.28 },
  { text: "Lo que yo amo en este mundo, eso eres", time: 203.84 },
  { text: "Cada minuto en lo que pienso, eso eres", time: 210.00 },
  { text: "Lo que más cuido en este mundo eso eres", time: 216.25 }
];

// Animar las letras - VERSIÓN MEJORADA
function updateLyrics() {
  // Usar currentTime exacto, sin redondear
  var time = audio.currentTime;
  
  // Buscar la línea que corresponde al tiempo actual
  var currentLine = null;
  
  // Recorrer todas las líneas para encontrar la correcta
  for (var i = 0; i < lyricsData.length; i++) {
    // Si esta línea empieza después del tiempo actual, paramos
    if (lyricsData[i].time > time) break;
    
    // Esta línea es candidata (su tiempo es <= al tiempo actual)
    currentLine = lyricsData[i];
  }
  
  if (currentLine) {
    // Calcular opacidad basada en qué tan reciente es la línea
    var timeSinceStart = time - currentLine.time;
    var opacity = Math.min(1, Math.max(0, timeSinceStart / 0.5));
    
    // Aplicar el efecto
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // No hay línea para este tiempo
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

// Actualizar 30 veces por segundo (mucho más preciso)
setInterval(updateLyrics, 33); // ≈ 30 FPS

// Función para ocultar el título después de la canción
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  titulo.style.animation = "fadeOut 3s ease-in-out forwards";
  setTimeout(function() {
    titulo.style.display = "none";
  }, 3000);
}

// Ocultar título al finalizar la canción
audio.addEventListener('ended', function() {
  ocultarTitulo();
});