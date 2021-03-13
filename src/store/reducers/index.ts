import { combineReducers } from 'redux';
import cityAutocompleteReducer from './cityAutocompleteReducer';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  cityAutocomplete: cityAutocompleteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
