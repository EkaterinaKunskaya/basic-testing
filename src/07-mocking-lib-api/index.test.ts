import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const mockData = { data: 'data' };
  const relativePath = 'relative/path';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    mockedAxios.create.mockImplementation(() => mockedAxios);
    mockedAxios.get.mockImplementation(() => Promise.resolve(mockData));
    jest.runOnlyPendingTimers();
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.create.mockImplementation(() => mockedAxios);
    mockedAxios.get.mockImplementation(() => Promise.resolve(mockData));
    jest.runOnlyPendingTimers();
    await throttledGetDataFromApi(relativePath);
    expect(mockedAxios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    mockedAxios.create.mockImplementation(() => mockedAxios);
    mockedAxios.get.mockImplementation(() => Promise.resolve(mockData));
    jest.runOnlyPendingTimers();
    expect(await throttledGetDataFromApi(relativePath)).toBe(mockData.data);
  });
});
