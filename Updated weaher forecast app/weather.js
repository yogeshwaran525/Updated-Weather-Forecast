// Time elements
const timeE1 = document.getElementById('time');
const dateE1 = document.getElementById('date');
const timezone = document.getElementById('time-zone');
// Todays Forecast details
const currentweatheritemsE1 = document.getElementById('current-weather-items');  
// User Searching Location name 
const place = document.getElementById('place'); 
// Daily Forecast data
const Daily = document.getElementById('day');
// Search  Section
var searchbar = document.getElementById('search-bar');
// Hourly Forecast displaying dates
const hourdate1 = document.getElementById('hour-date1');
const hourdate2 = document.getElementById('hour-date2');
const hourdate3 = document.getElementById('hour-date3');
// Hourly Forecast Weather Datas
const hourcontainer1 = document.getElementById('hour-container1');
const hourcontainer2 = document.getElementById('hour-container2');
const hourcontainer3 = document.getElementById('hour-container3');
// Front page preloading Animation
let preloader = document.getElementById('loading');
// FooterConainer 
const footercontainer = document.getElementById('footer-container');
// Arrays of date and month format datas => days[day] and months[month]
const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'oct', 'Nov', 'Dec'];
// Periodically refresh the data
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const datewithzero = date < 10 ? "0" + date : date;
    const day = time.getDay();
    const hour = time.getHours();
    const hoursin12horsformat = hour >= 13 ? hour % 12 : hour;
    const hourswithzeroformat = hoursin12horsformat < 10 ? "0" + hoursin12horsformat : hoursin12horsformat;
    const minutes = time.getMinutes();
    const minuteswithzeroformat = minutes < 10 ? "0" + minutes : minutes;
    const AmPm = hour >= 12 ? 'PM' : 'AM';
    timeE1.innerHTML = hourswithzeroformat + ':' + minuteswithzeroformat + '' + `<span id="AM-PM">${AmPm}</span>`;
    dateE1.innerHTML = days[day] + '&nbsp' + datewithzero + '&nbsp' + months[month];
}, 10000);
// Getlocation User  Coordinates or Location name as stored in variable name input 
// Location Icon Click To trigger the getweaherdata Function And Get coordiantes stored into a variable name input
var input = '';
locationbutton = document.getElementById('locationbutton');
locationbutton.addEventListener('click', getweatherData);
// Checks User Device having Geolocation or not
function getweatherData(){
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        mycoordinates = `${latitude},${longitude}`;
        input = mycoordinates;
        searchfunction();
        preloader.style.display = 'none';
    })
}else{
    alert('Geolocation is not supported to your device');}
} 
// User enter the location name and click search icon location name stored into a variable name input
form = document.getElementById('search'); form.addEventListener('submit', (e) => {
    e.preventDefault();
    input = searchbar.value;
    bublinganimation()
    searchfunction()  
})
// If Searchbar input is empty show alert message
// Search Bar Input OK or Notok Show green or red background Status
function bublinganimation() {
    if (searchbar.value == 0) {
        // Display the input format is notok show red box shadow and background 
        // on search box in certain interval of time
        setTimeout(function () { 
            searchbar.style.boxShadow = '5px 5px red' 
        }, 1000)
        setTimeout(function () { 
            searchbar.style.background = '#eb8484'    
        }, 3000)
        setTimeout(function () { 
           searchbar.style.background = 'none'
           searchbar.style.boxShadow = 'none'  
       }, 9000)
        alert('Enter the valid location name or lattitude,longitude format')
    } else {
        // Display the input format is okay show green outline on search box in certain interval of time
        setTimeout(function () {
            searchbar.style.outline = ' 5px solid #008000'
        }, 1000)
        setTimeout(function () { 
            preloader.style.display = 'none'
        }, 1000)        
        setTimeout(function () {            
            searchbar.style.outline = 'none'
        }, 7000) } }
