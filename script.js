const key = 'A44RMWA58WTT8X8RZ6BEWFGQ2';
const urlBase = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;

// Add submit event listener to the form
const form = document.getElementById('weatherForm');
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Get values from input fields
    const city = document.getElementById('city').value;
    const unitGroup = document.getElementById('unitGroup').value;
    // Fetch and print the weather data
    printTodaysWeatherData(city, unitGroup);

})

// Get today's weather data
async function getTodaysWeatherData(city, unitGroup) {
    try {
        let url = urlBase + `${city}?unitGroup=${unitGroup}&key=${key}`;
        const response = await fetch(url);
        const json = await response.json();
        return json.days[0];
    } catch (error) {
        alert(error);
    }
}

async function printTodaysWeatherData(city, unitGroup) {
    let weatherData = await getTodaysWeatherData(city, unitGroup);
    console.log(`Current temp: ${weatherData.temp}`);
    console.log(`Max temp: ${weatherData.tempmax}`);
    console.log(`Min temp: ${weatherData.tempmin}`);
    console.log(`Description: ${weatherData.description}`);
}