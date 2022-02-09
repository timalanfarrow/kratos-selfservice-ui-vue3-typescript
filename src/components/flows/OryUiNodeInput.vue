<script setup lang="ts">
import type { UiNodeInputAttributes, UiNodeMeta } from '@ory/kratos-client';
import TextInput from '../forms/TextInput.vue';
import FormButton from '../forms/FormButton.vue';

defineProps<{
  meta: UiNodeMeta;
  attributes: UiNodeInputAttributes;
  id: string;
}>();
</script>

<template lang="pug">
.ory-ui-node-input
	input(
		v-if='attributes.type === "hidden"'
		:name='attributes.name'
		:value='attributes.value'
		type='hidden'
	)
	TextInput(
		v-else-if='attributes.type === "password"'
		:label='meta.label?.text ?? ""'
		:value='attributes.value'
		:name='attributes.name'
		type='password'
	)
	TextInput(
		v-else-if='attributes.type === "text"'
		:label='meta.label?.text ?? ""'
		:value='attributes.value'
		:name='attributes.name'
	)
	TextInput(
		v-else-if='attributes.type === "email"'
		:label='meta.label?.text ?? ""'
		:value='attributes.value'
		:name='attributes.name'
	)
	FormButton(
		v-else-if='attributes.type === "submit"'
		:type='attributes.type'
		:label='meta.label?.text'
		:id='`ory-node-${id}`'
		:name='attributes.name'
		:value='attributes.value'
	)
</template>
