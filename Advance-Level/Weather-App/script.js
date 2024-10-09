const yourLocation = document.getElementById("location")
const locationIcon = document.getElementById("locationIcon")
const tempInC = document.getElementById("tempInC")
const dayNight = document.getElementById("dayNight")
const time = document.getElementById("time")
const description = document.getElementById("description")
const feelsLike = document.getElementById("feelsLike")
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind")
const tempIcon = document.getElementById("tempIcon")


const getExactTimeWithOffsetAndStatus = (offsetInSeconds) => {
    const offsetInMinutes = offsetInSeconds / 60;
    const now = new Date();
    
    // Get the local UTC time and then apply the offset
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    
    // Add the offset (in milliseconds)
    const localTime = new Date(utcTime + (offsetInMinutes * 60000));

    // Get the hour to determine the part of the day
    const hours = localTime.getHours();
    const mints = localTime.getMinutes();
    let status = '';

    if (hours >= 5 && hours < 7) {
        status = 'Early Morning';
    } else if (hours >= 7 && hours < 10) {
        status = 'Morning';
    } else if (hours >= 10 && hours < 12) {
        status = 'Late Morning';
    } else if (hours == 12 && mints == 0) {
        status = 'Noon';
    } else if (hours > 12 && hours < 16) {
        status = 'Afternoon';
    } else if (hours >= 16 && hours < 21) {
        status = 'Evening';
    } else {
        status = 'Night';
    }

    // Format the date and time as per your requirements
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    //   second: 'numeric',
    //   timeZoneName: 'short' // Optional to display timezone abbreviation
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(localTime);

    return { time: formattedTime, status };
};


  


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
            
            yourLocation.textContent = dataOfCurrentLocation.name + ", " + dataOfCurrentLocation.sys.country;
            tempInC.innerHTML = `${Math.round(dataOfCurrentLocation.main.temp - 273.15)}<sup>°c</sup>`;
            description.textContent = dataOfCurrentLocation.weather[0].description.slice(0,1).toUpperCase()+dataOfCurrentLocation.weather[0].description.slice(1)
            feelsLike.innerHTML = `Feels Like: ${Math.round(dataOfCurrentLocation.main.feels_like -273.15)}<sup>°c</sup>`;
            humidity.innerHTML = `Humidity: ${dataOfCurrentLocation.main.humidity}%`
            wind.innerHTML = `Wind: ${Math.round(dataOfCurrentLocation.wind.speed * 3.6)} kph`

            const result = getExactTimeWithOffsetAndStatus(dataOfCurrentLocation.timezone);
            dayNight.textContent = result.status;
            time.textContent = result.time;


            if(dayNight.textContent === "Night"){
                tempIcon.innerHTML = "<i class='bx bxs-moon'></i>";
                document.getElementById("weather_app").classList.remove("day")
                document.getElementById("weather_app").classList.add("night")
                document.getElementById("sign").style.color = "white"
                document.getElementById("searchBarForm").style.borderColor = "white"
                document.getElementById("main").style.backgroundColor = "black"
            } else{
                tempIcon.innerHTML = dataOfCurrentLocation.weather[0].description.includes("heavy") ? "<i class='bx bxs-cloud-lightning'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("light") ? "<i class='bx bx-cloud-snow'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("clear") ? "<i class='bx bxs-sun'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("haze") ? "<i class='bx bx-cloud'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("few") ? "<i class='bx bx-cloud'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("broken") ? "<i class='bx bxl-soundcloud'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("cloud") ? "<i class='bx bxs-cloud'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("rain") ? "<i class='bx bxs-cloud-rain'></i>"
                                    : "???";

                document.getElementById("weather_app").classList.remove("night")
                document.getElementById("weather_app").classList.add("day")
                document.getElementById("sign").style.color = "black"
                document.getElementById("searchBarForm").style.borderColor = "black"
                document.getElementById("main").style.backgroundColor = "skyblue"
            }






        }
        fetchDataOfCurrentLocation();

        document.getElementById("currentLocation").addEventListener("click", function(){
            fetchDataOfCurrentLocation();
            locationIcon.classList.remove("bxs-map")
            locationIcon.classList.add("bx-current-location")
            document.getElementById("currentLocation").classList.add("hide")
            document.getElementById("searchBar_text").value = "";

            if(dayNight.textContent === "Night"){
                document.getElementById("weather_app").classList.remove("day")
                document.getElementById("weather_app").classList.add("night")
                document.getElementById("sign").style.color = "white"
                document.getElementById("searchBarForm").style.borderColor = "white"
                document.getElementById("main").style.backgroundColor = "black"
            } else{
                document.getElementById("weather_app").classList.remove("night")
                document.getElementById("weather_app").classList.add("day")
                document.getElementById("sign").style.color = "black"
                document.getElementById("searchBarForm").style.borderColor = "black"
                document.getElementById("main").style.backgroundColor = "skyblue"
            }
        })
        


    }, function(error) {
        // Error callback
        console.error("Error occurred while fetching location:", error);
        alert("Allow to access your location!!!")
    });
} else {
    alert("Geolocation is not supported by this browser.");
}


