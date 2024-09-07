const key = 'A44RMWA58WTT8X8RZ6BEWFGQ2';
const urlBase = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;

// Add submit event listener to the form
const form = document.getElementById('weatherForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Get values from input fields
    const city = document.getElementById('city').value;
    const unitGroup = document.getElementById('unitGroup').value;
    // Remove previous info
    removeTodaysWeatherData();
    // Display loading icon
    displayLoadingIcon(true);
    // Fetch and display the weather data
    let weatherData =  await getTodaysWeatherData(city, unitGroup);
    // Hide loading icon
    displayLoadingIcon(false);
    //displayLoadingIcon(false);
    displayTodaysWeatherData(city, unitGroup, weatherData);
})

// Get today's weather data
async function getTodaysWeatherData(city, unitGroup) {
    try {
        let url = urlBase + `${city}?unitGroup=${unitGroup}&key=${key}`;
        const response = await fetch(url);
        const json = await response.json();
        const currentTemp = json.currentConditions.temp;
        const maxTemp = json.days[0].tempmax;
        const minTemp = json.days[0].tempmin;
        const data = [currentTemp, minTemp, maxTemp];
        return data;
    } catch (error) {
        alert("Bad city name provided. " + error);
    }
}

function displayTodaysWeatherData(city, unitGroup, weatherData) {
    // Get unit unicode text
    let unit = unitGroup == "uk" ? 'C' : 'F';
    // Replace p elements text with new weather data
    let pEl = document.querySelector('#tempInfoContainer #cityInfo p');
    pEl.textContent = city.charAt(0).toUpperCase() + city.slice(1);
    pEl.style.display = 'block';
    pEl = document.querySelector('#tempInfoContainer #currentTempInfo p');
    pEl.textContent = `${weatherData[0]}\u00B0${unit}`;
    pEl.style.display = 'block';
    pEl = document.querySelector('#tempInfoContainer #minTempInfo p');
    pEl.textContent = `${weatherData[1]}\u00B0${unit}`;
    pEl.style.display = 'block';
    pEl = document.querySelector('#tempInfoContainer #maxTempInfo p');
    pEl.textContent = `${weatherData[2]}\u00B0${unit}`;
    pEl.style.display = 'block';
}

function removeTodaysWeatherData() {
    // Hide p elements containing weather info
    let pEl = document.querySelector('#tempInfoContainer #cityInfo p');
    pEl.style.display = 'none';
    pEl = document.querySelector('#tempInfoContainer #currentTempInfo p');
    pEl.style.display = 'none';
    pEl = document.querySelector('#tempInfoContainer #maxTempInfo p');
    pEl.style.display = 'none';
    pEl = document.querySelector('#tempInfoContainer #minTempInfo p');
    pEl.style.display = 'none';
}

function displayLoadingIcon(state) {
    const spinners = document.querySelectorAll('.spinner');
    spinners.forEach(spinner => {
        spinner.style.display = state ? 'block' : 'none';
    });
}