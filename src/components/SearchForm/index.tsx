import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../../store/reducers';
import { startSearchCity, clearCities, getWeather } from '../../store/actions';
import SearchForm from './SearchForm';
import { CityModel } from '../../models';

const mapStateToProps = (state: RootState) => {
  const { cityAutocomplete, weather } = state;
  return {
    isLoading: cityAutocomplete.isLoading || weather.isLoading,
    cities: cityAutocomplete.cities,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchCity: (city: string) => dispatch(startSearchCity(city)),
  clearCities: () => dispatch(clearCities()),
  getWeather: (city: CityModel) => dispatch(getWeather(city)),
});

type StateToProps = ReturnType<typeof mapStateToProps>;
type DispatchToProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateToProps & DispatchToProps;

const SearchFormContainer: React.FC<Props> = (props) => <SearchForm {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);
