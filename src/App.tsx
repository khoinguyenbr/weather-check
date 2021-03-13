import React from 'react';
import { Greeting, SearchForm, WeatherList } from './components';

import './App.css';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Greeting />
      <SearchForm />
      <WeatherList />
    </React.Fragment>
  );
};

export default App;
