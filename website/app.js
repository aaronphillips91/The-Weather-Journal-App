/* Global Variables */
const apiKey = 'd33dcf80c6080cd029170fc0ae52ac62&units=imperial'
let weather = {}
let url = ''

function createCard(weather){
    let divDate = document.getElementById('date');
    let divTime = document.getElementById('time');
    let divCity = document.getElementById('city');
    let divTemp = document.getElementById('temp');
    let divDescription = document.getElementById('description');
    let divContent = document.getElementById('content');
    divDate.innerHTML = weather.date;
    divTime.innerHTML = weather.time;
    divCity.innerHTML = weather.city;
    divTemp.innerHTML = weather.temp;
    divDescription.innerHTML = weather.description
    divContent.innerHTML = weather.feelings
}

let generate = async () => {
    let zip = document.getElementById('zip');
    if (zip.value !== '') {
        console.log("searching...")
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${apiKey}`;
        console.log("fetching")
        const response = await fetch(url);
        console.log("turning string into JSON.")
        const data = await response.json();
        console.log("done")
        saveData(data)
    }
    zip.value = '';
}

function saveData(data){
    let todayDate = new Date();
    let feelings = document.getElementById('feelings');
    weather = {
        date: todayDate.toDateString(),
        time: todayDate.toLocaleTimeString(),
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        feelings: feelings.value
    }
    feelings.value = ''
    createCard(weather)
}

document.getElementById('generate').addEventListener('click', generate);