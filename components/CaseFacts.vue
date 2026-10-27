<script setup lang="ts">
import { computed } from 'vue';
import type { ProjectItem } from '~/data/portfolio';

const props = defineProps<{
  project: ProjectItem;
}>();

const role = computed(() => props.project.caseStudy?.role || 'Frontend Engineer');
const stack = computed(() => props.project.caseStudy?.tools || props.project.stack || []);
</script>

<template>
  <dl class="grid grid-cols-2 gap-6 border-y border-line py-8 sm:grid-cols-4">
    <!-- Role -->
    <div class="flex flex-col gap-1.5">
      <dt class="text-xs font-medium uppercase tracking-wider text-faint">
        Role
      </dt>
      <dd class="text-sm font-medium text-ink">
        {{ role }}
      </dd>
    </div>

    <!-- Client -->
    <div v-if="project.client" class="flex flex-col gap-1.5">
      <dt class="text-xs font-medium uppercase tracking-wider text-faint">
        Client
      </dt>
      <dd class="text-sm font-medium text-ink">
        <a
          v-if="project.client.href"
          :href="project.client.href"
          target="_blank"
          rel="noopener"
          class="underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          {{ project.client.label }}
        </a>
        <span v-else>{{ project.client.label }}</span>
      </dd>
    </div>

    <!-- Design -->
    <div v-if="project.design" class="flex flex-col gap-1.5">
      <dt class="text-xs font-medium uppercase tracking-wider text-faint">
        Design
      </dt>
      <dd class="text-sm font-medium text-ink">
        <a
          v-if="project.design.href"
          :href="project.design.href"
          target="_blank"
          rel="noopener"
          class="underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          {{ project.design.label }}
        </a>
        <span v-else>{{ project.design.label }}</span>
      </dd>
    </div>

    <!-- Stack -->
    <div v-if="stack.length" class="col-span-2 flex flex-col gap-2 sm:col-span-4 md:col-span-1">
      <dt class="text-xs font-medium uppercase tracking-wider text-faint">
        Stack
      </dt>
      <dd class="flex flex-wrap items-center gap-1.5">
        <span
          v-for="tool in stack"
          :key="tool.label"
          class="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface px-2 py-0.5 text-xs text-ink-2"
        >
          <BaseBrandIcon v-if="tool.icon" :name="tool.icon" :size="12" />
          <span>{{ tool.label }}</span>
        </span>
      </dd>
    </div>
  </dl>
</template>
