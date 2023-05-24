import { DateTime } from "luxon";

const API_KEY = "20f7632ffc2c022654e4093c6947b4f4";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

function getWeatherData(infoType, searchParams){
  
  try{
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    return fetch(url).then((res) => res.json());
  }
  catch(err){
    alert(err)
    console.log(err)
  }
  
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];


  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  console.log(data);
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  console.log(daily,hourly, timezone)

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc | dd LLL yyyy' | 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
