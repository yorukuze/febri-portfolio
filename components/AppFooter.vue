<script setup lang="ts">
import { profile } from '~/data/portfolio';
import { useLocalTime } from '~/composables/useLocalTime';

const { time } = useLocalTime(profile.timezone);
</script>

<template>
  <footer class="flex flex-col gap-6 border-t border-line pt-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div class="flex flex-col gap-1">
        <p class="text-sm text-muted">Working on something?</p>
        <a
          :href="`mailto:${profile.email}`"
          class="text-xl font-medium tracking-heading transition-opacity hover:opacity-80 md:text-[22px]"
        >
          {{ profile.email }}
        </a>
      </div>
      <a
        v-if="profile.call"
        :href="profile.call"
        target="_blank"
        rel="noopener"
        class="rounded-full bg-ink px-4 py-2.25 text-[13px] font-medium text-bg transition-opacity hover:opacity-85"
      >
        Contact on WhatsApp
      </a>
    </div>
    <p class="text-[11px] tracking-label text-muted uppercase tabular-nums">
      {{ profile.location }}<template v-if="time"> · {{ time }} WIB</template>
    </p>
  </footer>
</template>
