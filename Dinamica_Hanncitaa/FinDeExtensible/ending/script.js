

document.addEventListener("DOMContentLoaded", function() {
  const introVideo = document.getElementById("intro-video");
  const youtubeVideo = document.getElementById("youtube-video");
  const finalVideo = document.getElementById("final-video");
  const introScreen = document.getElementById("intro-screen");
  const titleContent = document.getElementById("titles");
  const finalScreen = document.getElementById("final-screen");

 function reproducirVideo() {
  var video = document.getElementById('miVideo');
  video.play(); // Reproduce el video automáticamente
}

  // Espera a que el video introductorio termine y luego muestra el contenido central
  introVideo.addEventListener("ended", function() {
    introScreen.style.display = "none";
    titleContent.style.display = "block";

       setTimeout(function() {
      reproducirVideo();

    }, 5000);

    // Después de cierto tiempo, muestra la pantalla final
    setTimeout(function() {
      titleContent.style.display = "none";
      finalScreen.style.display = "block";
    }, 85000);

 // Cambia este valor al tiempo deseado en milisegundos


  });
});

// document.getElementById('final-video').addEventListener('ended', function() {
//   // Evento que se dispara cuando el video termina de reproducirse
//   // Cambiar el src del video para que muestre el directo
//   document.getElementById('final-video').src = 'https://www.twitch.tv/urielmecanico';
//   // Reiniciar la reproducción del video con el nuevo src
//   document.getElementById('final-video').play();
// });