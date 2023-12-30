import { AxiosResponse, AxiosInstance } from 'axios';
import HttpClient, { IHttpClient } from './http-client';

describe('HttpClient', () => {
  let httpClient: IHttpClient;

  beforeEach(() => {
    jest.clearAllMocks();
    httpClient = new HttpClient('http://test.com');
  });

  it('should make a GET request with success', async () => {
    const responseData = { example: 'data' };

    const axiosGetSpy = jest
      .spyOn(httpClient.getHttpInstance(), 'get')
      .mockResolvedValue({ data: responseData } as AxiosResponse);

    const result = await httpClient.get('/example');

    expect(axiosGetSpy).toHaveBeenCalledWith('/example');
    expect(result.data).toEqual(responseData);
  });

  it('should make a GET request with error', async () => {
    const axiosGetSpy = jest
      .spyOn(httpClient.getHttpInstance(), 'get')
      .mockRejectedValue(new Error('Mocked GET error'));

    await expect(httpClient.get('/example')).rejects.toThrow('Mocked GET error');
    expect(axiosGetSpy).toHaveBeenCalledWith('/example');
  });

  it('should make a POST request with success', async () => {
    const requestData = { example: 'data' };
    const responseData = { success: true };

    const axiosPostSpy = jest
      .spyOn(httpClient.getHttpInstance(), 'post')
      .mockResolvedValue({ data: responseData } as AxiosResponse);

    const result = await httpClient.post('/example', requestData);

    expect(axiosPostSpy).toHaveBeenCalledWith('/example', requestData, undefined);
    expect(result.data).toEqual(responseData);
  });

  it('should make a POST request with error', async () => {
    const axiosPostSpy = jest
      .spyOn(httpClient.getHttpInstance(), 'post')
      .mockRejectedValue(new Error('Mocked post error'));

    await expect(httpClient.post('/example', '', undefined)).rejects.toThrow('Mocked post error');
    expect(axiosPostSpy).toHaveBeenCalledWith('/example', "", undefined);
  });

  it('should test cookies', () => {
    const cookieSpy = jest.spyOn(httpClient, 'setCookies');
    const mockData = ['cookie1', 'cookie2']
    httpClient.setCookies(mockData)

    expect(cookieSpy).toHaveBeenCalledWith(mockData)
  })
});
