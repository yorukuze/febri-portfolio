<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import type { ProjectItem } from '~/data/portfolio';
import { ProjectKind } from '~/data/portfolio';
import { useTheme } from '~/composables/useTheme';

const props = withDefaults(
  defineProps<{
    project: ProjectItem;
    playing?: boolean;
    compact?: boolean;
    priority?: boolean;
  }>(),
  {
    playing: false,
    compact: false,
    priority: false
  }
);

const { isDark } = useTheme();
const video = ref<HTMLVideoElement | null>(null);
const imageError = ref(false);

const isMobile = computed(() => props.project.kind === ProjectKind.MOBILE);
const mediaDir = computed(() => `/media/${props.project.slug}`);
const darkSuffix = computed(() => (isDark.value ? '-dark' : ''));
const mobileSrc = computed(
  () => `${mediaDir.value}/story${darkSuffix.value}${props.playing ? '.webp' : '-poster.webp'}`
);
const posterSrc = computed(() =>
  props.project.kind === ProjectKind.OSS
    ? `${mediaDir.value}/home.jpg`
    : `${mediaDir.value}/poster.jpg`
);

watch(
  () => props.playing,
  (play) => {
    if (!video.value) return;
    if (play) {
      video.value.currentTime = 0;
      video.value.play().catch(() => {});
    } else {
      video.value.pause();
    }
  }
);

onUnmounted(() => {
  if (video.value) {
    video.value.pause();
  }
});
</script>

<template>
  <!-- Mobile Media -->
  <div
    v-if="isMobile"
    class="aspect-[5/4] bg-surface-2 md:aspect-auto"
    :class="compact ? 'md:h-49' : 'md:h-59'"
  >
    <img
      v-if="!imageError"
      :src="mobileSrc"
      :alt="`${project.title} screens`"
      class="size-full scale-[0.94] object-cover md:scale-100 md:object-contain"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      @error="imageError = true"
    />
    <div
      v-else
      class="flex size-full flex-col items-center justify-center gap-2 p-6 text-center"
    >
      <span class="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted">
        {{ project.tagline }}
      </span>
      <p class="text-sm font-medium text-ink">{{ project.title }}</p>
    </div>
  </div>

  <!-- Web / OSS Media with Browser Window Chrome -->
  <div
    v-else
    class="flex aspect-[5/4] flex-col justify-end bg-surface-2 px-2.5 pt-2.5 md:aspect-auto"
    :class="compact ? 'md:h-49 md:px-4 md:pt-4' : 'md:h-59 md:px-5 md:pt-5'"
  >
    <div
      class="flex flex-1 flex-col overflow-hidden rounded-t-lg border border-b-0 border-line bg-browser"
    >
      <!-- Browser chrome header -->
      <div class="flex h-5 shrink-0 items-center gap-1 px-2" aria-hidden="true">
        <span class="size-1.5 rounded-full bg-browser-dot" />
        <span class="size-1.5 rounded-full bg-browser-dot" />
        <span class="size-1.5 rounded-full bg-browser-dot" />
        <span class="flex-1 text-center text-[9px] tracking-normal text-faint">
          {{ project.host || project.slug }}
        </span>
      </div>

      <!-- Browser content -->
      <div class="relative flex-1 overflow-hidden">
        <template v-if="!imageError">
          <img
            :src="posterSrc"
            :alt="`${project.title} website`"
            class="absolute inset-0 size-full object-cover object-top"
            :loading="priority ? 'eager' : 'lazy'"
            :fetchpriority="priority ? 'high' : 'auto'"
            @error="imageError = true"
          />
          <video
            v-if="project.kind === ProjectKind.WEB"
            ref="video"
            class="absolute inset-0 size-full object-cover object-top"
            :poster="posterSrc"
            loop
            muted
            playsinline
            aria-hidden="true"
          >
            <source :src="`${mediaDir}/reel.webm`" type="video/webm" />
            <source :src="`${mediaDir}/reel.mp4`" type="video/mp4" />
          </video>
        </template>

        <!-- Clean aesthetic fallback when no image asset is available -->
        <div
          v-else
          class="flex size-full flex-col items-center justify-center gap-2.5 p-6 text-center select-none"
        >
          <div class="flex size-9 items-center justify-center rounded-xl border border-line bg-surface shadow-xs">
            <svg class="size-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <path d="M3 9h18M9 21V9" />
            </svg>
          </div>
          <div class="flex flex-col gap-0.5">
            <p class="text-sm font-medium text-ink">{{ project.title }}</p>
            <p class="text-[12px] text-muted">{{ project.caption }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
