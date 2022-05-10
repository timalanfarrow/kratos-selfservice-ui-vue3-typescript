<template lang="pug">
#recovery
  h1.poppins.fs_3.fw_6 Recover your password
  OryFlow(
    v-if='recoveryFlow'
    form-id='recover-form'
    :flow='recoveryFlow'
    title='Login'
  )
</template>

<script setup lang="ts">
import type { SelfServiceRecoveryFlow } from '@ory/client';
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
const recoveryFlow = ref<SelfServiceRecoveryFlow | undefined>();
const handleGetFlowError = makeHandleGetFlowError(router);

// check if we have a flow param
const { flow, refresh, aal, returnTo } = route.query;

const initializeSelfServiceRecoveryFlowForBrowsers = () =>
  ory
    .initializeSelfServiceRecoveryFlowForBrowsers(
      returnTo ? String(returnTo) : undefined
    )
    .then((response) => {
      recoveryFlow.value = response.data;
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
  initializeSelfServiceRecoveryFlowForBrowsers();
} else {
  ory
    .getSelfServiceRecoveryFlow(flow)
    .then((response) => {
      recoveryFlow.value = response.data;
    })
    .catch(handleGetFlowError);
}
</script>

<style scoped lang="scss">
#recovery {
  margin: var(--space-5) auto 0 auto;
  padding: 0 var(--space-3);
  width: 250px;
}
</style>
