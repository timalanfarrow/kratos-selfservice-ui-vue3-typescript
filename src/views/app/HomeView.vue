<template lang="pug">
#home
	p You signed in!
	p(v-if='verified') Your account is verified!
	.links
		a(:href='oryUrls.logoutUrl') Logout
		RouterLink(to='verification' v-if='!verified') Verify your Account
	JSONDisplay.session-display(
		:json='{session}'
	)
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { injectStrict } from '../../utils';
import { $session, $ory_urls } from '../../plugins/ory';
import JSONDisplay from '../../components/JSONDisplay.vue';

const session = injectStrict($session);
const oryUrls = injectStrict($ory_urls);
const verified = computed<boolean>(() => {
  const { verifiable_addresses } = session.identity;

  return verifiable_addresses?.some((address) => address.verified) ?? false;
});
</script>

<style>
#home {
  width: 70vw;
  margin: var(--space-5) auto;
}

.links {
  margin-top: var(--space-3);
}

.links a {
  margin-right: var(--space-2);
}

.session-display {
  margin: var(--space-3) 0;
}
</style>
