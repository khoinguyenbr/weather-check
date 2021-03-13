import React from 'react';
import { WeatherModel } from '../../models';
import { getDay, roundTemp } from '../../utils';
import './WeatherList.css';

type Props = {
  isLoading: boolean;
  weatherData: WeatherModel[];
};

const WeatherList: React.FC<Props> = ({ weatherData }) => {
  if (!weatherData.length) {
    return (
      <div className="container">
        <p className="text-center">No Data</p>
      </div>
    );
  }

  return (
    <div className="container card-wrapper">
      {weatherData.map((item) => (
        <div key={item.date.getTime()} className="card">
          <div className="card-body">
            <h5 className="card-title">{getDay(item.date)}:</h5>
            <p className="cart-text">Min: {roundTemp(item.minTemp)}&#176;C</p>
            <p className="cart-text">Max: {roundTemp(item.maxTemp)}&#176;C</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default WeatherList;
