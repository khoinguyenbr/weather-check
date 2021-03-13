import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/types';

import cityAutocompleteSaga from './cityAutocompleteSaga';
import weatherSaga from './weatherSaga';

export default function* rootSaga(): SagaIterator {
  yield all([fork(cityAutocompleteSaga), fork(weatherSaga)]);
}
