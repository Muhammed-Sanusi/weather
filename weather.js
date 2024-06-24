const tempData = (data) =>{
    const temperature = document.getElementById('temp-info');
    const icon = document.getElementById('icon'); 
    const weather = document.getElementById('weather-info')
    
    temperature.innerHTML = ''; 
    weather.innerHTML = ''; 
    icon.innerHTML = ''; 
    
    const city = data.name; 
    const degrees = Math.round(data.main.temp - 273.15); 
    const description = data.weather[0].description; 
    
    const tempDiv = `<p>${degrees}°C</p>`
    const weatherDiv = `<p>${city}</p>
                        <P>${description}</p>`  
    
    temperature.innerHTML = tempDiv; 
    weather.innerHTML = weatherDiv
}

const showForecast = (data, interval) =>{
    const hourly = document.getElementById('hourly'); 
    hourly.innerHTML = ''; 

    data.list.forEach((item,index) => {
        if(index % interval === 0){
            const dt = new Date(item.dt *1000); 
            const hours = dt.getHours(); 
            const celcius = Math.round(item.main.temp - 273.15); 
            const feels = item.weather[0].description; 
           
            const forecastDiv = `<div class='forecast'>
                                 <span>${hours}:00</span>
                                 <span>${celcius}</span>
                                 <span>${feels}</span>                          
            </div>`
                                 

            hourly.innerHTML += forecastDiv;
        }
        
    });
    hourly.style.overflowX = 'auto'; 
}
 

const getWeather = async () =>{
    const search = document.getElementById('city').value; 
    const key = 'b0904ab7dca5d83b79d1b67924f86d24';
    const interval = 3; 
try{
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b0904ab7dca5d83b79d1b67924f86d24`) 
    tempData(res.data); 


    const req = await axios.get (`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=b0904ab7dca5d83b79d1b67924f86d24`)
    showForecast(req.data, interval); 
    //showForecast(req.data, interval); 
}
catch (error){
    console.log("Error", error)
}

}
//`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b0904ab7dca5d83b79d1b67924f86d24`