/* eslint-disable no-param-reassign */
import { App } from 'vue';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof axios
  }
}

const instance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

const Service = {
  async get(url: string): Promise<AxiosResponse> {
    const response = await instance.get(url);
    return response?.data;
  },
};

export default {
  install(app: App): void {
    app.config.globalProperties.$http = Service;
    app.provide('http', Service);
  },
};
