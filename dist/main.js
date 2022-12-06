/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const cityInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const weatherIcon = document.querySelector('img');
const tempSpan = document.querySelector('.temp');
const humiditySpan = document.querySelector('.humidity');

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
        const filteredData = [allData.main, allData.weather[0]];
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
}

async function updateInformation(location) {
    try {
        const filteredData = await filterData(location);
        setIconUrl(filteredData);
        addWeatherInformation(filteredData);
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

updateInformation('tokyo');

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZEQUE2RCxTQUFTO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFNBQVM7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBLFlBQVksT0FBTztBQUNuQiw4QkFBOEIsS0FBSztBQUNuQyxZQUFZLFdBQVc7QUFDdkIsa0NBQWtDLFNBQVM7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY2l0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbmNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xuY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbmNvbnN0IHRlbXBTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXAnKTtcbmNvbnN0IGh1bWlkaXR5U3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpO1xuXG5mdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xuICAgIHJldHVybiBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtsb2NhdGlvbn0mQVBQSUQ9ZTQwMjJiOGJhNDMxYjI5NGU2NGEwNmY3MjBkNTZiZjYmdW5pdHM9bWV0cmljYFxuICAgIClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGUpID0+IGNvbnNvbGUuZXJyb3IoZSkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmaWx0ZXJEYXRhKGxvY2F0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYWxsRGF0YSA9IGF3YWl0IGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWREYXRhID0gW2FsbERhdGEubWFpbiwgYWxsRGF0YS53ZWF0aGVyWzBdXTtcbiAgICAgICAgY29uc29sZS5sb2coZmlsdGVyZWREYXRhKTtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkRGF0YTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRJY29uVXJsKGZpbHRlcmVkRGF0YSkge1xuICAgIGNvbnN0IGljb25Db2RlID0gZmlsdGVyZWREYXRhWzFdLmljb247XG4gICAgd2VhdGhlckljb24uc2V0QXR0cmlidXRlKFxuICAgICAgICAnc3JjJyxcbiAgICAgICAgYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2ljb25Db2RlfS5wbmdgXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gYWRkV2VhdGhlckluZm9ybWF0aW9uKGZpbHRlcmVkRGF0YSkge1xuICAgIGNvbnN0IHsgdGVtcCB9ID0gZmlsdGVyZWREYXRhWzBdO1xuICAgIHRlbXBTcGFuLnRleHRDb250ZW50ID0gYCR7dGVtcH3CsENgO1xuICAgIGNvbnN0IHsgaHVtaWRpdHkgfSA9IGZpbHRlcmVkRGF0YVswXTtcbiAgICBodW1pZGl0eVNwYW4udGV4dENvbnRlbnQgPSBgJHtodW1pZGl0eX0lYDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlSW5mb3JtYXRpb24obG9jYXRpb24pIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZERhdGEgPSBhd2FpdCBmaWx0ZXJEYXRhKGxvY2F0aW9uKTtcbiAgICAgICAgc2V0SWNvblVybChmaWx0ZXJlZERhdGEpO1xuICAgICAgICBhZGRXZWF0aGVySW5mb3JtYXRpb24oZmlsdGVyZWREYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfVxufVxuXG5jaXR5SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgaWYgKC9cXFMvZ20udGVzdChjaXR5SW5wdXQudmFsdWUpKSB7XG4gICAgICAgIHNlYXJjaEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2VhcmNoQnV0dG9uLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgfVxufSk7XG5cbnNlYXJjaEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IGNpdHlJbnB1dC52YWx1ZTtcbiAgICBjaXR5SW5wdXQudmFsdWUgPSAnJztcbiAgICBzZWFyY2hCdXR0b24uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKTtcbiAgICB1cGRhdGVJbmZvcm1hdGlvbihsb2NhdGlvbik7XG59KTtcblxudXBkYXRlSW5mb3JtYXRpb24oJ3Rva3lvJyk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=