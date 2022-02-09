<template lang="pug">
.text-input(
	@click='focusInput'
	:class='(focused || localValue !== "") ? "expanded" : ""'
)
	label.label.open-sans.caps.fs_2 {{ label }}
	p.char-count.open-sans.fs_2.fw_6(v-if='maxChars') {{ charsRemaining }}
	input.open-sans.fs_2(
		ref='input'
		:name='name'
		v-model='localValue'
		@focus='focused = true'
		@blur='focused = false'
		:type='type'
	)
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

const props = defineProps<{
  label: string;
  maxChars?: number;
  value?: string;
  name: string;
  type?: HTMLInputElement['type'];
}>();

const emit = defineEmits<{
  (event: 'update', newValue: string): string;
}>();

/* data */
const localValue = ref<string>(props.value ?? '');
const input = ref<HTMLInputElement>();
const focused = ref<boolean>(false);

/* computed */
const charsRemaining = computed(
  () => (props.maxChars ?? 0) - localValue.value.length
);

/* watch */
watch(localValue, (newValue) => emit('update', newValue));

/* methods */
const focusInput = () => input.value?.focus();
</script>

<style scoped lang="scss">
.text-input {
  padding: var(--space-3);
  border-radius: var(--border-radius-1);
  background: var(--color-input-background);
  width: 100%;
  height: 50px;

  input,
  label {
    position: absolute;
    top: 50%;
    left: var(--space-3);
    transition: transform 0.2s ease;
  }

  input {
    outline: none;
    border: none;
    background: transparent;
    transform: translateY(-100%);
    padding: 0;
    min-width: 0;
    width: 100%;
  }

  label {
    transform: translateY(-50%);
  }

  .char-count {
    position: absolute;
    bottom: var(--space-2);
    left: var(--space-3);
  }
}

.text-input.expanded {
  input {
    transform: translateY(-10%);
  }

  label {
    transform: translateY(-100%);
  }
}
</style>
