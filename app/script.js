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
  const speedMinPerKM = timeMinutesTotal / (distance / 1000);

  // Arrondit les résultats de vitesse au dixième
  const roundedSpeedKMH = speedKMH.toFixed(1);
  const roundedSpeedMinPerKM = speedMinPerKM.toFixed(2);

  // Affiche les résultats dans la page HTML
  document.getElementById("speedKMH").innerHTML = roundedSpeedKMH;
  document.getElementById("speedMinPerKM").innerHTML = roundedSpeedMinPerKM;
}
