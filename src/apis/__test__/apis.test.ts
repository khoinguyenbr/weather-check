import axios from 'axios';
import { searchCity, getWeather } from '../index';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Test searchCity API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return cities data when search city success', async () => {
    mockAxios.get.mockResolvedValue({
      data: [
        { title: 'Ha Nam', woeid: 1321 },
        { title: 'Ha Noi', woeid: 3321 },
      ],
    });
    const data = await searchCity('Ha');
    expect(data).toEqual([
      { title: 'Ha Nam', woeid: 1321 },
      { title: 'Ha Noi', woeid: 3321 },
    ]);
  });

  test('should return empty array data when search city failure', async () => {
    mockAxios.get.mockRejectedValue(new Error('reject'));
    const data = await searchCity('Ha');
    expect(data).toEqual([]);
  });
});

describe('Test searchWeaher API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return weather data when request success', async () => {
    mockAxios.get.mockResolvedValue({
      data: {
        consolidated_weather: [
          { applicable_date: '2011-01-01', max_temp: 38, min_temp: 28 },
          { applicable_date: '2011-01-02', max_temp: 38, min_temp: 28 },
          { applicable_date: '2011-01-03', max_temp: 39, min_temp: 27 },
          { applicable_date: '2011-01-04', max_temp: 38, min_temp: 28 },
          { applicable_date: '2011-01-05', max_temp: 38, min_temp: 28 },
        ],
      },
    });
    const data = await getWeather(123);
    expect(data).toEqual([
      { date: new Date('2011-01-01'), maxTemp: 38, minTemp: 28 },
      { date: new Date('2011-01-02'), maxTemp: 38, minTemp: 28 },
      { date: new Date('2011-01-03'), maxTemp: 39, minTemp: 27 },
      { date: new Date('2011-01-04'), maxTemp: 38, minTemp: 28 },
      { date: new Date('2011-01-05'), maxTemp: 38, minTemp: 28 },
    ]);
  });

  test('should return empty array data when request failure', async () => {
    mockAxios.get.mockRejectedValue(new Error('reject'));
    const data = await getWeather(12321);
    expect(data).toEqual([]);
  });
});
