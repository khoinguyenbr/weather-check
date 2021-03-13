export interface CityModel {
  title: string;
  woeid: number;
}

export interface WeatherModel {
  date: Date;
  minTemp: number;
  maxTemp: number;
}

export interface IWeatherDataPayload {
  data: WeatherModel[];
  city: string;
}

export interface ICityResponse {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
}

export interface IWeatherResponse {
  consolidated_weather: {
    min_temp: number;
    max_temp: number;
    applicable_date: string;
  }[];
}
