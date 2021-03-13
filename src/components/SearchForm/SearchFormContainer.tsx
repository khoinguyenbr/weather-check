import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../../store/reducers';
import { startSearchCity, clearCities, getWeather } from '../../store/actions';
import SearchForm from './SearchForm';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.cityAutocomplete.isLoading || state.weather.isLoading,
  cities: state.cityAutocomplete.cities,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  searchCity: (city: string) => dispatch(startSearchCity(city)),
  clearCities: () => dispatch(clearCities()),
  getWeather: (id: number) => dispatch(getWeather(id)),
});

type StateToProps = ReturnType<typeof mapStateToProps>;
type DispatchToProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateToProps & DispatchToProps;

const SearchFormContainer: React.FC<Props> = (props) => <SearchForm {...props} />;

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormContainer);
