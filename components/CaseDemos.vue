<script setup lang="ts">
import type { DemoItem } from '~/data/portfolio';

defineProps<{
  items?: DemoItem[];
}>();
</script>

<template>
  <div v-if="items && items.length" class="flex flex-col gap-10">
    <figure
      v-for="(item, idx) in items"
      :key="idx"
      class="flex flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-surface p-3 sm:p-4"
    >
      <div class="relative flex items-center justify-center overflow-hidden rounded-xl bg-surface-2">
        <video
          v-if="item.type === 'video'"
          :src="item.src"
          playsinline
          controls
          preload="metadata"
          class="max-h-[600px] w-auto max-w-full rounded-lg object-contain"
        />
        <img
          v-else
          :src="item.src"
          :alt="item.label"
          class="max-h-[600px] w-auto max-w-full rounded-lg object-contain"
          loading="lazy"
        />
      </div>
      <figcaption v-if="item.label" class="px-1 text-center text-xs text-muted sm:text-sm">
        {{ item.label }}
      </figcaption>
    </figure>
  </div>
</template>
