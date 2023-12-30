const APIKey = "4973b311a8ae4d35c4d4f1e22be10605";
const latitude = 41.5;
const longitude = -100;

export const getWeatherForcast = () => {
  const weatherApi = fetch(
    ` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });

  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temp = main && main.temp;
  const weather = {
    temp: { F: Math.round(temp), C: Math.round(((temp - 32) * 5) / 9) },
  };
  return weather;
};
