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

// Fonction pour obtenir le nom de la ville à partir des coordonnées géographiques
async function fetchCityName(lat, lon) {
  const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(reverseGeocodeUrl);
    const data = await response.json();

    if (data && data.address && data.address.city) {
      return data.address.city;
    } else {
      throw new Error('City name not found');
    }
  } catch (error) {
    console.error('Error fetching city name:', error);
    return 'Unknown City';
  }
}

// Fonction pour obtenir les données météo en fonction de la position de l'utilisateur
async function fetchWeatherData(lat, lon) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.hourly && data.hourly.temperature_2m) {
      const temperature = data.hourly.temperature_2m[0];
      const cityName = await fetchCityName(lat, lon); // Obtient le nom de la ville
      return {
        temperature,
        cityName,
      };
    } else {
      throw new Error('Weather data not found');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

// Fonction pour afficher la météo en fonction de la position de l'utilisateur
async function displayWeather() {
  try {
    // Obtenir les coordonnées de l'utilisateur
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const weatherData = await fetchWeatherData(lat, lon);

        if (weatherData) {
          document.getElementById('weather').innerHTML = `Temperature à ${weatherData.cityName}: ${weatherData.temperature.toFixed(1)}°C`;
        } else {
          document.getElementById('weather').innerHTML = 'Weather data unavailable';
        }
      });
    } else {
      throw new Error('Geolocation not available');
    }
  } catch (error) {
    console.error('Error getting user location:', error);
    document.getElementById('weather').innerHTML = 'Location data unavailable';
  }
}

document.addEventListener('DOMContentLoaded', displayWeather);
