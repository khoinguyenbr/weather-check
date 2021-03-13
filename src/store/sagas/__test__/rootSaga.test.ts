import { all, fork } from 'redux-saga/effects';
import rootSaga from '../../sagas';
import cityAutocompleteSaga from '../cityAutocompleteSaga';
import weatherSaga from '../weatherSaga';

describe('Test saga watcher', () => {
  it('should watch actions', () => {
    const generator = rootSaga();
    const next = generator.next();
    expect(next.value).toEqual(all([fork(cityAutocompleteSaga), fork(weatherSaga)]));
  });
});
