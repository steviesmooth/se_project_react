const APIKey = "4973b311a8ae4d35c4d4f1e22be10605";
const latitude = 44.34;
const longitude = 30;

export const getWeatherForcast = () => {
  const weatherApi = fetch(
    ` https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIKey}`
  ).then((res) => {
    if (res.of) {
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
  return temp;
};
