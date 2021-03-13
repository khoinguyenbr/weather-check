import React from 'react';
import { WeatherModel } from '../../models';
import { getDay, roundTemp } from '../../utils';
import './WeatherList.css';

type Props = {
  isLoading: boolean;
  weatherData: WeatherModel[];
  city: string;
};

const WeatherList: React.FC<Props> = ({ isLoading, weatherData, city }) => {
  if (isLoading) {
    return null;
  }

  if (!weatherData.length) {
    return (
      <div className="container">
        <p className="text-center">No Data</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h3 className="text-center p-5">{city}</h3>
      <div className="card-wrapper">
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
    </div>
  );
};
export default WeatherList;