const searchBtn = document.getElementById("searchBar_button")
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    const fetchFunction = async function(){
        try {
            const searchedText = document.getElementById("searchBar_text").value;
            const Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedText}&appid=eb3c087b27f5e3085e1231536ff853a0`)
            const dataOfCurrentLocation = await Response.json();
            // console.log(dataOfCurrentLocation)

            yourLocation.textContent = dataOfCurrentLocation.name + ", " + dataOfCurrentLocation.sys.country;
            locationIcon.classList.remove("bx-current-location")
            locationIcon.classList.add("bxs-map")
            document.getElementById("currentLocation").classList.remove("hide")
            tempInC.innerHTML = `${Math.round(dataOfCurrentLocation.main.temp - 273.15)}<sup>°c</sup>`;
            description.textContent = `${dataOfCurrentLocation.weather[0].description}`;
            feelsLike.innerHTML = `Feels Like: ${Math.round(dataOfCurrentLocation.main.feels_like -273.15)}<sup>°c</sup>`;
            humidity.innerHTML = `Humidity: ${dataOfCurrentLocation.main.humidity}%`
            wind.innerHTML = `Wind: ${Math.round(dataOfCurrentLocation.wind.speed * 3.6)} kph`

            const result = getExactTimeWithOffsetAndStatus(dataOfCurrentLocation.timezone);
            dayNight.textContent = result.status;
            time.textContent = result.time;

            
            if(dayNight.textContent === "Night"){
                tempIcon.innerHTML = "<i class='bx bxs-moon'></i>";
                document.getElementById("weather_app").classList.remove("day")
                document.getElementById("weather_app").classList.add("night")
                document.getElementById("sign").style.color = "white"
                document.getElementById("searchBarForm").style.borderColor = "white"
                document.getElementById("main").style.backgroundColor = "black"
            } else{
                tempIcon.innerHTML = dataOfCurrentLocation.weather[0].description.includes("heavy") ? "<i class='bx bxs-cloud-lightning'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("light") ? "<i class='bx bx-cloud-snow'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("clear") ? "<i class='bx bxs-sun'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("haze") ? "<i class='bx bx-cloud'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("few") ? "<i class='bx bx-cloud'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("broken") ? "<i class='bx bxl-soundcloud'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("cloud") ? "<i class='bx bxs-cloud'></i>"
                                    : dataOfCurrentLocation.weather[0].description.includes("rain") ? "<i class='bx bxs-cloud-rain'></i>"
                                    : "???";

                document.getElementById("weather_app").classList.remove("night")
                document.getElementById("weather_app").classList.add("day")
                document.getElementById("sign").style.color = "black"
                document.getElementById("searchBarForm").style.borderColor = "black"
                document.getElementById("main").style.backgroundColor = "skyblue"
            }


        } catch (error) {
            console.log(error)
            alert("Please input a valide place!!");
        }
    }
    fetchFunction();

})