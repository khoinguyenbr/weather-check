import { CityModel } from '../../models';
import {
  CLEAR_CITIES,
  SEARCH_CITY_SUCCESS,
  START_SEARCH_CITY,
  SearchCityActionTypes,
} from '../types';

export type CityAutocompleteState = {
  isLoading: boolean;
  cities: CityModel[];
};

export const initialState: CityAutocompleteState = {
  isLoading: false,
  cities: [],
};

export default (
  state: CityAutocompleteState = initialState,
  action: SearchCityActionTypes
): CityAutocompleteState => {
  switch (action.type) {
    case START_SEARCH_CITY:
      return { ...state, isLoading: true };
    case SEARCH_CITY_SUCCESS:
      return { ...state, cities: action.payload, isLoading: false };
    case CLEAR_CITIES:
      return { ...state, cities: [], isLoading: false };
    default:
      return state;
  }
};
