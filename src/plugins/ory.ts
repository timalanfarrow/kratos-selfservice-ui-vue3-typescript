/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Plugin, InjectionKey } from 'vue';
import { Configuration, V0alpha2Api } from '@ory/kratos-client';
import type { Session, SelfServiceLogoutUrl } from '@ory/kratos-client';
import type { AxiosResponse } from 'axios';

export const Ory = new V0alpha2Api(
  new Configuration({
    basePath: import.meta.env.VITE_APP_ORY_BASE_PATH,
    baseOptions: {
      withCredentials: true,
    },
  })
);

export const $ory: InjectionKey<typeof Ory> = Symbol('$ory');
export const $session: InjectionKey<Session> = Symbol('$session');
export const $ory_urls: InjectionKey<{
  logoutUrl: string;
}> = Symbol('$ory_urls');

export const OryPlugin: Plugin = {
  install(app) {
    // can now be used with inject($ory)
    app.provide($ory, Ory);

    // can now be used with inject($session)
    Ory.toSession().then(({ data }) => {
      app.provide($session, data);
    });

    Promise.all([
      // get the logout url
      Ory.createSelfServiceLogoutFlowUrlForBrowsers().catch(
        () =>
          ({
            data: {
              logout_url: '',
            },
          } as AxiosResponse<SelfServiceLogoutUrl>)
      ),
    ]).then(([{ data: logoutData }]) => {
      app.provide($ory_urls, {
        logoutUrl: logoutData.logout_url,
      });
    });
  },
};
