//populate date on top
window.addEventListener('load', ()=>{
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
    //ctime.innerHTML = `${cdte.getHours()}:${cdte.getMinutes()}`;

});

//declare base url and api key for api call

    const api = {
        key: `301063ece3c24814a1f7ea252290ef1a`,
        baseurl: `https://api.openweathermap.org/data/2.5/`
        }
    let citInput = document.querySelector(".weather__cityinput input");



//API call to get weather information
    const getWeather = () => {
        let cwidth = document.querySelector('.weather');
        
        let urlWeather = `${api.baseurl}weather?q=${citInput.value}&appid=${api.key}&units=imperial`;
        //let urlForecast = `${api.baseurl}forecast?q=${citInput.value}&appid=${api.key}&units=imperial`;
        let weatherdesc = document.querySelector('.weather__desc');

        if(event.keyCode === 13) {

            axios.get(urlWeather)
            .then (response => showWeather(response.data))
            .catch(error => {
            if(error.response){
                let errorMessage = error.response.data.message;
                showError(errorMessage);
                }
            });
            /*axios.get(urlForecast)
                .then(response => {
                    console.log(response.data);
                    showForecast(response.data)
                })
                .catch(error => {
                    if(error.response){
                console.log(error.response.data.message);
                    }
            });*/
            citInput.value = "";
            //tempinput.value ="";
            //tempinput.classList.remove("phone__type_show");
            }
        
        }

//function to display weather details on the page
    const showWeather = (weatherData) => {
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
        /* if (iconstring.charAt(iconstring.length-1) === "d"){
            cdesc.classList.add("weather__desc_bgdark");
            cmisc.classList.add("weather__misc_bgdark");
            //fcst.classList.add('weather__forecast_bgdark')

        } else if(iconstring.charAt(iconstring.length - 1) === "n"){
            cdesc.classList.add("weather__desc_bglite");
            cmisc.classList.add("weather__misc_bglite");
            //fcst.classList.add('weather__forecast_bglite');
        }*/
        cicon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconstring}@2x.png"
                                alt ="${weatherData.weather[0].description}">`;
        cdesc.innerHTML = weatherData.weather[0].description;
        rlfl.classList.add("weather__real_style");
        rlfl.innerHTML = `Real Feel: ${c_rlfl}&deg;C &#124; ${f_rlfl}&deg;F`;

}
//function to display forecast details on the page
/* const showForecast = (forecast) => {
    let dtlist = forecast.list;
    let dtlistItem = document.querySelectorAll('.forecast__dt');
    let temfield = document.querySelector('.forecast__right');
        temfield.innerHTML = "";
        console.log(forecast.list);
        } */


//error message display function

const showError = (msg) => {
    const input = document.querySelector('.weather__cityinput input');
    let clearAll = document.querySelectorAll('.clear');
    clearAll.forEach(el => {
        el.innerHTML = "";
    });

    let errDis = document.querySelector('#errordisplay');
    errDis.classList.add("weather__error_hilite");
    errDis.innerHTML = `${msg}`;
    input.classList.add('input__error');
    setTimeout(() => {
        errDis.classList.remove("weather__error_hilite");
        input.classList.remove('input__error');
        errDis.innerHTML = ""
    }, 3000);
}

//event listener to make the api call

citInput.addEventListener("keypress", getWeather);

//switch button to swap between forecast and weather

const themeSwitch = document.querySelector('.weather__mode');
const currentTheme = localStorage.getItem('theme');
const defaultLabel = document.querySelector('.weather__modebox label');

if (currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'lite'){
        themeSwitch.checked = true;
        defaultLabel.innerHTML = `Dark`;
    } else {
        defaultLabel.innerHTML = `Lite`;
    }
}



const themeSwitcher = (e) => {
    let label = document.querySelector('.weather__modebox label');
    let theme = document.querySelector('html');
    if(e.target.checked){

        theme.setAttribute('data-theme', 'lite');
        localStorage.setItem('theme', 'lite');
        label.innerHTML = 'Dark';

    }
    else if (!e.target.checked){

        theme.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        label.innerHTML = 'Lite';
    
    }

}
themeSwitch.addEventListener('change', themeSwitcher, false);

