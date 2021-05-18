//console.log("YEA")
const a = document.querySelector('.search')
const b = document.querySelector('.btn')
b.addEventListener("click",getInput);

let today= new Date();
let month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"]
let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let abs = day[today.getDay()] +", " +month[today.getMonth()]+" "+today.getDate() +" - "+today.getFullYear();

const date=document.querySelector(".date");
date.innerHTML=`${abs}`;


const api = {
    key: "4aae4a0cf311e24363dbd14355a17481",
    base: "https://api.openweathermap.org/data/2.5/"
}

function getInput(event){
    event.preventDefault();
    if (event.type == "click") {
        getData(a.value)
    }
}

function getData(val){
   // console.log(val)
    fetch(`${api.base}weather?q=${val}&units=metric&appid=${api.key}`)
        .then(response => {
            return response.json();
        }).then(displayData);
}



function displayData(response){
    //console.log(response)
    if(response.cod == "400" || response.cod== "404" ){
        //console.log("NO INPUT")
        const error = document.querySelector(".error");
        error.innerHTML = "Please enter a valid city";
        //City and Country
        const city = document.querySelector(".city");
        city.innerHTML = `UNKNOWN, UNKNOWN`;
        //Date -> init by default 
        //Weather
        const weather = document.querySelector(".weather")
        weather.innerHTML=`UNKNOWN`;
        //Temprature 
        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: UNKNOWN <span>°C</span>`;
        //Temperature Range
        const temp_range = document.querySelector(".temp-range");
        temp_range.innerHTML = `Temp Range:  UNKNOWN <span>°C</span> /  UNKNOWN <span>°C</span>` 
        //icons
        //more
    }
    else{
        const error = document.querySelector(".error");
        error.innerHTML = "";
        //console.log("Yay")
        const city = document.querySelector(".city");
        city.innerHTML = `${response.name}, ${response.sys.country}`;
        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: ${Math.round(response.main.temp)} <span>°C</span>`;
        const weather = document.querySelector(".weather")
        weather.innerHTML=`Weather: ${response.weather[0].main}`;
        //maybe add time a changing time or sumthin
        //date set by default
        //weather range
        const temp_range = document.querySelector(".temp-range");
        temp_range.innerHTML = `Temp Range ${Math.round(response.main.temp_min)}<span>°C</span> / ${Math.round(response.main.temp_max)}<span>°C</span> `
        //icons
        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

    }
}