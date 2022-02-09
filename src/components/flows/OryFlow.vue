<template lang="pug">
.ory-flow
  form(
    :id='formId'
    :action='flow.ui.action'
    :method='flow.ui.method'
  )
    OryUiNode.ui-node(
      v-for='node in flow.ui.nodes'
      :key='getNodeId(node)'
      :id='getNodeId(node)'
      :node='node'
    )
  .messages(v-if='flow.ui.messages')
    OryUiMessage(
      v-for='message in flow.ui.messages'
      :message='message'
    )
</template>

<script setup lang="ts">
import type {
  SelfServiceLoginFlow,
  SelfServiceRegistrationFlow,
  SelfServiceRecoveryFlow,
  SelfServiceSettingsFlow,
  SelfServiceVerificationFlow,
} from '@ory/kratos-client';
import OryUiNode from './OryUiNode.vue';
import OryUiMessage from './OryUiMessage.vue';
import { getNodeId } from '@ory/integrations/ui';

defineProps<{
  flow:
    | SelfServiceLoginFlow
    | SelfServiceRegistrationFlow
    | SelfServiceRecoveryFlow
    | SelfServiceSettingsFlow
    | SelfServiceVerificationFlow;
  formId?: string;
}>();
</script>

<style scoped lang="scss">
.ui-node + .ui-node {
  margin-top: var(--space-2);
}

.message {
  margin-top: var(--space-2);
}
</style>
