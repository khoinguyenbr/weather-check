import { SagaIterator } from 'redux-saga';
import { call, put, delay, cancel, takeLatest, take, fork } from 'redux-saga/effects';

import { searchCity } from '../../apis';
import { searchCitySuccess } from '../actions';
import { START_SEARCH_CITY, CLEAR_CITIES, StartSearchCityAction } from '../types';

export function* handleSearchCity(action: StartSearchCityAction): SagaIterator {
  const { payload } = action;
  yield delay(500);
  try {
    const cities = yield call(searchCity, payload);
    yield put(searchCitySuccess(cities));
  } catch {
    yield put(searchCitySuccess([]));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function* cancelSearchCity(task: any): SagaIterator {
  yield cancel(task);
}

export default function* saga(): SagaIterator {
  let searchTask;
  while (true) {
    const action = yield take(START_SEARCH_CITY);
    if (searchTask) {
      yield cancel(searchTask);
    }
    searchTask = yield fork(handleSearchCity, action);

    yield takeLatest(CLEAR_CITIES, cancelSearchCity, searchTask);
  }
}
