
import config from "../../config.json";


function getWeatherInfo(code, isDay) {
  let description = "Clear sky";
  let icon = "01";

  if (code === 1 || code === 2) {
    description = "Partly cloudy";
    icon = "02";
  } else if (code === 3) {
    description = "Cloudy";
    icon = "04";
  } else if ([45, 48].includes(code)) {
    description = "Fog";
    icon = "50";
  } else if ([51, 53, 55, 56, 57, 80, 81, 82].includes(code)) {
    description = "Showers";
    icon = "09";
  } else if ([61, 63, 65, 66, 67].includes(code)) {
    description = "Rain";
    icon = "10";
  } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
    description = "Snow";
    icon = "13";
  } else if ([95, 96, 99].includes(code)) {
    description = "Thunderstorm";
    icon = "11";
  }

  return {
    description,
    icon: `${icon}${isDay ? "d" : "n"}`,
  };
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const { latitude, longitude, city } = config;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,visibility,is_day&daily=sunrise,sunset&timezone=auto&timeformat=unixtime&wind_speed_unit=ms`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Erreur lors de l'appel API");
    }

    const data = await response.json();
    const current = data.current;

    const weatherInfo = getWeatherInfo(
      current.weather_code,
      current.is_day === 1
    );
    const weatherData = {
      name: city,
      sys: {
        country: "FR",
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0],
      },
      main: {
        temp: current.temperature_2m,
        feels_like: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
      },
      weather: [weatherInfo],
      wind: {
        speed: current.wind_speed_10m,
        deg: current.wind_direction_10m,
      },
      visibility: current.visibility,
      dt: current.time,
      timezone: data.utc_offset_seconds,
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Impossible de récupérer la météo",
    });
  }
}