
let localHometown = localStorage.getItem("hometown");


let cityName = document.getElementById("cityName");
let cityAdjective = document.getElementById("cityAdjective");
let realTemp = document.getElementById("realTemp");
let overlay = document.getElementById("overlay");
let hometown = document.getElementById("hometown");
let sky = document.getElementById("sky");
let lightning = document.getElementById("lightning");
let drops = document.getElementById("drops");
let cloud1 = document.querySelector(".cloud1");
let cloud2 = document.querySelector(".cloud2");
let starrySky = document.querySelector(".starry-sky");
let title = document.getElementById("title");
let cityButtons = document.getElementById("cityButtons");
let hometownButtons = document.getElementById("hometownButtons");
let alertWindow = document.getElementById("alertWindow");
let weatherContainer = document.getElementById("weather");
let vectorsSB = document.getElementById("vectorsSB");
let vectorsOS = document.getElementById("vectorsOS");
let vectorsST = document.getElementById("vectorsST");
let vectorsOD = document.getElementById("vectorsOD");
let birds = document.getElementById("birds");
let vectors = document.querySelector(".vectors");
let root = document.querySelector(':root');
let grass = document.getElementById("grass");

window.addEventListener("load", function() {

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
    vectors.classList.remove("visible");
        try {
            let data = await getSlavonskiBrod();
            while(!data ||data === "" || data === 0){
                await new Promise(resolve => setTimeout(resolve, 1000));
                data = await getSlavonskiBrod();
            }
            console.log(data);
            let resultData = JSON.parse(data);
            cityButtons.classList.remove("visible");
            vectorsSB.classList.add("visible");
            vectors = vectorsSB;
            fillData(resultData);
        } catch (err) {
            console.log(err);
        }
}

async function getBadAiblingResult() {
    vectors.classList.remove("visible");
    try {
        let data = await getBadAibling();
        while(!data ||data === "" || data === 0){
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getBadAibling();
        }
        console.log(data);
        let resultData = JSON.parse(data);
        fillData(resultData);
        cityButtons.classList.remove("visible");
    } catch (err) {
        console.log(err);
    }
}

async function getOdenseResult() {
    vectors.classList.remove("visible");
    try {
        let data = await getOdense();
        while(!data ||data === "" || data === 0){
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getOdense();
        }
        console.log(data);
        let resultData = JSON.parse(data);
        cityButtons.classList.remove("visible");
        vectorsOD.classList.add("visible");
            vectors = vectorsOD;
        fillData(resultData);
        
    } catch (err) {
        console.log(err);
    }
}

async function getOsijekResult() {
    vectors.classList.remove("visible");
    try {
        let data = await getOsijek();
        while(!data ||data === "" || data === 0){
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getOsijek();
        }
        console.log(data);
        let resultData = JSON.parse(data);
        vectorsOS.classList.add("visible");
        cityButtons.classList.remove("visible");
        vectors = vectorsOS;
        fillData(resultData);
    } catch (err) {
        console.log(err);
    }
}

async function getStrosinciResult() {
    vectors.classList.remove("visible");
    try {
        let data = await getStrosinci();
        while(!data ||data === "" || data === 0){
            await new Promise(resolve => setTimeout(resolve, 1000));
            data = await getStrosinci();
        }
        console.log(data);
        let resultData = JSON.parse(data);
        vectorsST.classList.add("visible");
        cityButtons.classList.remove("visible");
        vectors = vectorsST;
        fillData(resultData);
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
        // feelTemp.innerHTML = 'Feels like ' +Math.round(resultData.main.feels_like) + ' °C';
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

        birds.classList.remove("visible");
        lightning.classList.remove("stormy");
        vectors.classList.remove("cloudy-vectors", "rainy-vectors", "snowy-vectors", "sunny-vectors", "night-vectors");
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
                root.style.setProperty('--bgcolor', '#08326f');
                vectors.classList.add("rainy-vectors");
                grass.style.filter = "brightness(0) saturate(100%) invert(12%) sepia(27%) saturate(6912%) hue-rotate(207deg) brightness(96%) contrast(94%)";
                break;
            case 'Drizzle':
                cityAdjective.innerHTML = 'drizzly';
                sunReplacement.src = "./images/cloud.png";
                sunReplacement.classList.add("clouds");
                overlay.classList.add('clouds-overlay');
                sky.classList.add("drizzly");
                drops.classList.add("rainy");
                root.style.setProperty('--bgcolor', '#08326f');
                vectors.classList.add("rainy-vectors");
                grass.style.filter = "brightness(0) saturate(100%) invert(12%) sepia(27%) saturate(6912%) hue-rotate(207deg) brightness(96%) contrast(94%)";
                break;
            case 'Rain':
                cityAdjective.innerHTML = 'rainy';
                sunReplacement.src = "./images/cloud.png";
                sunReplacement.classList.add("clouds");
                overlay.classList.add('rain-overlay');
                sky.classList.add("rainy");
                drops.classList.add("rainy");
                root.style.setProperty('--bgcolor', '#08326f');
                vectors.classList.add("rainy-vectors");
                grass.style.filter = "brightness(0) saturate(100%) invert(12%) sepia(27%) saturate(6912%) hue-rotate(207deg) brightness(96%) contrast(94%)";
                animateSun();
                break;
            case 'Snow':
                cityAdjective.innerHTML = 'snowy';
                sunReplacement.src = "./images/cloud.png";
                sunReplacement.classList.add("clouds");
                overlay.classList.add('snow-overlay');
                sky.classList.add("snowy");
                vectors.classList.add("snowy-vectors");
                root.style.setProperty('--bgcolor', 'rgb(138, 181, 255)');
                grass.style.filter = "brightness(0) saturate(100%) invert(36%) sepia(25%) saturate(1198%) hue-rotate(179deg) brightness(91%) contrast(91%)";
                break;
            case 'Atmosphere':
                cityAdjective.innerHTML = 'misty';
                break;
            case 'Clear':
                sunReplacement.className = "";
                overlay.className= "";
                cityAdjective.innerHTML = 'sunny';
				sunReplacement.classList.add("sunny");
                birds.classList.add("visible");
                sunReplacement.src = "./images/sun.png";
                overlay.classList.add('sunny-overlay');
                root.style.setProperty('--bgcolor', 'rgb(135, 76, 0)');
                vectors.classList.add("sunny-vectors");
                grass.style.filter = "brightness(0) saturate(100%) invert(23%) sepia(31%) saturate(7114%) hue-rotate(41deg) brightness(94%) contrast(101%)";
                animateSun();
                break;
            case 'Clouds':
                sunReplacement.className = "";
                cityAdjective.innerHTML = 'cloudy';
				sunReplacement.src = "./images/cloud.png";
				sunReplacement.classList.add("clouds");
                overlay.classList.add('clouds-overlay');
                birds.classList.add("visible");
                sky.classList.add("cloudy");
                cloud1.classList.add("animate");
                vectors.classList.add("cloudy-vectors");
                root.style.setProperty('--bgcolor', 'rgb(0,76,127)');
                grass.style.filter = "brightness(0) saturate(100%) invert(19%) sepia(25%) saturate(6442%) hue-rotate(186deg) brightness(94%) contrast(101%)";
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
    // currentDate.getHours();

    var sunsetFinal = sunsetDate.getHours();
    var sunriseFinal = sunriseDate.getHours();
    var x = Math.round(((hours - sunriseFinal)/(sunsetFinal - sunriseFinal)) * 180);
    document.querySelector(':root').style.setProperty('--rotation', '-'+x+'deg');
    
    sun.style.transform="rotate("+x+"deg)";
    if(hours > sunsetFinal || hours < sunriseFinal){
        console.log(hours);
        overlay.classList.add("night");
        cityAdjective.innerHTML = 'dark';
        drops.classList.add("night");
        starrySky.classList.add("night");
        sunReplacement.className = "";
        sunReplacement.classList.add("night");
        vectors.classList.add("night-vectors");
        root.style.setProperty('--bgcolor', '#010038');
        grass.style.filter = "brightness(0) saturate(100%) invert(5%) sepia(91%) saturate(4539%) hue-rotate(241deg) brightness(80%) contrast(117%)";

        var x = 70;
    document.querySelector(':root').style.setProperty('--rotation', '-'+x+'deg');
    
    sun.style.transform="rotate("+x+"deg)";

    
    } else {
        overlay.classList.remove("night");
        drops.classList.remove("night");
        starrySky.classList.remove("night");
        sunReplacement.classList.remove("night");
    }
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

// variables declarations
var i;
var star = document.getElementsByClassName("star").length;
var length = document.documentElement.clientWidth;
// we use for loop to assign unique random values for the x position and animation speed
for (i = 0; i < star; i++) {
  x = Math.floor(Math.random() * length);
  y = Math.floor(Math.random() * 10);
document.getElementsByClassName("star")[i].style.transform = "translateX(" + x + "px)";
document.getElementsByClassName("star")[i].style.animationDuration = y + "s";  
} 

function openFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
         if (document.documentElement.requestFullscreen) {
           document.documentElement.requestFullscreen();
           screen.orientation.lock('portrait');
         } else if (document.documentElement.mozRequestFullScreen) {
           document.documentElement.mozRequestFullScreen();
           screen.orientation.lock('portrait');
         } else if (document.documentElement.webkitRequestFullscreen) {
           document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
           screen.orientation.lock('portrait');
         }
       } else {
          if (document.cancelFullScreen) {
             document.cancelFullScreen();
             screen.orientation.lock('portrait');
          } else if (document.mozCancelFullScreen) {
             document.mozCancelFullScreen();
             screen.orientation.lock('portrait');
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
            screen.orientation.lock('portrait');
          }
       }
     }



     document.addEventListener('click', (e) => {
         if(!hometownBox.contains(e.target) && (!hometownButtons.contains(e.target))) hometownButtons.classList.remove('visible');
         if(!citiesBox.contains(e.target)) cityButtons.classList.remove('visible');
       })
