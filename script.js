const key = 'A44RMWA58WTT8X8RZ6BEWFGQ2';
let urlBase = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
let city = 'adelaide';
let unitGroup = 'uk';


printCurrentWeatherData('khon kaen', 'uk');

async function getWeatherData(city, unitGroup) {
    try {
        let url = urlBase + `${city}?unitGroup=${unitGroup}&key=${key}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        alert(error);
    }
}

async function getCurrentWeatherData(city, unitGroup) {
    let weatherData = await getWeatherData(city, unitGroup);
    return weatherData.days[0];
}

async function printCurrentWeatherData(city, unitGroup) {
    let weatherData = await getCurrentWeatherData(city, unitGroup);
    console.log(`Current temp: ${weatherData.temp}`);
    console.log(`Max temp: ${weatherData.tempmax}`);
    console.log(`Min temp: ${weatherData.tempmin}`);
    console.log(`Description: ${weatherData.description}`);
}