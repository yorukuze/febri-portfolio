<script setup lang="ts">
import type { IconNode } from '~/data/uiIcons';

interface Props {
  href: string;
  label: string;
  icon?: IconNode[];
  external?: boolean;
}

withDefaults(defineProps<Props>(), {
  icon: undefined,
  external: true
});
</script>

<template>
  <a
    :href="href"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
    class="group flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-ink"
  >
    <svg
      v-if="icon && icon.length"
      class="shrink-0 text-muted transition-colors group-hover:text-ink"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <component
        v-for="(node, i) in icon"
        :is="node.tag"
        :key="i"
        v-bind="node.attrs"
      />
    </svg>
    {{ label }}
  </a>
</template>
