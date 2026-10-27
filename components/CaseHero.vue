<script setup lang="ts">
import { computed } from 'vue';
import type { ProjectItem } from '~/data/portfolio';
import { ProjectKind } from '~/data/portfolio';
import { useTheme } from '~/composables/useTheme';

const props = defineProps<{
  project: ProjectItem;
}>();

const { isDark } = useTheme();

const mediaDir = computed(() => `/media/${props.project.slug}`);
const mobileSrc = computed(() => `${mediaDir.value}/story${isDark.value ? '-dark' : ''}.webp`);
const posterSrc = computed(() => props.project.kind === ProjectKind.OSS ? `${mediaDir.value}/home.jpg` : `${mediaDir.value}/poster.jpg`);
</script>

<template>
  <div class="overflow-hidden rounded-[20px] border border-line bg-surface">
    <!-- Mobile hero -->
    <div
      v-if="project.kind === ProjectKind.MOBILE"
      class="aspect-video bg-surface-2"
    >
      <img
        :src="mobileSrc"
        :alt="`${project.title} screens`"
        class="size-full object-contain"
        fetchpriority="high"
      />
    </div>

    <!-- Web / OSS hero with browser chrome -->
    <div
      v-else
      class="flex aspect-video flex-col justify-end bg-surface-2 px-4.5 pt-4.5 md:px-8 md:pt-8"
    >
      <div class="flex flex-1 flex-col overflow-hidden rounded-t-xl border border-b-0 border-line bg-browser">
        <div class="flex h-7 shrink-0 items-center gap-1.5 px-3" aria-hidden="true">
          <span class="size-2 rounded-full bg-browser-dot" />
          <span class="size-2 rounded-full bg-browser-dot" />
          <span class="size-2 rounded-full bg-browser-dot" />
          <span class="flex-1 text-center text-[11px] tracking-normal text-faint">
            {{ project.host }}
          </span>
        </div>

        <div class="relative flex-1 overflow-hidden">
          <img
            :src="posterSrc"
            :alt="`${project.title} website`"
            fetchpriority="high"
            class="absolute inset-0 size-full object-cover object-top"
          />
          <video
            v-if="project.kind === ProjectKind.WEB"
            class="absolute inset-0 size-full object-cover object-top"
            :poster="posterSrc"
            autoplay
            muted
            loop
            playsinline
            aria-hidden="true"
          >
            <source :src="`${mediaDir}/reel.webm`" type="video/webm" />
            <source :src="`${mediaDir}/reel.mp4`" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  </div>
</template>
