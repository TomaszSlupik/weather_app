const btn = document.querySelector(".btn");
const btn2 = document.querySelector(".btn2");
const approved = document.querySelector(".approved");
const inputText = document.querySelector(".inputText");
const cityName = document.querySelector(".cityName");
const resultTemp = document.querySelector(".resultTemp");
const resultHumidity = document.querySelector(".resultHumidity");
const resultWeather = document.querySelector(".resultWeather");
const photo = document.querySelector(".photo");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=2865022a0a76f34176128eb140d27a45";
const API_UNITS = "&units=metric";
const PL = "&lang={pl}";

const btnClick = () => {
	btn.style.backgroundColor = "#9400d3";
	btn.style.borderColor = "white";
	approved.textContent = "Aktualna pogoda!";
};

const getWheather = () => {
	const city = inputText.value || "";
	const URL = API_LINK + city + API_KEY + API_UNITS + PL;
	axios
		.get(URL)
		.then((res) => {
			console.log(res.data);
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = res.data.weather[0];
			console.log(status.id);

			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute("src", "./img/thunderstorm.png");
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute("src", "./img/drizzle.png");
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute("src", "./img/rain.png");
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute("src", "./img/ice.png");
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute("src", "./img/fog.png");
			} else if (status.id === 800) {
				photo.setAttribute("src", "./img/sun.png");
			} else if (status.id > 800 && status.id < 900) {
				photo.setAttribute("src", "./img/cloud.png");
			} else {
				photo.setAttribute("src", "./img/unknown.png");
			}

			resultWeather.textContent = status.main;

			cityName.textContent = res.data.name;
			resultTemp.textContent = Math.floor(temp) + "℃";
			resultHumidity.textContent = hum + "%";
		})
		.catch(() => (approved.textContent = "Wpisz właściwą nazwę miasta"));
};

getWheather();

const btn2Click = () => {
	btn2.style.backgroundColor = "#9400d3";
	btn2.style.borderColor = "white";
	approved.textContent = "";
	inputText.value = "";
	cityName.textContent = "";
	resultWeather.textContent = "";
	resultTemp.textContent = "";
	resultHumidity.textContent = "";
};

const enterKey = (e) => {
	if (e.key === "Enter") {
		getWheather();
	}
};

btn.addEventListener("click", btnClick);
btn2.addEventListener("click", btn2Click);
btn.addEventListener("click", getWheather);
inputText.addEventListener("keyup", enterKey);
