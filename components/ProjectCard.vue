<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ProjectItem } from '~/data/portfolio';
import { isCaseStudy, getProjectLink } from '~/data/portfolio';
import { icons } from '~/data/uiIcons';

const props = withDefaults(
  defineProps<{
    project: ProjectItem;
    compact?: boolean;
    priority?: boolean;
  }>(),
  {
    compact: false,
    priority: false
  }
);

const isHovered = ref(false);

const isInternal = computed(() => isCaseStudy(props.project));
const link = computed(() => getProjectLink(props.project));
</script>

<template>
  <NuxtLink
    v-if="isInternal"
    :to="link"
    class="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-opacity duration-300 [@media(pointer:fine)]:group-has-[a:hover]/grid:opacity-40 [@media(pointer:fine)]:hover:opacity-100!"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focus="isHovered = true"
    @blur="isHovered = false"
  >
    <ProjectMedia
      :project="project"
      :playing="isHovered"
      :compact="compact"
      :priority="priority"
    />

    <div class="flex items-start justify-between border-t border-line px-3.5 py-3 md:px-4 md:pt-3.5 md:pb-4">
      <div class="flex flex-col gap-0.5 md:gap-0.75">
        <h3 class="text-[15px] font-medium text-ink">
          {{ project.title }}
        </h3>
        <p v-if="compact" class="text-[13px] text-muted">
          {{ project.caption }}
        </p>
        <p v-else class="text-[13px] text-muted">
          {{ project.tagline }} · {{ project.year }}
        </p>
      </div>

      <svg class="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 text-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <component
          v-for="(node, i) in icons.arrowUpRight"
          :is="node.tag"
          :key="i"
          v-bind="node.attrs"
        />
      </svg>
    </div>
  </NuxtLink>

  <a
    v-else
    :href="link"
    target="_blank"
    rel="noopener"
    class="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-opacity duration-300 [@media(pointer:fine)]:group-has-[a:hover]/grid:opacity-40 [@media(pointer:fine)]:hover:opacity-100!"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focus="isHovered = true"
    @blur="isHovered = false"
  >
    <ProjectMedia
      :project="project"
      :playing="isHovered"
      :compact="compact"
      :priority="priority"
    />

    <div class="flex items-start justify-between border-t border-line px-3.5 py-3 md:px-4 md:pt-3.5 md:pb-4">
      <div class="flex flex-col gap-0.5 md:gap-0.75">
        <h3 class="text-[15px] font-medium text-ink">
          {{ project.title }}
        </h3>
        <p v-if="compact" class="text-[13px] text-muted">
          {{ project.caption }}
        </p>
        <p v-else class="text-[13px] text-muted">
          {{ project.tagline }} · {{ project.year }}
        </p>
      </div>

      <svg class="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 text-muted" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <component
          v-for="(node, i) in icons.arrowUpRight"
          :is="node.tag"
          :key="i"
          v-bind="node.attrs"
        />
      </svg>
    </div>
  </a>
</template>
