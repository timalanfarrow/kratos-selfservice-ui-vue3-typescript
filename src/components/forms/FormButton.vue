<template lang="pug">
.button(:class='variant')
	label.open-sans.caps.fs-2.fw_6(:for='id') {{ label }}
	button(
		:id='id'
		:type='type'
		:name='name'
		:value='value'
	)
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id: string;
    label: string;
    type: HTMLButtonElement['type'];
    variant?: 'primary' | 'secondary' | 'tertiary';
    name?: string;
    value?: string;
  }>(),
  {
    variant: 'primary',
  }
);
</script>

<style scoped lang="scss">
.button,
.button * {
  cursor: pointer;
}

.button {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-1);

  &.primary {
    background: var(--color-accent-one);
    color: var(--color-contrast-one);
  }
}

label {
  text-align: center;
}

button {
  visibility: hidden;
}
</style>
