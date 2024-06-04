
let weatherURL = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
let geocodingURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";
let localHometown = localStorage.getItem("hometown");




let cityName = document.getElementById("cityName");
let cityAdjective = document.getElementById("cityAdjective");
let realTemp = document.getElementById("realTemp");
let feelTemp = document.getElementById("feelTemp");
let weatherBackground = document.getElementById("weatherBackground");
let overlay = document.getElementById("overlay");
let hometown = document.getElementById("hometown");
let sky = document.getElementById("sky");
let lightning = document.getElementById("lightning");
let drops = document.getElementById("drops");
let cloud1 = document.querySelector(".cloud1");
let cloud2 = document.querySelector(".cloud2");
let title = document.getElementById("title");
let cityButtons = document.getElementById("cityButtons");
let hometownButtons = document.getElementById("hometownButtons");
let alertWindow = document.getElementById("alertWindow");
let welcomeScreen = document.getElementById("welcomeScreen");
let logo = document.getElementById("logo");
let weatherContainer = document.getElementById("weather");
let vectorsSB = document.getElementById("vectorsSB");

window.addEventListener("load", function() {
    // welcomeScreen.style.display = "grid";

    switch(localHometown){
        case "osijek":
            getOsijekResult();
            break;
        case "strosinci":
            getStrosinciResult();
            break;
        case "odense":
            getOdenseResult();
            break;
        case "badaibling":
            getBadAiblingResult();
            break;
        default:
            getBrodResult();
            break;
    }


});

function saveHometown() {
    localStorage.setItem("hometown", hometown.value);
    hometownButtons.classList.remove("visible");
    alertWindow.innerHTML = "Your hometown is set to " + hometown.options[hometown.selectedIndex].text;
    alertWindow.style.opacity = "1";
    setTimeout(() => alertWindow.style.opacity = '0', 3000)
}


async function getBrodResult() {
        try {
            let data = await getSlavonskiBrod();
            while(!data ||data === "" || data === 0){
                await new Promise(resolve => setTimeout(resolve, 1000));
                data = await getSlavonskiBrod();
            }
            console.log(data);
            let resultData = JSON.parse(data);
            fillData(resultData);
            weatherBackground.src = './images/sb1.png';
            cityButtons.classList.remove("visible");
            vectorsSB.classList.add("visible");
        } catch (err) {
            console.log(err);
        }
}

async function getBadAiblingResult() {
    try {
        let data = await getBadAibling();
        while(!data ||data === "" || data === 0){
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getBadAibling();
        }
        console.log(data);
        let resultData = JSON.parse(data);
        fillData(resultData);
        weatherBackground.src = './images/badaibling.png';
        cityButtons.classList.remove("visible");
    } catch (err) {
        console.log(err);
    }
}

async function getOdenseResult() {
    try {
        let data = await getOdense();
        while(!data ||data === "" || data === 0){
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getOdense();
        }
        console.log(data);
        let resultData = JSON.parse(data);
        fillData(resultData);
        weatherBackground.src = './images/odense.png';
        cityButtons.classList.remove("visible");
    } catch (err) {
        console.log(err);
    }
}

async function getOsijekResult() {
    try {
        let data = await getOsijek();
        while(!data ||data === "" || data === 0){
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getOsijek();
        }
        console.log(data);
        let resultData = JSON.parse(data);
        fillData(resultData);
        weatherBackground.src = './images/osijek.png';
        cityButtons.classList.remove("visible");
    } catch (err) {
        console.log(err);
    }
}

async function getStrosinciResult() {
    try {
        let data = await getStrosinci();
        while(!data ||data === "" || data === 0){
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getStrosinci();
        }
        console.log(data);
        let resultData = JSON.parse(data);
        fillData(resultData);
        weatherBackground.src = './images/strosinci1.png';
        cityButtons.classList.remove("visible");
    } catch (err) {
        console.log(err);
    }
}

let sunriseTimestamp;
let sunsetTimestamp;

let sunsetTime;
let sunriseTime;
let currentTime;

let sunriseDate;
let sunsetDate;
let currentDate;

const sun = document.querySelector('.sun');
let sunReplacement = document.getElementById("sunReplacement");

