const yourLocation = document.getElementById("location")
const tempInC = document.getElementById("tempInC")
const tempHigh = document.getElementById("tempHigh")
const tempLow = document.getElementById("tempLow")
const description = document.getElementById("description")
const feelsLike = document.getElementById("feelsLike")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")


// Check if Geolocation is supported
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        // Success callback
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log("Latitude:", latitude, "Longitude:", longitude);


        const fetchDataOfCurrentLocation = async function(){
            const responseDataOfCurrentLocation = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=eb3c087b27f5e3085e1231536ff853a0`)
            const dataOfCurrentLocation = await responseDataOfCurrentLocation.json();
        
            yourLocation.textContent = dataOfCurrentLocation.name + "," + dataOfCurrentLocation.sys.country;
            tempInC.innerHTML = `${Math.round(dataOfCurrentLocation.main.temp - 273.15)}<sup>°c</sup>`;
            tempHigh.innerHTML = `High: ${Math.round(dataOfCurrentLocation.main.temp_max -273.15)}<sup>°c</sup>`;
            tempLow.innerHTML = `Low: ${Math.round(dataOfCurrentLocation.main.temp_min -273.15)}<sup>°c</sup>`;
            description.textContent = `${dataOfCurrentLocation.weather[0].description}`;
            feelsLike.innerHTML = `Feels Like: ${Math.round(dataOfCurrentLocation.main.feels_like -273.15)}<sup>°c</sup>`;
            humidity.innerHTML = `Humidity: ${dataOfCurrentLocation.main.humidity}%`
            wind.innerHTML = `Wind: ${Math.round(dataOfCurrentLocation.wind.speed * 3.6)} kph`
        }
        fetchDataOfCurrentLocation();

        
    }, function(error) {
        // Error callback
        console.error("Error occurred while fetching location:", error);
        alert("Error occurred while fetching location.")
    });
} else {
    alert("Geolocation is not supported by this browser.");
}


const searchBtn = document.getElementById("searchBar_button")
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    const fetchFunction = async function(){
        const searchedText = document.getElementById("searchBar_text").value;
        const Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedText}&appid=eb3c087b27f5e3085e1231536ff853a0`)
        const dataOfCurrentLocation = await Response.json();

        yourLocation.textContent = dataOfCurrentLocation.name + "," + dataOfCurrentLocation.sys.country;
        tempInC.innerHTML = `${Math.round(dataOfCurrentLocation.main.temp - 273.15)}<sup>°c</sup>`;
        tempHigh.innerHTML = `High: ${Math.round(dataOfCurrentLocation.main.temp_max -273.15)}<sup>°c</sup>`;
        tempLow.innerHTML = `Low: ${Math.round(dataOfCurrentLocation.main.temp_min -273.15)}<sup>°c</sup>`;
        description.textContent = `${dataOfCurrentLocation.weather[0].description}`;
        feelsLike.innerHTML = `Feels Like: ${Math.round(dataOfCurrentLocation.main.feels_like -273.15)}<sup>°c</sup>`;
        humidity.innerHTML = `Humidity: ${dataOfCurrentLocation.main.humidity}%`
        wind.innerHTML = `Wind: ${Math.round(dataOfCurrentLocation.wind.speed * 3.6)} kph`
    }
    fetchFunction();
})