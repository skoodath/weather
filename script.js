//populate date on top
const showDate = () =>{
    let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const cweek = document.querySelector('.weather__week');
    const cdate = document.querySelector('.weather__date');
    //const ctime = document.querySelector('.weather__time');
    let cdte = new Date();
    cweek.innerHTML = day[cdte.getDay()];
    cdate.innerHTML = cdte.toLocaleString("en-us", {
        month: "short",
        day: "numeric",
        year: "numeric"
        });
    }

//declare base url and api key for api call

    const api = {
        key: `301063ece3c24814a1f7ea252290ef1a`,
        baseurl: `https://api.openweathermap.org/data/2.5/`
        }
    let citInput = document.querySelector(".weather__cityinput input");



//API call to get weather information
    const getWeather = (event) => {
        let cwidth = document.querySelector('.weather');
        
        let urlWeather = `${api.baseurl}weather?q=${citInput.value}&appid=${api.key}&units=imperial`;
        let weatherdesc = document.querySelector('.weather__desc');
        if(event.keyCode === 13) {

            axios.get(urlWeather)
                .then(response => {
                    showWeather(response.data)
                })
                .catch(error => {
                    if(error.response){
                    console.log(error.response.data.message);
                    showError(error.response.data.message);
                }
                
            })
            citInput.value = "";
        }
        
    }
//function to display weather details on the page
    const showWeather = (weatherData) => {
        if(weatherData.cod === 200){
            showDate();
        }
        let citInput = document.querySelector(".weather__cityinput input");
        let ccity = document.querySelector('.weather__city_inner');
        let ctemp = document.querySelector('.weather__cel');
        let ftemp = document.querySelector('.weather__fah');
        let cdesc = document.querySelector('.weather__desc');
        let cicon = document.querySelector('.weather__icon');
        let rlfl = document.querySelector('.weather__real');
        rlfl.classList.remove('weather__real_style');
        let f_rlfl = weatherData.main.feels_like.toFixed(0);
        let c_rlfl = ((f_rlfl - 32) / 1.8).toFixed(0);
        
        let fht = weatherData.main.temp.toFixed(1);
        let celc = ((fht - 32)/1.8).toFixed(1);
        
        ccity.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
        ctemp.innerHTML = `${celc}&deg;C`;
        ftemp.innerHTML = `${fht}&deg;F`;
        let iconstring = weatherData.weather[0].icon;
        cicon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconstring}@2x.png"
                                alt ="${weatherData.weather[0].description}">`;
        cdesc.innerHTML = weatherData.weather[0].description;
        rlfl.classList.add("weather__real_style");
        rlfl.innerHTML = `Real Feel: ${c_rlfl}&deg;C &#124; ${f_rlfl}&deg;F`;
        citInput.blur();
    }


const showError = (msg) => {
    let clearAll = document.querySelectorAll('.clear');
    clearAll.forEach(el => {
        el.innerHTML = "";
    });
    let errDis = document.querySelector('#errordisplay');
    errDis.classList.add("weather__error_hilite");
    errDis.innerHTML = `${msg}`;
    setTimeout(() => {
        errDis.classList.remove("weather__error_hilite");
        errDis.innerHTML = ""
    }, 3000);
}

//event listener to make the api call

citInput.addEventListener("keypress", getWeather);
