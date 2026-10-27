<script setup lang="ts">
import { computed } from 'vue';
import type { ProjectItem } from '~/data/portfolio';
import { ProjectKind, getKindLabel, getProjectIndex, projects } from '~/data/portfolio';
import { useTheme } from '~/composables/useTheme';

const props = defineProps<{
  project: ProjectItem;
}>();

const { isDark } = useTheme();

const imageSrc = computed(() => {
  const p = props.project;
  if (p.kind === ProjectKind.MOBILE) {
    return `/media/${p.slug}/story${isDark.value ? '-dark' : ''}-poster.webp`;
  }
  if (p.kind === ProjectKind.OSS) {
    return `/media/${p.slug}/home.jpg`;
  }
  return `/media/${p.slug}/poster.jpg`;
});
</script>

<template>
  <section class="flex flex-col gap-3.5" aria-labelledby="next-heading">
    <div class="flex justify-between text-sm text-muted">
      <h2 id="next-heading">Next project</h2>
      <span class="text-[13px] tabular-nums">
        {{ getProjectIndex(project.slug) }} of {{ projects.length }}
      </span>
    </div>

    <NuxtLink
      :to="`/work/${project.slug}`"
      class="flex flex-col-reverse overflow-hidden rounded-[18px] border border-line bg-surface transition-opacity hover:opacity-85 md:h-55 md:flex-row"
    >
      <div class="flex flex-1 flex-col justify-end gap-1.5 p-5 md:p-7">
        <span class="text-2xl font-semibold tracking-heading md:text-[26px]">
          {{ project.title }}
        </span>
        <span class="text-sm text-muted">
          {{ project.tagline }} · {{ getKindLabel(project.kind) }} · {{ project.year }}
        </span>
      </div>

      <div class="h-44 bg-surface-2 md:h-full md:w-75">
        <img
          :src="imageSrc"
          alt=""
          loading="lazy"
          class="size-full"
          :class="project.kind === ProjectKind.MOBILE ? 'object-contain' : 'object-cover object-top'"
        />
      </div>
    </NuxtLink>
  </section>
</template>
