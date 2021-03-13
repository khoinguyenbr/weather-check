import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GetWeatherAction, START_REQUEST_WEATHER } from '../types';
import { getWeatherSuccess, clearCities, getWeatherFailure } from '../actions';
import { getWeather } from '../../apis';

export function* getWeatherHandle(action: GetWeatherAction): SagaIterator {
  yield put(clearCities());
  const { payload } = action;
  try {
    const weatherData = yield call(getWeather, payload.woeid);
    yield put(getWeatherSuccess({ data: weatherData, city: payload.title }));
  } catch {
    yield put(getWeatherFailure());
  }
}

export default function* saga(): SagaIterator {
  yield takeLatest(START_REQUEST_WEATHER, getWeatherHandle);
}
