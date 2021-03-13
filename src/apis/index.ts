import axios, { AxiosResponse } from 'axios';
import { CityModel, WeatherModel, ICityResponse, IWeatherResponse } from '../models';

function getData<T>(url: string): Promise<AxiosResponse<T>> {
  return axios.get<T>(url);
}

export const searchCity = async (city: string): Promise<CityModel[]> => {
  try {
    const { data } = await getData<ICityResponse[]>(`/api/location/search/?query=${city}`);
    return data.map((item) => ({ title: item.title, woeid: item.woeid }));
  } catch (err) {
    return [];
  }
};

export const getWeather = async (id: number): Promise<WeatherModel[]> => {
  try {
    const { data } = await getData<IWeatherResponse>(`/api/location/${id}/`);
    return data.consolidated_weather.slice(0, 5).map((item) => ({
      date: new Date(item.applicable_date),
      minTemp: item.min_temp,
      maxTemp: item.max_temp,
    }));
  } catch (err) {
    return [];
  }
};
