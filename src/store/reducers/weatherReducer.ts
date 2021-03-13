import { WeatherModel } from '../../models';
import {
  START_REQUEST_WEATHER,
  GetWeatherActionTypes,
  REQUEST_WEATHER_SUCCESS,
  REQUEST_WEATHER_FAILURE,
} from '../types';

export type WeatherState = {
  isLoading: boolean;
  city: string;
  data: WeatherModel[];
};

export const initialState: WeatherState = {
  isLoading: false,
  city: '',
  data: [],
};

export default (
  state: WeatherState = initialState,
  action: GetWeatherActionTypes
): WeatherState => {
  switch (action.type) {
    case START_REQUEST_WEATHER:
      return { ...state, isLoading: true, data: [], city: '' };
    case REQUEST_WEATHER_SUCCESS:
      const { data, city } = action.payload;
      return { ...state, isLoading: false, data, city };
    case REQUEST_WEATHER_FAILURE:
      return { ...state, isLoading: false, data: [], city: '' };
    default:
      return state;
  }
};