async function fillData(resultData) {
    cityName.innerHTML = resultData["name"];
    if (cityName.innerHTML == "Jamena") {
        cityName.innerHTML = "Strošinci";
    }
        realTemp.innerHTML = Math.round(resultData.main.temp) + ' °C';
        feelTemp.innerHTML = 'Feels like ' +Math.round(resultData.main.feels_like) + ' °C';
        let adjective = resultData.weather[0].main;
        

        sunriseTimestamp = resultData.sys.sunrise;
	sunsetTimestamp = resultData.sys.sunset;

	sunriseDate = new Date(sunriseTimestamp * 1000);
	sunsetDate = new Date(sunsetTimestamp * 1000);
	 currentDate = new Date();
	


	function formatTime(date) {
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');
		return `${hours}:${minutes}:${seconds}`;
	}

		sunriseTime = formatTime(sunriseDate);
		sunsetTime = formatTime(sunsetDate);
		currentTime = formatTime(currentDate);

		animateSun();
        setInterval(animateSun(), 1000 * 60 * 60);

        
        sky.classList.remove("rainy");
        drops.classList.remove("rainy");
        cloud1.classList.remove("animate"); 
        switch(adjective) {
            case 'Thunderstorm':
                cityAdjective.innerHTML = 'stormy';
                sunReplacement.classList.add("clouds");
                overlay.classList.add('clouds-overlay');
                sky.classList.add("rainy");
                drops.classList.add("rainy");
                lightning.classList.add("stormy");
                break;
            case 'Drizzle':
                cityAdjective.innerHTML = 'drizzly';
                sunReplacement.src = "./images/cloud.png";
                sunReplacement.classList.add("clouds");
                overlay.classList.add('clouds-overlay');
                sky.classList.add("drizzly");
                drops.classList.add("rainy");
                break;
            case 'Rain':
                cityAdjective.innerHTML = 'rainy';
                sunReplacement.src = "./images/cloud.png";
                sunReplacement.classList.add("clouds");
                overlay.classList.add('rain-overlay');
                sky.classList.add("rainy");
                drops.classList.add("rainy");
                animateSun();
                break;
            case 'Snow':
                cityAdjective.innerHTML = 'snowy';
                sunReplacement.src = "./images/cloud.png";
                sunReplacement.classList.add("clouds");
                overlay.classList.add('snow-overlay');
                sky.classList.add("snowy");
                break;
            case 'Atmosphere':
                cityAdjective.innerHTML = 'misty';
                break;
            case 'Clear':
                sunReplacement.className = "";
                overlay.className= "";
                cityAdjective.innerHTML = 'sunny';
				sunReplacement.classList.add("sunny");
                sunReplacement.src = "./images/sun.png";
                overlay.classList.add('sunny-overlay');
                animateSun();
                break;
            case 'Clouds':
                sunReplacement.className = "";
                cityAdjective.innerHTML = 'cloudy';
				sunReplacement.src = "./images/cloud.png";
				sunReplacement.classList.add("clouds");
                overlay.classList.add('clouds-overlay');
                sky.classList.add("cloudy");
                cloud1.classList.add("animate");
                animateSun();
                break;
        }
        title.innerHTML = "It's always " + cityAdjective.innerHTML + " in " + cityName.innerHTML;
		
}


function animateSun() {
    sunriseDate = new Date(sunriseTimestamp * 1000);
	sunsetDate = new Date(sunsetTimestamp * 1000);
	const currentDate = new Date();
    const hours = currentDate.getHours();
    var sunsetFinal = sunsetDate.getHours();
    var sunriseFinal = sunriseDate.getHours();
    var x = Math.round(((hours - sunriseFinal)/(sunsetFinal - sunriseFinal)) * 180);
    document.querySelector(':root').style.setProperty('--rotation', '-'+x+'deg');
    
    sun.style.transform="rotate("+x+"deg)";
}


async function getSlavonskiBrod() {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=45.1665803&lon=18.0121385&units=metric&appid=6cbd93cb0a1539153a66b0b61c941593");
        const data = await response.text();
        return data;
    } catch (err) {
        throw err;
    }
}

async function getOsijek() {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=45.55111&lon=18.69389&units=metric&appid=6cbd93cb0a1539153a66b0b61c941593");
        const data = await response.text();
        return data;
    } catch (err) {
        throw err;
    }
}
async function getStrosinci() {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=44.915157&lon=19.067002&units=metric&appid=6cbd93cb0a1539153a66b0b61c941593");
        const data = await response.text();
        return data;
    } catch (err) {
        throw err;
    }
}

async function getOdense() {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=55.39594&lon=10.38831&units=metric&appid=6cbd93cb0a1539153a66b0b61c941593");
        const data = await response.text();
        return data;
    } catch (err) {
        throw err;
    }
}


async function getBadAibling() {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=47.86401820&lon=12.00931710&units=metric&appid=6cbd93cb0a1539153a66b0b61c941593");
        const data = await response.text();
        return data;
    } catch (err) {
        throw err;
    }
}


function showHometown() {
    hometownButtons.classList.toggle("visible");
    cityButtons.classList.remove("visible");
}

function showCities() {
    cityButtons.classList.toggle("visible");
    hometownButtons.classList.remove("visible");
}