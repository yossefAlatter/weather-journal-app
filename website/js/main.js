//== clock scripts ==//
//== start ==//

//== handle elements that needed from DOM ==//
//== start ==//
const clock = document.getElementById('clock');
const clockMode = document.getElementById('clockmode');
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

    return {time: `${hours}:${minutes}`, mode}
}

//== update DOM ==//
function updateDOM(){
    const {time, mode} = getTime();
    clock.innerHTML = time;
    clockMode.innerHTML = mode;
}

//== end ==//

//== handle clock update every minute ==//
//== start ==//
updateDOM();
setInterval(updateDOM, 1000);
//== end ==//

//== end ==//

//-------------------------------------------------------------------------//

//== form script ==//
//== start ==//

//== handle elments needed from DOM ==//
//== start ==//
const weatherForm = document.getElementById('weatherform');
const zipCodeCheck = document.getElementById('check_zipcode');
const cityNameCheck = document.getElementById('check_city');
const zipcode = document.getElementById('zipcode');
const cityName = document.getElementById('city');
//== end ==//

//== functions needed ==//
//== start ===//

//== end ==//

//== handle DOM events ==//
//== start ==//
zipCodeCheck.addEventListener('change',()=>{
    if(zipCodeCheck.checked){
        cityName.classList.remove('checked');
        zipcode.classList.add('checked');
        cityName.disabled = true ;
        zipcode.disabled = false ;
    }
});
cityNameCheck.addEventListener('change',()=>{
    if(cityNameCheck.checked){
        zipcode.classList.remove('checked');
        cityName.classList.add('checked');
        cityName.disabled = false ;
        zipcode.disabled = true ;
    }
});
//== end ==//


//== end ==//










const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const zipCode = 'London';
const apiKey = '&appid=48543451cc88f3a6afa061d90538a235';

/* api.openweathermap.org/data/2.5/weather?q=London&appid={API key} */

const getData = async (url='', zipCode='', apiKey='')=>{
    const response = await fetch(url + zipCode + apiKey)
    try{
        const data = response.json();
        return data ;
    }catch(err){
        console.log(err);
    }
}

console.log(getData(baseUrl, zipCode, apiKey));