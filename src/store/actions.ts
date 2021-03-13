import { CityModel, WeatherModel } from '../models';
import {
  START_SEARCH_CITY,
  SEARCH_CITY_SUCCESS,
  CLEAR_CITIES,
  START_REQUEST_WEATHER,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILURE,
  SearchCitySuccessAction,
  StartSearchCityAction,
  ClearCitiesAction,
  GetWeatherAction,
  GetWeatherSuccessAction,
  GetWeatherFailureAction,
} from './types';

export function startSearchCity(city: string): StartSearchCityAction {
  return { type: START_SEARCH_CITY, payload: city };
}

export function searchCitySuccess(cities: CityModel[]): SearchCitySuccessAction {
  return { type: SEARCH_CITY_SUCCESS, payload: cities };
}

export function clearCities(): ClearCitiesAction {
  return { type: CLEAR_CITIES };
}

export function getWeather(id: number): GetWeatherAction {
  return { type: START_REQUEST_WEATHER, payload: id };
}

export function getWeatherSuccess(data: WeatherModel[]): GetWeatherSuccessAction {
  return { type: REQUEST_WEATHER_SUCCESS, payload: data };
}

export function getWeatherFailure(): GetWeatherFailureAction {
  return { type: REQUEST_WEATHER_FAILURE };
}
