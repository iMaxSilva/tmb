// httpClient.ts
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

export interface IHttpClient {
  get<T>(url: string): Promise<AxiosResponse<T>>;
  post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  setCookies(cookies: string[]): void;
}

export default class HttpClient implements IHttpClient {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: `https://trainmanager.cc`,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
      },
    });
  }

  async get<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      return await this.http.get<T>(url);
    } catch (error) {
      throw error;
    }
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      const response = await this.http.post<T>(url, data, config);
      return response;
    } catch (error) {
      throw error;
    }
  }

  setCookies(cookies: string[]): void {
    this.http.defaults.headers.Cookie = cookies;
  }
}
