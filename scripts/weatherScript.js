class Weather{
    constructor(){
        this.apiKey ='9hi3eeUGhhcYUUnwK9w7wwKI07CJmGUB';
        this.condition_url = "https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/currentconditions/v1/";
        this.location_url = 'https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityLocation = await this.getCity(city);
        const cityWeather = await this.getWeather(cityLocation.Key);
        return {
            cityLocation,
            cityWeather
        }
    };
    async getCity(city){
        const query = `?apikey=${this.apiKey}&q=${city}`;
        const response = await fetch(this.location_url+query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.apiKey}`;
        const response = await fetch(this.condition_url+query);
        const data= await response.json();
        return data[0];
    }
}



// getCity('london').then(data=> {return getWeather(data.Key).then().catch()}).catch(err=>console.log(err));
