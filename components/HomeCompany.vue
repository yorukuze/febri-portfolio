<script setup lang="ts">
import { icons } from '~/data/uiIcons';

export interface CompanyItem {
  name: string;
  logo: string;
  url: string;
  host?: string;
  preview?: string;
  note?: string;
}

withDefaults(
  defineProps<{
    company: CompanyItem;
    suffix?: string;
  }>(),
  {
    suffix: ''
  }
);
</script>

<template>
  <span class="group/company relative whitespace-nowrap">
    <a
      :href="company.url"
      target="_blank"
      rel="noopener"
      class="font-medium text-ink decoration-line-strong underline-offset-4 hover:underline"
    >
      <img
        :src="company.logo"
        alt=""
        class="mr-1.25 inline-block size-4 rounded-[4px] align-[-0.22em] outline -outline-offset-1 outline-line-strong md:mr-1.5 md:size-4.5 md:rounded-[5px] md:align-[-0.22em]"
      />
      {{ company.name }}
    </a>{{ suffix }}
    <!-- Hover preview card -->
    <span
      class="pointer-events-none absolute bottom-full left-1/2 z-30 mb-3 hidden w-64 origin-bottom -translate-x-1/2 translate-y-1 scale-95 overflow-hidden rounded-xl border border-line bg-surface opacity-0 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.45)] transition-[opacity,transform] duration-200 ease-out group-hover/company:translate-y-0 group-hover/company:scale-100 group-hover/company:opacity-100 group-hover/company:delay-75 [@media(pointer:fine)]:block"
      aria-hidden="true"
    >
      <span class="block aspect-[16/10] overflow-hidden bg-surface-2">
        <img
          v-if="company.preview"
          :src="company.preview"
          alt=""
          loading="lazy"
          class="size-full object-cover object-top"
        />
        <span v-else class="flex size-full items-center justify-center">
          <img
            :src="company.logo"
            alt=""
            class="size-14 rounded-2xl outline -outline-offset-1 outline-line-strong"
          />
        </span>
      </span>
      <span class="flex items-center justify-between gap-3 border-t border-line px-3 py-2.5 text-xs whitespace-normal">
        <span class="flex flex-col gap-0.5">
          <span class="font-medium text-ink">{{ company.host }}</span>
          <span class="text-muted">{{ company.note }}</span>
        </span>
        <svg class="size-3.5 shrink-0 text-muted" viewBox="0 0 24 24" fill="none">
          <component
            v-for="(node, i) in icons.arrowUpRight"
            :is="node.tag"
            :key="i"
            v-bind="node.attrs"
          />
        </svg>
      </span>
    </span>
  </span>
</template>
