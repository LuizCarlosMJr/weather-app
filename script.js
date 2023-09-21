const api = {
    key: "6216e624f46303d4b621770afc3f1d8b",
    url: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
}

const city = document.querySelector('.card-city');

const date = document.querySelector('.card-date');

const container_img = document.querySelector('.container-img');

const container_temp = document.querySelector('container-temp');

const temp_number = document.querySelector('.container-temp div');

const weather_desc = document.querySelector('.weather');



const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');










search_button.addEventListener('click', () => {
    /* essa function espera um evente - click, 
    qdo pressionado chamará outra fç seachResults, que terá como parâmetro o valor do input*/
    searchResults(search_input.value)
})


search_input.addEventListener('keypress', enter)
function enter(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(search_input.value)
    }
}

function searchResults(city) {
    fetch(`${api.url}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {

            displayResults(response)
        });
}

function displayResults(weather) {


    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    date.innerHTML = dateBuilder(now);

    let iconName = weather.weather[0].icon;
    container_img.innerHTML = `<img src="/icons/${iconName}.png" alt="Image Weather"></div>`;

    let temperature = `${Math.round(weather.main.temp)}`;
   
    temp_number.innerHTML = `${temperature} °C`;


    weather_desc.innerHTML = weather.weather[0].description;
    // console.log("OIEEE",weather_desc);
    //return string.charAt(0).toUpperCase() + string.slice(1);


}

function dateBuilder(noww) {
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let day = days[noww.getDay()]; //getDay: 0-6
    let date = noww.getDate();
    let month = months[noww.getMonth()];
    let year = noww.getFullYear();
    let horas = noww.getHours();
    let min = noww.getMinutes();

    return `${day}, ${date} ${month} de ${year}`;
}

