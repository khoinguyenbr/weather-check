import rootReducer from '../index';
import { initialState as cityInitialState } from '../cityAutocompleteReducer';
import { initialState as weatherInitialState } from '../weatherReducer';
import {
  startSearchCity,
  searchCitySuccess,
  clearCities,
  getWeather,
  getWeatherSuccess,
  getWeatherFailure,
} from '../../actions';
import { CityModel, WeatherModel } from '../../../models';

const initialState = { cityAutocomplete: cityInitialState, weather: weatherInitialState };

const citiesData: CityModel[] = [
  { title: 'Ho Chi Minh', woeid: 1321 },
  { title: 'Ha Noi', woeid: 3321 },
];

const weatherData: WeatherModel[] = [
  { date: new Date('2011-01-01'), maxTemp: 38, minTemp: 28 },
  { date: new Date('2011-01-02'), maxTemp: 38, minTemp: 28 },
  { date: new Date('2011-01-03'), maxTemp: 39, minTemp: 27 },
  { date: new Date('2011-01-04'), maxTemp: 38, minTemp: 28 },
  { date: new Date('2011-01-05'), maxTemp: 38, minTemp: 28 },
];

describe('Test city autocomplete reducer', () => {
  test('should update loading when start search city', () => {
    const action = startSearchCity('abc');
    const actual = rootReducer(initialState, action);
    expect(actual).toEqual({
      ...initialState,
      cityAutocomplete: { ...initialState.cityAutocomplete, isLoading: true },
    });
  });

  test('should update suggestion data when search city success', () => {
    const action = searchCitySuccess(citiesData);
    const actual = rootReducer(initialState, action);
    expect(actual).toEqual({
      ...initialState,
      cityAutocomplete: { ...initialState.cityAutocomplete, cities: citiesData },
    });
  });

  test('should clear city suggestion', () => {
    const action = clearCities();
    const actual = rootReducer(
      {
        ...initialState,
        cityAutocomplete: {
          ...initialState.cityAutocomplete,
          cities: citiesData,
        },
      },
      action
    );
    expect(actual).toEqual({
      ...initialState,
      cityAutocomplete: { ...initialState.cityAutocomplete, cities: [] },
    });
  });
});

describe('Test weather reducer', () => {
  test('should update loading when start request weather', () => {
    const action = getWeather(1231);
    const actual = rootReducer(initialState, action);
    expect(actual).toEqual({
      ...initialState,
      weather: { ...initialState.weather, isLoading: true },
    });
  });

  test('should update weather data to store when get weatther success', () => {
    const action = getWeatherSuccess(weatherData);
    const actual = rootReducer(initialState, action);
    expect(actual).toEqual({
      ...initialState,
      weather: { ...initialState.weather, data: weatherData },
    });
  });

  test('should clear weather data to store when get weatther failure', () => {
    const action = getWeatherFailure();
    const actual = rootReducer(initialState, action);
    expect(actual).toEqual({
      ...initialState,
      weather: { ...initialState.weather, data: [] },
    });
  });
});
