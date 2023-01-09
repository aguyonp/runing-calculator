function speedToPace(speed) {
  // Calculer le temps en secondes par km
  var secondsPerKm = 3600 / speed;

  // Convertir le temps en minutes et secondes
  var minutes = Math.floor(secondsPerKm / 60);
  var seconds = Math.round(secondsPerKm % 60);

  // Ajouter un zéro devant les secondes si nécessaire
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Retourner l'allure sous forme de chaîne de caractères
  return minutes + ":" + seconds + "/km";
}

function calculatePerformance() {
  // Récupère la distance parcourue et le temps effectué
  const distance = Number(document.getElementById("distance").value);
  const timeHours = Number(document.getElementById("hours").value);
  const timeMinutes = Number(document.getElementById("minutes").value);
  const timeSeconds = Number(document.getElementById("seconds").value);

  // Convertit le temps en minutes
  const timeMinutesTotal = timeHours * 60 + timeMinutes + timeSeconds / 60;

  // Calcule la vitesse en KM/H
  const speedKMH = distance / 1000 / (timeMinutesTotal / 60);

  // Calcule la vitesse en minutes par KM
  const speedMinPerKM = speedToPace(speedKMH);

  // Arrondit les résultats de vitesse au dixième
  const roundedSpeedKMH = speedKMH.toFixed(1);
  // const roundedSpeedMinPerKM = speedMinPerKM.toFixed(2);

  // Affiche les résultats dans la page HTML
  document.getElementById("speedKMH").innerHTML = roundedSpeedKMH + 'km/h';
  document.getElementById("speedMinPerKM").innerHTML = speedMinPerKM;
}