// Search Function
function searchfunction() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f260a9b20bmsh1cefaa59da9ae9dp181641jsn63e96a15bfb9',  
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }    };
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${input}&days=3`, options)
        .then(response => response.json())
        .then(data => {
            showeatherData(data);   
        }).catch(() => {
            alert('No Matching location found. Or OOPS Something Went Wrong Try Again.')
        });
}
// Todays Forecast data
function showeatherData(data) {
    let { humidity, pressure_in, temp_c, wind_kph } = data.current;
    let { forecastday } = data.forecast;
    let { name } = data.location;

    place.innerHTML = `<div id=place>&nbsp;&nbsp;Weather in ${name}</div>`;
    currentweatheritemsE1.innerHTML = `     
    <div id="text">${forecastday[0].day.condition.text}</div><br>
    <div class="weather-item">    
            <div>Humidity</div>
            <div>${humidity}%</div>                    
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${pressure_in}</div>
        </div>
        <div class="weather-item">
            <div>Temperature</div>
            <div>&nbsp&nbsp${temp_c}°C</div>
        </div>
        <div class="weather-item">
            <div>Windspeed</div>
            <div>${wind_kph}&nbsp;kph</div>
        </div>
    </div>`;

    showDailyForecast(data);
}
// Show daily forecast data
function showDailyForecast(data) {
//  Forecast Days length Assigned to const variable name day_length 
    let {forecastday} = data.forecast;
    const day_length = forecastday.length;

    let otherday = '';
    for (s = 0; s < day_length; s++) {
    let { forecastday } = data.forecast;
    otherday += `
    <ul  class="day" id="day">
    <li  class="day-container" id="day-container">
    <div id="daydate">${window.moment(forecastday[s].date).format('DD-MM-YYYY')}</div>
    <div id="daytext">${forecastday[s].day.condition.text}</div>
    <img id="dayimage" src="images/64x64/day/${forecastday[s].day.condition.code}.png"><br> 
    <div id="day1-weather-item">
        <div id="day1">Sunrise</div>
        <div>&nbsp;${forecastday[s].astro.sunrise}</div>
    </div>
    <div id="day1-weather-item">
        <div id="day1">Sunset</div>
        <div>&nbsp;${forecastday[s].astro.sunset}</div>
    </div>
    <div id="day1-weather-item">
        <div id="day1">Humidity</div>
        <div>&nbsp;${forecastday[s].day.avghumidity}%</div>
    </div>
    <div id="day1-weather-item">
        <div id="day1">Temperature</div>
        <div>&nbsp;&nbsp;${forecastday[s].day.avgtemp_c}°C</div>
    </div> 
    </li>
    </ul>   `;

    }
    
    Daily.innerHTML = otherday;
    showHourlyForecast(data);
}
// Show Hourly Forecast data
// 4hrs ones Forecast data
function showHourlyForecast(data) {
    let hourlyforecastday1 = '';
    let hourlyforecastday2 = '';
    let hourlyforecastday3 = '';
    let hourlyforecastdate1 = '';
    let hourlyforecastdate2 = '';
    let hourlyforecastdate3 = '';

//  Forecast Hour length Assigned to const variable name hour_length
    let {forecastday} = data.forecast;
    const hour_length = forecastday[0].hour.length;

    for (j = 0; j < hour_length; j++) {
        for (i = 0; i < 1; i++) {
            let { forecastday } = data.forecast;
            hourlyforecastdate1 = `<div  class="hour-date" id="hour-date1">Hourly Forecast 
            ${window.moment(forecastday[i].date).format('DD-MM-YYYY')}</div>`
            hourlyforecastday1 += `<ul id="hour-container"><li>
            <img id="hourimage" src="images/64x64/day/${(forecastday[i].hour[j].condition.code)}.png">
            <div id="hourtext">${window.moment(forecastday[i].hour[j].time).format('HH:MM A')}
            <br>${(forecastday[i].hour[j].condition.text)}<br>${(forecastday[i].hour[j].feelslike_c)}°C
            <br>${(forecastday[i].hour[j].humidity)}%</div></li></ul>`;
        }
        hourcontainer1.innerHTML = hourlyforecastday1;
        hourdate1.innerHTML = hourlyforecastdate1;
        for (k = 1; k < 2; k++) {
            let { forecastday } = data.forecast;

            hourlyforecastdate2 = `<div  class="hour-date" id="hour-date2">Hourly Forecast 
            ${window.moment(forecastday[k].date).format('DD-MM-YYYY')}</div>`
            hourlyforecastday2 += `<ul id="hour-container"><li>
            <img id="hourimage" src="images/64x64/day/${(forecastday[k].hour[j].condition.code)}.png">
            <div id="hourtext">${window.moment(forecastday[k].hour[j].time).format('HH:MM A')}
            <br>${(forecastday[k].hour[j].condition.text)}<br>${(forecastday[k].hour[j].feelslike_c)}°C
            <br>${(forecastday[k].hour[j].humidity)}%</div></li></ul>`;
        }
        hourcontainer2.innerHTML = hourlyforecastday2;
        hourdate2.innerHTML = hourlyforecastdate2;
        for (m = 2; m < 3; m++) {
            let { forecastday } = data.forecast;

            hourlyforecastdate3 = `<div class="hour-date" id="hour-date3" >Hourly Forecast 
            ${window.moment(forecastday[m].date).format('DD-MM-YYYY')}</div>`
            hourlyforecastday3 += `<ul  id="hour-container"><li>
            <img id="hourimage" src="images/64x64/day/${(forecastday[m].hour[j].condition.code)}.png">
            <div id="hourtext">${window.moment(forecastday[m].hour[j].time).format('HH:MM A')}
            <br>${(forecastday[m].hour[j].condition.text)}<br>${(forecastday[m].hour[j].feelslike_c)}°C
            <br> ${(forecastday[m].hour[j].humidity)}%</div></li></ul>`; }
        hourcontainer3.innerHTML = hourlyforecastday3;
        hourdate3.innerHTML = hourlyforecastdate3;    }
    mapfunc(data);
}
// Show input location in map (leaflet map api used)
function mapfunc(data){
    setTimeout(() => {
        let {lat,lon} = data.location;  
        let map = L.map('maps').setView([0, 0],1);
        var marker = L.marker([lat,lon]).addTo(map); 
        var attribution = '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
        var mapurl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        var tiles = L.tileLayer(mapurl,{ attribution });
        tiles.addTo(map);

        var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(map);
        marker.bindPopup('Searched Location Here');
        polygon.openPopup();        
    },100)
        refreshfunction(data);
        linechart(data)
}
// Reload the wep page for reload all the content and the mapfunc(map)
function refreshfunction(data){
    locationbutton.addEventListener('click',()=>{
      setTimeout(()=>{
       window.location.reload();
    },100)
    }); 
    form.addEventListener('submit',()=>{
        setTimeout(()=>{
            window.location.reload();
    },100)
    });      
}
// Display line graph or chart of hourly forecast datas using Chart JS 
function linechart(data) {   
    const hour_day01 = data.forecast.forecastday[0].hour
    // Map function for getting the data of day-01 temp_c
    const temp_day_01 = hour_day01.map(function(elem){
        return elem.temp_c;
    })
    // Map function for getting the data of day-01 time in hour Am/Pm
    const datetime_day_01 = hour_day01.map(function(elem){
        return  window.moment(elem.time).format('HH A')
    }) 
    // Map function for getting the data of day-01 humidity
    const humidity_day_01 = hour_day01.map(function(elem){
        return elem.humidity;
    })
    // Map function for getting the data of day-01 humidity
    const wind_day_01 = hour_day01.map(function(elem){
        return elem.wind_kph; })
    //Line chart of day 1 forecast data 
    Chart.defaults.color = 'color';   
    Chart.defaults.font.size = 17;
    const chart1 = document.getElementById('canvas_day_1');
    new Chart(chart1, {      
      type: 'line',
      data: {
        labels: datetime_day_01,
        datasets: [{
          label: 'TEMPETURE OF DAY-1',
          data:temp_day_01,
          borderColor:'rgb(10, 204, 139)',
          backgroundColor: ['rgb(241, 238, 14)'],
          borderwidth: '20px',  
        },{
            label: 'HUMIDITY OF DAY-1',
            data:humidity_day_01,
            borderColor:'rgb(226, 52, 81)',
            backgroundColor: ['rgb(241, 238, 14)'],
            borderwidth: '20px'      
          },{
            label: 'WIND SPEED OF DAY-1',
            data:wind_day_01,
            borderColor:'rgb(152, 214, 7)',
            backgroundColor: ['rgb(241, 238, 14)'],
            borderwidth: '20px'      
          }]
      },      
      options: {
        maintainAspectRatio:false,
        scales: {
        y: { beginAtZero: true, 
            title:{
            display:true,
            text:'Temp,Humidity,Wind'            
        }            
        },
        x: { beginAtZero: true, 
            title:{
            display:true,
            text:'Hours of Day-1'}            
        }
        }
      }
    });
    const hour_day02 =data.forecast.forecastday[1].hour
    const temp_day_02 = hour_day02.map(function(elem){
        return elem.temp_c;  })
    const datetime_day_02 = hour_day02.map(function(elem){
        return  window.moment(elem.time).format('HH A') }) 
    const humidity_day_02 = hour_day02.map(function(elem){
        return elem.humidity;  }) 
    const wind_day_02 = hour_day02.map(function(elem){
        return elem.wind_kph;  })
    //Line chart of day 2 forecast data     
    const chart2 = document.getElementById('canvas_day_2');
    new Chart(chart2, {
      type: 'line',
      data: {
        labels: datetime_day_02,
        datasets: [{
          label: 'TEMPETURE OF DAY-2',
          data:temp_day_01, 
          borderColor:'rgb(10, 204, 139)',
          backgroundColor: ['rgb(241, 238, 14)'],
          borderwidth: '20px'      
        },{
            label: 'HUMIDITY OF DAY-2',
            data:humidity_day_02, 
            borderColor:'rgb(226, 52, 81)',
            backgroundColor: ['rgb(241, 238, 14)'],
            borderwidth: '20px'      
          },{
            label: 'WIND SPEED OF DAY-2',
            data:wind_day_02, 
            borderColor:'rgb(152, 214, 7)',
            backgroundColor: ['rgb(241, 238, 14)'],
            borderwidth: '20px'      
          }]
      },      
      options: {
        maintainAspectRatio:false,
        scales: {
            y: { beginAtZero: true, 
                title:{
                display:true,
                text:'Temp,Humidity,Wind'}            
            },
            x: { beginAtZero: true, 
                title:{
                display:true,
                text:'Hours of Day-2'}            
            }
        }
      }
    });   
    const hour_day03 =data.forecast.forecastday[2].hour
    const temp_day_03 = hour_day03.map(function(elem){
        return elem.temp_c;   })    
    const datetime_day_03 = hour_day03.map(function(elem){
        return  window.moment(elem.time).format('HH A')  }) 
    const humidity_day_03 = hour_day03.map(function(elem){
        return elem.humidity;  })
    const wind_day_03 = hour_day03.map(function(elem){
        return elem.wind_kph;  })
    //Line chart of day 3 forecast data 
    const chart3 = document.getElementById('canvas_day_3');
    new Chart(chart3, {
      type: 'line',
      data: {
        labels: datetime_day_03,
        datasets: [{
          label: 'TEMPETURE OF DAY-3',
          data:temp_day_01, 
          borderColor:'rgb(10, 204, 139)',
          backgroundColor: ['rgb(241, 238, 14)'],
          borderwidth: '20px'      
        },{
            label: 'HUMIDITY OF DAY-3',
            data:humidity_day_03, 
            borderColor:'rgb(226, 52, 81)',
            backgroundColor: ['rgb(241, 238, 14)'],
              borderwidth: '20px'      
          },{
            label: 'WIND SPEED OF DAY-3',
            data:wind_day_03, 
            borderColor:'rgb(152, 214, 7)',
            backgroundColor: ['rgb(241, 238, 14)'],
              borderwidth: '20px'      
          }]
      },      
      options: {
        maintainAspectRatio:false,
        scales: {
            y: { beginAtZero: true, 
                title:{
                display:true,
                text:'Temp,Humidity,Wind'}            
            },
            x: { beginAtZero: true, 
                title:{
                display:true,
                text:'Hours of Day-3'}            
            }
        }
      }
    });  
    Showfooter(data);
}
// Show Footer TAg After the contents of Full page loads
function Showfooter(data) {    
    footercontainer.style.display = 'inline';
    const toTop = document.querySelector('.to-top')
    window.addEventListener('scroll',()=>{
       if(window.pageYOffset>100){ 
        toTop.classList.add('active');}else{
            toTop.classList.remove('active');
        }
    })
}