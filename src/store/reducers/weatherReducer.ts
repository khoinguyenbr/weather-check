import { WeatherModel } from '../../models';
import {
  START_REQUEST_WEATHER,
  GetWeatherActionTypes,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILURE,
} from '../types';

export type WeatherState = {
  isLoading: boolean;
  data: WeatherModel[];
};

export const initialState: WeatherState = {
  isLoading: false,
  data: [],
};

export default (
  state: WeatherState = initialState,
  action: GetWeatherActionTypes
): WeatherState => {
  switch (action.type) {
    case START_REQUEST_WEATHER:
      return { ...state, isLoading: true };
    case REQUEST_WEATHER_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case REQUEST_WEATHER_FAILURE:
      return { ...state, isLoading: false, data: [] };
    default:
      return state;
  }
};
