const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const weather = new Weather();


const updateUi=(data)=>{
    const {cityLocation,cityWeather} = data;
    details.innerHTML = `
        <h5 class="my-3">${cityLocation.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    const iconSrc = `img/icons/${cityWeather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
    let timeSrc = cityWeather.IsDayTime ?'img/day.svg' :'img/night.svg';
    time.setAttribute('src',timeSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none')
    };
};



cityForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    weather.updateCity(city).then(data=>updateUi(data)).catch(err=>console.log(err));
    localStorage.setItem('city',city);
});

if(localStorage.getItem('city')){
    weather.updateCity(localStorage.getItem('city')).then(data=>updateUi(data)).catch(err=>console.log(err));
}