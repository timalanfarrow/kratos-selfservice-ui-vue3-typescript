<template lang="pug">
.json(:class='{root: propName === undefined }')
	.label(v-if='propName')
		.arrow(v-if='Object.keys(json).length' @click='toggle' :class='{open: !hidden}')
		p {{ propName }} : {
	.children(:class='{hidden}' v-if='Object.keys(json).length')
		.item(v-for='[key, value] in Object.entries(json)')
			p(v-if=`typeof value !== 'object'`)
				| {{ key }} : {{ value }}
			JSONDisplay(
				v-else
				:json='value'
				:propName='key'
			)
	p(v-if='propName') }
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  json: { [key: string]: any };
  propName?: string;
}>();

const hidden = ref<boolean>(false);
const toggle = () => {
  console.log('clicked');
  hidden.value = !hidden.value;
};
</script>

<style scoped lang="scss">
.json:not(.root) .children {
  padding-left: 20px;
}

.children.hidden {
  display: none;
}

p {
  font-family: monospace;
}

.arrow {
  position: absolute;
  top: 50%;
  left: -10px;
  transform: translate(-100%, -30%) rotate(45deg);
  height: 10px;
  width: 10px;

  &::before {
    position: absolute;
    content: ' ';
    height: 7px;
    width: 7px;
    border-top: 2px solid var(--color-text);
    border-right: 2px solid var(--color-text);
  }

  &.open::before {
    transform: translate(0%, -30%) rotate(90deg);
  }
}
</style>
