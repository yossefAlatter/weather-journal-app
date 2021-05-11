//== clock scripts ==//
//== start ==//

//== handle elements that needed from DOM ==//
//== start ==//
const desktopClock = document.querySelector('.desktop #clock');
const desktopClockMode = document.querySelector('.desktop #clockmode');
const mobileClock = document.querySelector('.mobile #clock');
const mobileClockMode = document.querySelector('.mobile #clockmode');
//== end ==//

//== functions needed ==//
//== start ==//

//== get time function ==//
function getTime(){
    const d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let mode = 'am';

    if(hours > 12){
        hours -= 12 ;
        mode = "pm"
    }

    return {time: `${hours}:${JSON.stringify(minutes).padStart(2,'0')}`, mode}
}

//== update DOM ==//
function updateDOM(){
    const {time, mode} = getTime();
    desktopClock.innerHTML = time;
    desktopClockMode.innerHTML = mode;
    mobileClock.innerHTML = time;
    mobileClockMode.innerHTML = mode;
}

//== end ==//

//== handle clock update every minute ==//
//== start ==//
updateDOM();
setInterval(updateDOM, 1000);
//== end ==//

//== end ==//

//----------------------------------------------------------------------------------------------------------------------------//

//== form script ==//
//== start ==//

//== handle elments needed from DOM ==//
//== start ==//
const weatherForm = document.getElementById('weatherform');
const zipCodeCheck = document.getElementById('check_zipcode');
const cityNameCheck = document.getElementById('check_city');
const zipcode = document.getElementById('zip');
const cityName = document.getElementById('city');
const feel = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');
//== end ==//


//== functions needed ==//
//== start ===//

//== function to handle zipcode activate ==//
function handleZipcodeActivate(){
    if(zipCodeCheck.checked){
        cityName.classList.remove('checked');
        zipcode.classList.add('checked');
        cityName.disabled = true ;
        cityName.value = "" ;
        zipcode.disabled = false ;
    }
}

//== function to handle city name activate ==//
function  handleCityNameActivate(){
    if(cityNameCheck.checked){
        zipcode.classList.remove('checked');
        cityName.classList.add('checked');
        cityName.disabled = false ;
        zipcode.disabled = true ;
        zipcode.value= "";
    }
}

//== function to handle form validation ==//
function handleFormValidation(){
    const errors = [] ;
    if(cityNameCheck.checked && cityName.value === ""){
        errors.push("City name cannot be empty");
    }
    if(zipCodeCheck.checked && zipcode.value === ""){
        errors.push("zipcode cannot be empty");
    }
    if(feel.value === ""){
        errors.push("you must submit your feeling");
    }else if(feel.value.length < 4){
        errors.push("your feeling must be more than four character");
    }
    return errors;
}

//== function to indicate the way of search ==//
function indcateSearchWay(){
    let param = '';
    let baseUrl = '';
    if(cityNameCheck.checked){
        param = cityName.value;
        baseUrl='https://api.openweathermap.org/data/2.5/weather?q=';
    }else{
        param = zipcode.value;
        baseUrl='https://api.openweathermap.org/data/2.5/weather?zip=';
    }
    return {baseUrl, param};
}

//== function to generate report time ==//
function reportTime(){
    const date = new Date();
    const {time, mode} = getTime();
    const reportTime = `${time} ${mode} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    return reportTime ;
}

//== function handle DOM update ==//
function handleReportDOMUpdate(data){

    const updateDOMStructure = `
    <div class="report" id ="entryHolder">
    <div class="left-side">
        <h3>weather report</h3>
    <ul class="report-item">
        <li>city:  <span>${data.city}</span></li>
        <li>weather state:  <span>${data.weatherState}</span></li>
        <li id="temp">temperatrue:  <span>${data.temp}&deg;C</span></li>
        <li id="content">your feeling:  <span>${data.userFeel}</span></li>
    </ul>
    </div>
    <div class="right-side">
        <img src="http://openweathermap.org/img/w/${data.weatherIcon}.png" alt="weather icon">
    </div>
    <span id="date">${data.currentTime}</span>
</div>
    `
    document.getElementById('createArea').innerHTML = updateDOMStructure;
}

//== function to fetch weather data ==//
const getWeatherData = async (url='', zipCode='', apiKey='')=>{
    const response = await fetch(url + zipCode + apiKey)
    try{
        const data = await response.json();
        return data ;
    }catch(err){
        console.log(err);
    }
}

//== function to save data in server side ==//
const saveData = async (url='', data={})=>{
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

//== function to get all data ==//
const getAllData = async (url='')=>{
    const response = await fetch(url, {credentials: 'same-origin'});
    try{
        const data = await response.json();
        return data ;
    }catch(err){
        console.log(err)
    }
}

//== function to reset form ==//
function resetFrom(){
    zipcode.value = "";
    cityName.value = "";
    feel.value = "";
}

//== end ==//

//== handle DOM events ==//
//== start ==//

zipCodeCheck.addEventListener('change', handleZipcodeActivate);

cityNameCheck.addEventListener('change', handleCityNameActivate);

generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.app-structure .layout .app-right-side').scrollIntoView({behavior: "smooth", block: 'end'});
    //== handle form validation ==//
    const errors = handleFormValidation();

    //== indicate the way to search ==//
    const {baseUrl, param} = indcateSearchWay();

    const apiKey = '&appid=48543451cc88f3a6afa061d90538a235';

    if(errors.length !== 0){
        let errorsDOM = '';
        errors.forEach(error=>{
            errorsDOM += `<h4>${error}</h4>`
        });
        document.getElementById('createArea').innerHTML = `
        <div class="errors">
            ${errorsDOM}
        </div>
        `
    }else{
        document.getElementById('createArea').innerHTML = `
        <div class="load">
            <h4>Loading ...</h4>
        </div>
        `
        getWeatherData(baseUrl, param, apiKey)
            .then(data=>{
                if(data.cod === "404"){
                    document.getElementById('createArea').innerHTML = `
                    <div class="errors">
                    <h4>${data.message}</h4>
                    </div>
                    `
                    document.querySelector('.app-structure .layout .app-right-side').scrollIntoView({behavior: "smooth", block: 'end'});
                }else{
                    const weatherReport = {
                        city: data.name,
                        weatherState: data.weather[0].description,
                        temp: (data.main.temp - 273).toFixed(2),
                        userFeel: feel.value,
                        weatherIcon: data.weather[0].icon,
                        currentTime: reportTime()
                    } 
    
                    saveData('/saveData', weatherReport);
                    getAllData('/getData').then(result => {
                        handleReportDOMUpdate(result);
                        document.querySelector('.app-structure .layout .app-right-side').scrollIntoView({behavior: "smooth", block: 'end'});  
                        resetFrom();
                    })
                }
            }).catch(err=>{
                document.getElementById('createArea').innerHTML = `
                <div class="errors">
                    <h4>Process failed</h4>
                </div>
                `
            });

    }

})
//== end ==//



//== end ==//