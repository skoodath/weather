window.addEventListener('load', ()=>{
    //let switchbtn = document.querySelector('.weather__switch');
    let day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentdt = document.querySelector('.weather__date');
    //switchbtn.innerHTML = "Weather";
    let cdate = new Date();
    let dtfmt = cdate.toLocaleString("en-us", 
                {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric"
            });

    currentdt.innerHTML = `<span>${dtfmt}</span>`;
});

    const api = {
        key: `301063ece3c24814a1f7ea252290ef1a`,
        baseurl: `https://api.openweathermap.org/data/2.5/`
        }
    let citInput = document.querySelector(".weather__cityinput input");
    const getWeather = () => {

        let urlWeather = `${api.baseurl}weather?q=${citInput.value}&appid=${api.key}&units=imperial`;
        //let urlForecast = `${api.baseurl}forecast?q=${citInput.value}&appid=${api.key}&units=imperial`;
        let weatherdesc = document.querySelector('.weather__desc');
        let weathermisc = document.querySelector('.weather__misc');

        if(event.keyCode === 13) {
            weatherdesc.classList.remove('weather__desc_bglite', 'weather__desc_bgdark');
            weathermisc.classList.remove('weather__misc_bglite', 'weather__misc_bgdark');
            axios.get(urlWeather)
            .then (response => showWeather(response.data))
            .catch(error => {
            if(error.response){
                let errorMessage = error.response.data.message;
                showError(errorMessage);
                }
            });
            /* axios.get(urlForecast)
                .then(response => {
                    console.log(response.data);
                    showForecast(response.data)
                })
                .catch(error => {
                    if(error.response){
                console.log(error.response.data.message);
                    }
            }); */
            citInput.value = "";
            }
        
            }

    const showWeather = (weatherData) => {
        let ccity = document.querySelector('.weather__city');
        let ctemp = document.querySelector('.weather__temp');
        let cdesc = document.querySelector('.weather__desc');
        let cmisc = document.querySelector('.weather__misc');
        //let fcst = document.querySelector('.weather__forecast');
        let loc = document.querySelector('.weather__loc');
        let rlfl = document.querySelector('.weather__rlfl');
        let maxt = document.querySelector('.weather__max');
        let mint = document.querySelector('.weather__min');
        
        let lat = weatherData.coord.lat;
        let lon = weatherData.coord.lon;

        let f_rlfl = weatherData.main.feels_like.toFixed(1);
        let c_rlfl = ((f_rlfl - 32) / 1.8).toFixed(1);
        
        let f_max = weatherData.main.temp_max.toFixed(1);
        let c_max = ((f_max - 32) / 1.8).toFixed(1);
        let f_min = weatherData.main.temp_min.toFixed(1);
        let c_min = ((f_min - 32)/1.8).toFixed(1);
        let fht = weatherData.main.temp.toFixed(1);
        let celc = ((fht - 32)/1.8).toFixed(1);
        
        ccity.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
        ctemp.innerHTML = `${fht}&deg;F &#124; ${celc}&deg;C`;
        let iconstring = weatherData.weather[0].icon;
        if (iconstring.charAt(iconstring.length-1) === "d"){
            cdesc.classList.add("weather__desc_bgdark");
            cmisc.classList.add("weather__misc_bgdark");
            //fcst.classList.add('weather__forecast_bgdark')

        } else if(iconstring.charAt(iconstring.length - 1) === "n"){
            cdesc.classList.add("weather__desc_bglite");
            cmisc.classList.add("weather__misc_bglite");
            //fcst.classList.add('weather__forecast_bglite');
        }     
        cdesc.innerHTML = `<img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png"
                         alt ="${weatherData.weather[0].description}"> <span>${weatherData.weather[0].description}</span>`;
        
        
        loc.innerHTML = `<span>Lat: ${lat} </span><span>Lon: ${lon}</span>`;
        rlfl.innerHTML = `<span>Real Feel</span><span>${f_rlfl}&deg;F &#124; ${c_rlfl}&deg;C</span>`;
        maxt.innerHTML = `<span>Max</span><span>${f_max}&deg;F &#124; ${c_max}&deg;C</span>`;
        mint.innerHTML = `<span>Min</span><span>${f_min}&deg;F &#124; ${c_min}&deg;C</span>`;
}

/*const showForecast = (forecast) => {
    
    let dtfield = document.querySelector('.forecast__left');
        dtfield.innerHTML = "";
    let temfield = document.querySelector('.forecast__right');
        temfield.innerHTML = "";
    let dtlist = forecast.list;
    let listfield = document.createElement('ul');
        listfield.innerHTML = `<li>Date</li>`;
    let templist = document.createElement('ul');
        templist.innerHTML = `<li>Max &#124; Min</li>`;
        temfield.appendChild(templist);
        dtfield.appendChild(listfield);
    let dtarr = dtlist.map((d, maxt) => {
       return [d.dt, maxt.main.temp_max];
    });
    console.log(dtarr);
    let aSet = [...new Set(dtarr)];
    console.log(aSet);
    let maxTemp = dtlist.map(mt => {
       return parseInt(mt.main.temp_max);
    });
    console.log(maxTemp);
    for (let i = 1; i <aSet.length; i++){
        
    }
    for (let i = 1; i < aSet.length; i++){
        let listItem = document.createElement("li");
            listItem.innerHTML = aSet[i];
            listItem.setAttribute('id', "fdate");
            listfield.appendChild(listItem);

        if(dtlist[i].dt_txt.includes("15:00:00")){});
            if(dtlist[i].dt_txt.includes("03:00:00")){
                temps.innerHTML += `${dtlist[i].main.temp_min}&deg;F`;
                }
            }
        }
    
    }*/

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


citInput.addEventListener("keypress", getWeather);
/* let switchbtn = document.querySelector('.weather__switch');

switchbtn.addEventListener('click', () => {
    let frcst = document.querySelector('.weather__forecast');
    let wther = document.querySelector('.weather__extra');
    if(frcst.classList.contains('weather__forecast_none')){
        frcst.classList.replace('weather__forecast_none', 'weather__forecast_flex');
        wther.classList.replace('weather__xtra_grid', 'weather__xtra_none');
        switchbtn.innerHTML = "Weather";
    } else {
        frcst.classList.replace('weather__forecast_flex', 'weather__forecast_none');
        wther.classList.replace('weather__xtra_none', 'weather__xtra_grid');
        switchbtn.innerHTML = "Forecast";
    }
}); */