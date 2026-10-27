<script setup lang="ts">
import { computed } from 'vue';
import {
  projects,
  ProjectFilter,
  ProjectKind
} from '~/data/portfolio';

const route = useRoute();
const router = useRouter();

const filter = computed<ProjectFilter>({
  get: () => {
    const f = route.query.filter as ProjectFilter;
    return Object.values(ProjectFilter).includes(f) ? f : ProjectFilter.ALL;
  },
  set: (val: ProjectFilter) => {
    router.replace({
      query: {
        ...route.query,
        filter: val === ProjectFilter.ALL ? undefined : val
      }
    });
  }
});

const counts = computed(() => ({
  [ProjectFilter.ALL]: projects.length,
  [ProjectFilter.WEB]: projects.filter(p => p.kind === ProjectKind.WEB).length,
  [ProjectFilter.MOBILE]: projects.filter(p => p.kind === ProjectKind.MOBILE).length,
  [ProjectFilter.OSS]: projects.filter(p => p.kind === ProjectKind.OSS).length
}));

const matches = (kind: ProjectKind) =>
  filter.value === ProjectFilter.ALL || filter.value === (kind as unknown as ProjectFilter);

const years = ['2025', '2024'];

const groups = computed(() =>
  years
    .map(year => ({
      year,
      projects: projects.filter(p => p.year === year && matches(p.kind))
    }))
    .filter(g => g.projects.length > 0)
);

const subtitle =
  'School projects since 2024: desktop apps, educational games, websites, UI designs, and Python tools.';

useSeoMeta({
  title: 'Work',
  description: subtitle
});
</script>

<template>
  <main class="flex flex-col gap-10 md:gap-14">
    <section class="flex flex-col gap-4">
      <h1 class="text-[26px]/[1.1] font-semibold tracking-display md:text-[30px]">Work</h1>
      <p class="text-sm/6 text-muted md:text-[15px]/[26px]">{{ subtitle }}</p>
      <ProjectFilters v-model="filter" :counts="counts" />
    </section>

    <section
      v-for="(group, groupIndex) in groups"
      :key="group.year"
      class="flex flex-col gap-3.5"
      :aria-labelledby="`year-${group.year}`"
    >
      <div class="flex justify-between border-b border-line pb-1 text-[13px] tracking-normal tabular-nums">
        <h2 :id="`year-${group.year}`" class="text-muted">{{ group.year }}</h2>
        <span class="text-faint tabular-nums">{{ String(group.projects.length).padStart(2, '0') }}</span>
      </div>

      <div class="group/grid grid gap-3.5 md:grid-cols-2">
        <ProjectCard
          v-for="(project, i) in group.projects"
          :key="project.slug"
          :project="project"
          compact
          :priority="groupIndex === 0 && i < 2"
        />
      </div>
    </section>
  </main>
</template>
