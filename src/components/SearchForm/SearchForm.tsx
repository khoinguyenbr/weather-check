import React from 'react';

import { CityModel } from '../../models';
import searchIcon from '../../icons/search.svg';
import Loading from '../Loading';

import './SearchForm.css';

type Props = {
  isLoading: boolean;
  cities: CityModel[];
  clearCities(): void;
  searchCity(city: string): void;
  getWeather(woeid: number): void;
};

const LENGTH_TO_SEARCH = 3;

const SearchForm: React.FC<Props> = ({
  cities,
  isLoading,
  searchCity,
  clearCities,
  getWeather,
}) => {
  const [input, setInput] = React.useState('');

  const inputHandle = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInput(value);

    if (value.length >= LENGTH_TO_SEARCH) {
      searchCity(value);
    } else if (value.length === 0) {
      clearCities();
    }
  };

  const keyUpHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && cities.length) {
      setInput(cities[0].title);
      getWeather(cities[0].woeid);
    }
  };

  const selectCity = (city: CityModel) => {
    setInput(city.title);
    getWeather(city.woeid);
  };

  return (
    <div className="container">
      <form data-testid="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <img src={searchIcon} />
              </div>
            </div>

            <input
              className="form-control"
              type="text"
              value={input}
              id="searchInput"
              placeholder="City"
              onChange={inputHandle}
              onKeyUp={keyUpHandle}
            />

            {isLoading && (
              <div className="input-group-append">
                <div className="input-group-text">
                  <Loading />
                </div>
              </div>
            )}
          </div>
        </div>

        {!!cities.length && (
          <div className="autocomplete-wrapper">
            <ul className="list-group">
              {cities.map((city) => (
                <li
                  data-testid={city.woeid}
                  key={city.woeid}
                  className="list-group-item list-group-item-action"
                  onClick={() => selectCity(city)}
                >
                  {city.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
