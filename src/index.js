import './style.css';
import clearNight from './images/clear_night.jpg';
import clear from './images/clear.jpg';
import clouds from './images/clouds.jpg';
import drizzle from './images/drizzle.jpg';
import mist from './images/mist.jpg';
import rain from './images/rain.jpg';
import snow from './images/snow.jpg';
import thunderstorm from './images/thunderstorm.jpg';

const cityInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const weatherIcon = document.querySelector('img');
const tempSpan = document.querySelector('.temp');
const humiditySpan = document.querySelector('.humidity');
const name = document.querySelector('.name');
const description = document.querySelector('.description');
const pressurePara = document.querySelector('.pressure');
const windPara = document.querySelector('.wind');

function getWeatherData(location) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=e4022b8ba431b294e64a06f720d56bf6&units=metric`
    )
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((e) => console.error(e));
}

async function filterData(location) {
    try {
        const allData = await getWeatherData(location);
        const filteredData = [
            allData.main,
            allData.weather[0],
            allData.name,
            allData.timezone,
            allData.wind.speed,
        ];
        console.log(filteredData);
        return filteredData;
    } catch (error) {
        return console.error(error);
    }
}

function setIconUrl(filteredData) {
    const iconCode = filteredData[1].icon;
    weatherIcon.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${iconCode}.png`
    );
}

function addWeatherInformation(filteredData) {
    const { temp } = filteredData[0];
    tempSpan.textContent = `${temp}°C`;
    const { humidity } = filteredData[0];
    humiditySpan.textContent = `${humidity}%`;
    const { pressure } = filteredData[0];
    pressurePara.textContent = `${pressure} hPa`;
    const speed = filteredData[4];
    windPara.textContent = `${speed} m/sec`;
    const [, , cityName] = filteredData;
    name.textContent = cityName;
    const weatherDescription = filteredData[1].description;
    description.textContent =
        weatherDescription[0].toUpperCase() + weatherDescription.slice(1);
}

function changeBackground(filteredData) {
    const includedTypes = {
        Clear: clear,
        Clouds: clouds,
        Drizzle: drizzle,
        Mist: mist,
        Rain: rain,
        Snow: snow,
        Thunderstorm: thunderstorm,
    };
    const keys = Object.keys(includedTypes);
    function setPath(type) {
        const { body } = document;
        body.setAttribute(
            'style',
            `background:url(${type});background-size:cover`
        );
    }
    let { main } = filteredData[1];
    if (main === 'Clear') {
        const iconCode = filteredData[1].icon;
        if (iconCode === '01n') {
            return setPath(clearNight);
        }
    }
    if (!keys.includes(main)) {
        main = 'Mist';
    }
    setPath(includedTypes[main]);
}

function calculateLocalTime(filteredData) {
    const timezone = filteredData[3] / 3600;
    let hour;
    let min;
    if (Number.isFinite(timezone)) {
        hour = timezone;
        min = 0;
    } else {
        hour = Number.parseInt(timezone);
        min = (timezone - hour) * 60;
    }
    const date = new Date();
    const hourUTC = date.getUTCHours();
    const minUTC = date.getUTCMinutes();

    let localHour = hourUTC + hour;
    let localMin = minUTC + min;

    if (localMin >= 60) {
        localMin -= 60;
        localHour += 1;
    } else if (localMin < 0) {
        localMin += 60;
        localHour -= 1;
    }
    if (localHour >= 24) {
        localHour -= 24;
    } else if (localHour < 0) {
        localHour += 24;
    }

    return [localHour, localMin];
}

function formatLocalTime(hour, minutes) {
    let hourString = String(hour);
    let minutesString = String(minutes);
    if (hourString.length === 1) {
        hourString = `0${hourString}`;
    }
    if (minutesString.length === 1) {
        minutesString = `0${minutesString}`;
    }
    document.querySelector(
        '.time'
    ).textContent = `${hourString}:${minutesString}`;
}

async function updateInformation(location) {
    try {
        const filteredData = await filterData(location);
        setIconUrl(filteredData);
        addWeatherInformation(filteredData);
        changeBackground(filteredData);
        const time = calculateLocalTime(filteredData);
        formatLocalTime(...time);
    } catch (error) {
        console.log(error);
    }
}

cityInput.addEventListener('input', () => {
    if (/\S/gm.test(cityInput.value)) {
        searchButton.removeAttribute('disabled');
    } else {
        searchButton.setAttribute('disabled', '');
    }
});

searchButton.addEventListener('click', () => {
    const location = cityInput.value;
    cityInput.value = '';
    searchButton.setAttribute('disabled', '');
    updateInformation(location);
});

updateInformation('buenos aires');
