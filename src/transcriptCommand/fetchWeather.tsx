import { kelvinToCelsius } from "@/utils/kelvinToCelcious";
import response from "@/utils/responseVoice";

export const weatherReport = async () => {
  const api =
    "https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=4af0a8ed4d6e6271c0d441d472d939c4";

  const res = await fetch(api);
  const data = await res.json();

  const tempInF = data.main.temp;
  const feelsLike = data.main.feels_like;
  const maxTem = data.main.temp_max;

  const weatherResponse = `Current temperature is ${kelvinToCelsius(
    tempInF
  )} celcious and feels like ${kelvinToCelsius(
    feelsLike
  )} celcious. Maximum temperature is ${kelvinToCelsius(maxTem)} celcious`;

  response(weatherResponse, () => "");
};
