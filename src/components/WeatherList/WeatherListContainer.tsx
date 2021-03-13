import * as React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../store/reducers';
import WeatherList from './WeatherList';

const mapStateToProps = (state: RootState) => ({
  isLoading: state.weather.isLoading,
  weatherData: state.weather.data,
});

type StateToProps = ReturnType<typeof mapStateToProps>;
type Props = StateToProps;

const WeatherListContainer: React.FC<Props> = (props) => <WeatherList {...props} />;

export default connect(mapStateToProps)(WeatherListContainer);
