let weather = {
    apikey: 'b30c6e539e0c9a84e90ba91b0524756c',  // Replace with your actual API key
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.apikey)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => {
            document.querySelector(".city").innerText = error.message;
            document.querySelector(".weather").classList.add("loading");
        });
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".feels_like").innerText = "Feels like: " + feels_like + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://wallpapersmug.com/download/1600x900/c535be/blur-bokeh-gradient.jpg')";
    },

    search: function() {
        this.fetchWeather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".searchbar").addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        weather.search();
    }
});

weather.fetchWeather("Pune");  // Fetch default city weather