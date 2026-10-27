<script setup lang="ts">
import { computed } from 'vue';
import { brandIcons } from '~/data/brandIcons';

const props = withDefaults(
  defineProps<{
    name: string;
    size?: number;
  }>(),
  {
    size: 14
  }
);

const icon = computed(() => brandIcons[props.name]);

const isMono = computed(() => {
  if (!icon.value?.hex) return true;
  const hex = icon.value.hex;
  return (
    (parseInt(hex.slice(0, 2), 16) * 299 +
      parseInt(hex.slice(2, 4), 16) * 587 +
      parseInt(hex.slice(4, 6), 16) * 114) /
      1000 <
    60
  );
});

const fill = computed(() => {
  if (!icon.value) return 'currentColor';
  return isMono.value ? 'currentColor' : `#${icon.value.hex}`;
});
</script>

<template>
  <svg
    v-if="icon"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :fill="fill"
    aria-hidden="true"
  >
    <path :d="icon.path" />
  </svg>
</template>
