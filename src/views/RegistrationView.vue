<template lang="pug">
#registration
  h1.poppins.fs_3.fw_6 Register
  OryFlow(
    v-if='registrationFlow'
    form-id='registration-form'
    :flow='registrationFlow'
    title='Register'
  )
</template>

<script setup lang="ts">
import type { SelfServiceRegistrationFlow } from '@ory/kratos-client';
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
const registrationFlow = ref<SelfServiceRegistrationFlow | undefined>();
const handleGetFlowError = makeHandleGetFlowError(router);

// check if we have a flow param
const { flow, returnTo } = route.query;

const initializeSelfServiceRegistrationFlowForBrowsers = () =>
  ory
    .initializeSelfServiceRegistrationFlowForBrowsers(
      returnTo ? String(returnTo) : undefined
    )
    .then((response) => {
      registrationFlow.value = response.data;
      router.replace({
        query: {
          flow: response.data.id,
        },
      });
    })
    .catch(handleGetFlowError);

if (typeof flow !== 'string') {
  // if there's no flow in our route,
  // we need to initialize our registration flow
  initializeSelfServiceRegistrationFlowForBrowsers();
} else {
  ory
    .getSelfServiceRegistrationFlow(flow)
    .then((response) => {
      registrationFlow.value = response.data;
    })
    .catch(handleGetFlowError);
}
</script>

<style scoped lang="scss">
#registration {
  margin: var(--space-5) auto 0 auto;
  padding: 0 var(--space-3);
  width: calc(200px + var(--space-3));
}
</style>
