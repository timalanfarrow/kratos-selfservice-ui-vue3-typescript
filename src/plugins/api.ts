import type { Plugin, InjectionKey } from 'vue';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const $api: InjectionKey<AxiosInstance> = Symbol('$api');

export const ApiPlugin: Plugin = {
  install(app) {
    app.provide(
      $api,
      axios.create({
        baseURL: `${import.meta.env.VITE_APP_API_PROTOCOL}://${
          import.meta.env.VITE_APP_API_DOMAIN
        }`,
      })
    );
  },
};
