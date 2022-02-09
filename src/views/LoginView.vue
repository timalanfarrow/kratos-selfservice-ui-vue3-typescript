<template lang="pug">
#login
  h1.poppins.fs_3.fw_6 Login
  OryFlow(
    v-if='loginFlow'
    form-id='login-form'
    :flow='loginFlow'
    title='Login'
  )
  .links
    RouterLink(to='/registration') Sign Up
    RouterLink(to='/recovery') Forgot Password?
</template>

<script setup lang="ts">
import type { SelfServiceLoginFlow } from '@ory/kratos-client';
import type { AxiosError } from 'axios';

import { ref } from 'vue';
import { injectStrict } from '../utils';
import { $ory } from '../plugins/ory';
import { useRoute, useRouter } from 'vue-router';
import OryFlow from '../components/flows/OryFlow.vue';
import { makeHandleGetFlowError } from '../utils/flows';

const ory = injectStrict($ory);
const route = useRoute();
const router = useRouter();
const loginFlow = ref<SelfServiceLoginFlow | undefined>();
const handleGetFlowError = makeHandleGetFlowError(router);

// check if we have a flow param
const { flow, refresh, aal, returnTo } = route.query;

const initializeSelfServiceLoginFlowForBrowsers = () =>
  ory
    .initializeSelfServiceLoginFlowForBrowsers(
      Boolean(refresh),
      aal ? String(aal) : undefined,
      returnTo ? String(returnTo) : undefined
    )
    .then((response) => {
      loginFlow.value = response.data;
      router.replace({
        query: {
          flow: response.data.id,
        },
      });
    })
    .catch(handleGetFlowError);

if (typeof flow !== 'string') {
  // if there's no flow in our route,
  // we need to initialize our login flow
  initializeSelfServiceLoginFlowForBrowsers();
} else {
  ory
    .getSelfServiceLoginFlow(flow)
    .then((response) => {
      loginFlow.value = response.data;
    })
    .catch(handleGetFlowError);
}
</script>

<style scoped lang="scss">
#login {
  margin: var(--space-5) auto 0 auto;
  width: 250px;

  .links {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: var(--space-3);
  }
}
</style>
