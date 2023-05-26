const unsplashApiAccessKey = "igW109zUYiqCpaxsN295w-Awl8D6IE2XLe3ZZ5G_e3g";
const openWeatherApiKey = "ad43ccedd44e6ba318ac651cd56ce516";
const author = document.getElementById("author-name");
const cryptoEl = document.getElementById("crypto");
const cryptoTop = document.getElementById("crypto-top");
const timeEl = document.getElementById("time");
const weatherEl = document.getElementById("weather");

fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=${unsplashApiAccessKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const imgUrl = data.urls.regular;
        const authorName = data.user.name;

        document.body.style.backgroundImage = `url(${imgUrl})`;
        author.textContent = `~By ${authorName}`;
    })
    .catch(error => {
        document.body.style.backgroundImage = `url("images/default_image_2.jpg")`;
        author.textContent = `~By Akshay Kumar Pandey`;
        throw new Error("There was some network error!")
    })


fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(response => {
        if(!response.ok) {
            throw Error("Something went wrong!")
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        cryptoTop.innerHTML = `
        <img src="${data.image.small} alt="Dogecoin Symbol" /> 
        <span>${data.name}</span>
        `;

        cryptoEl.innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
        `
    })

const getCurrentTime = () => {
    const date = new Date();
    timeEl.textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"});
}
setInterval(getCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
    const userLongitude = position.coords.longitude;
    const userLatitude = position.coords.latitude;

    gettingWeather(userLongitude, userLatitude);
})

async function gettingWeather (longitude, latitude) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherApiKey}&units=metric`);
        
        if(!response.ok) {
            throw new Error("Weather Data not available right now!")
        } else {
            const data = await response.json();
            console.log(data);

            const icon = data.weather[0].icon;
            const temperature = Math.round(data.main.temp);
            const placeName = data.name;
            weatherEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather description image" />
            <p>${temperature}&deg;</p>
            <h4>${placeName}</h4>
            `
        }
    } catch (error) {
        console.log(error);
    }
}
