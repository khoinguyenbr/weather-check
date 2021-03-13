/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, waitFor } from '@testing-library/react';
import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import { RootState } from '../store/reducers';
import App from '../App';
import rootSaga from '../store/sagas';
import { searchCity, getWeather } from '../apis';
import { CityModel, WeatherModel } from '../models';

jest.mock('../apis');
const mockSearchCity = searchCity as jest.Mock<Promise<CityModel[]>>;
const mockGetWeather = getWeather as jest.Mock<Promise<WeatherModel[]>>;

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

const initialState: RootState = {
  weather: {
    isLoading: false,
    data: [],
    city: '',
  },
  cityAutocomplete: {
    isLoading: false,
    cities: [],
  },
};

const cities: CityModel[] = [
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

const stateWithSuggestion = {
  ...initialState,
  cityAutocomplete: {
    ...initialState.cityAutocomplete,
    cities,
  },
};

const setUp = (state: RootState, isTestSaga = false) => {
  const store = mockStore(state);
  if (isTestSaga) {
    sagaMiddleware.run(rootSaga);
  }
  return {
    ...render(
      <Provider store={store}>
        <App />
      </Provider>
    ),
    store,
  };
};

describe('Test correct UI', () => {
  test('renders init app', () => {
    const { container } = setUp(initialState);
    expect(container).toMatchSnapshot();
  });

  test('renders app when searching city', () => {
    const { container } = setUp({
      ...initialState,
      cityAutocomplete: {
        ...initialState.cityAutocomplete,
        isLoading: true,
      },
    });
    expect(container).toMatchSnapshot();
  });

  test('renders app with city autocomplete', () => {
    const { container } = setUp(stateWithSuggestion);
    expect(container).toMatchSnapshot();
  });

  test('renders app when loading forecast', () => {
    const { container } = setUp({
      ...initialState,
      weather: {
        ...initialState.weather,
        isLoading: true,
      },
    });
    expect(container).toMatchSnapshot();
  });

  test('renders app with city forecast', () => {
    const { container } = setUp({
      ...initialState,
      weather: {
        ...initialState.weather,
        data: weatherData,
        city: 'Ho Chi Minh',
      },
    });
    expect(container).toMatchSnapshot();
  });
});

describe('Test action behavior', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('should do nothing when submit form', () => {
    const { getByTestId, store } = setUp(initialState);
    const form = getByTestId('search-form');
    fireEvent.submit(form);
    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  test('should update input value', () => {
    const { getByPlaceholderText, store } = setUp(initialState, true);
    const input = getByPlaceholderText('City');
    fireEvent.change(input, { target: { value: 'a' } });

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  test('should update input value and search city if value has more than 3 characters', async () => {
    mockSearchCity.mockImplementation(() => Promise.resolve(cities));
    const { getByPlaceholderText, store } = setUp(initialState, true);
    const input = getByPlaceholderText('City');
    fireEvent.change(input, { target: { value: 'abc' } });

    await waitFor(() => {});
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: 'abc',
        type: 'START_SEARCH_CITY',
      },
    ]);
  });

  test('should update input value and search city, but failed then display empty', async () => {
    mockSearchCity.mockImplementation(() => Promise.reject(new Error('reject')));
    const { getByPlaceholderText, store } = setUp(initialState, true);
    const input = getByPlaceholderText('City');
    fireEvent.change(input, { target: { value: 'abc' } });

    await waitFor(() => {});
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: 'abc',
        type: 'START_SEARCH_CITY',
      },
    ]);
  });

  test('should update input value and clear autocomple suggestion if value is empty', async () => {
    mockSearchCity.mockImplementation(() => Promise.resolve(cities));
    const { getByPlaceholderText, store } = setUp(stateWithSuggestion, true);
    const input = getByPlaceholderText('City');
    fireEvent.change(input, { target: { value: 'weq' } });
    fireEvent.change(input, { target: { value: '' } });

    await waitFor(() => {});
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: 'weq',
        type: 'START_SEARCH_CITY',
      },
      {
        type: 'CLEAR_CITIES',
      },
    ]);
  });

  test('should select city when press Enter', async () => {
    mockGetWeather.mockImplementation(() => Promise.resolve(weatherData));
    const { getByPlaceholderText, store } = setUp(stateWithSuggestion, true);
    const input = getByPlaceholderText('City');
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {});
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: { title: 'Ho Chi Minh', woeid: 1321 },
        type: 'START_REQUEST_WEATHER',
      },
      {
        type: 'CLEAR_CITIES',
      },
      {
        payload: { data: weatherData, city: 'Ho Chi Minh' },
        type: 'REQUEST_WEATHER_SUCCESS',
      },
    ]);
  });

  test('should not select city when press Enter without suggestion', () => {
    const { getByPlaceholderText, store } = setUp(initialState);
    const input = getByPlaceholderText('City');
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    const actions = store.getActions();
    expect(actions).toEqual([]);
  });

  test('should select city and get weather by city when click on suggestion item', async () => {
    mockGetWeather.mockImplementation(() => Promise.resolve(weatherData));
    const { getByTestId, store } = setUp(stateWithSuggestion, true);
    const cityElement = getByTestId(1321);
    fireEvent.click(cityElement);

    await waitFor(() => {});
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: { title: 'Ho Chi Minh', woeid: 1321 },
        type: 'START_REQUEST_WEATHER',
      },
      {
        type: 'CLEAR_CITIES',
      },
      {
        payload: { data: weatherData, city: 'Ho Chi Minh' },
        type: 'REQUEST_WEATHER_SUCCESS',
      },
    ]);
  });

  test('should select city and get weather by city but failed then display empty', async () => {
    mockGetWeather.mockImplementation(() => Promise.reject(new Error('reject')));
    const { getByTestId, store } = setUp(stateWithSuggestion, true);
    const cityElement = getByTestId(1321);
    fireEvent.click(cityElement);

    await waitFor(() => {});
    const actions = store.getActions();
    expect(actions).toEqual([
      {
        payload: { title: 'Ho Chi Minh', woeid: 1321 },
        type: 'START_REQUEST_WEATHER',
      },
      {
        type: 'CLEAR_CITIES',
      },
      {
        type: 'REQUEST_WEATHER_FAILURE',
      },
    ]);
  });
});
