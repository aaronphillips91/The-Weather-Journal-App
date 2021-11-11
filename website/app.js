/* Global Variables */
const apiKey = 'd33dcf80c6080cd029170fc0ae52ac62&units=imperial'
let weather = {}
let serverData = {}
let url = ''

let generate = async () => {
    let zip = document.getElementById('zip')
    if (zip.value !== '') {
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        formatData(data)
    }
}

let formatData = (data) => {
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
    dataPost('/add', weather)
}

let dataPost = async ( url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
     // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const serverResponse = await response.json();
        dataGet('/retrieve')
        return serverResponse
    }catch(error) {
        console.log('error', error);
    }
}

let dataGet = async (getURL) => {
    const response = await fetch(getURL);
    serverData = await response.json();
    createCard(serverData)
}

let createCard = (serverData) => {
    let divDate = document.getElementById('date');
    let divTime = document.getElementById('time');
    let divCity = document.getElementById('city');
    let divTemp = document.getElementById('temp');
    let divDescription = document.getElementById('description');
    let divContent = document.getElementById('content');
    divDate.innerHTML = serverData.date;
    divTime.innerHTML = serverData.time;
    divCity.innerHTML = serverData.city;
    divTemp.innerHTML = serverData.temp;
    divDescription.innerHTML = serverData.description
    divContent.innerHTML = serverData.feelings
}

document.getElementById('generate').addEventListener('click', generate);
