import { CityModel, IWeatherDataPayload } from '../models';

export const START_SEARCH_CITY = 'START_SEARCH_CITY';
export const SEARCH_CITY_SUCCESS = 'SEARCH_CITY_SUCCESS';
export const CLEAR_CITIES = 'CLEAR_CITIES';
export const START_REQUEST_WEATHER = 'START_REQUEST_WEATHER';
export const REQUEST_WEATHER_SUCCESS = 'REQUEST_WEATHER_SUCCESS';
export const REQUEST_WEATHER_FAILURE = 'REQUEST_WEATHER_FAILURE';

export interface StartSearchCityAction {
  type: typeof START_SEARCH_CITY;
  payload: string;
}

export interface SearchCitySuccessAction {
  type: typeof SEARCH_CITY_SUCCESS;
  payload: CityModel[];
}

export interface ClearCitiesAction {
  type: typeof CLEAR_CITIES;
}

export type SearchCityActionTypes =
  | StartSearchCityAction
  | SearchCitySuccessAction
  | ClearCitiesAction;

export interface GetWeatherAction {
  type: typeof START_REQUEST_WEATHER;
  payload: CityModel;
}

export interface GetWeatherSuccessAction {
  type: typeof REQUEST_WEATHER_SUCCESS;
  payload: IWeatherDataPayload;
}

export interface GetWeatherFailureAction {
  type: typeof REQUEST_WEATHER_FAILURE;
}

export type GetWeatherActionTypes =
  | GetWeatherAction
  | GetWeatherSuccessAction
  | GetWeatherFailureAction;
