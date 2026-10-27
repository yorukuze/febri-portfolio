<script setup lang="ts">
import { computed } from 'vue';
import {
  projects,
  findProject,
  getProjectIndex,
  getKindLabel,
  isCaseStudy
} from '~/data/portfolio';

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const project = findProject(slug.value);

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
    fatal: true
  });
}

if (!isCaseStudy(project) && project.url) {
  await navigateTo(project.url, { external: true, redirectCode: 301 });
}

const nextProject = computed(() => {
  const caseStudies = projects.filter(isCaseStudy);
  const currentIndex = caseStudies.findIndex(p => p.slug === project.slug);
  if (currentIndex === -1) return undefined;
  return caseStudies[(currentIndex + 1) % caseStudies.length];
});

useSeoMeta({
  title: () => `${project.title} · M. Febri Setiawan`,
  description: () => project.summary
});
</script>

<template>
  <main class="flex flex-col gap-8 md:gap-10">
    <div class="flex flex-col gap-4.5">
      <div class="flex items-center justify-between text-muted">
        <NuxtLink to="/work" class="flex items-center gap-1.5 text-sm transition-colors hover:text-ink">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5.5 12L19 12" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 6C11 6 5 10.4189 5 12C5 13.5812 11 18 11 18" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          All work
        </NuxtLink>
        <span class="tabular-nums text-muted text-[13px]">{{ getProjectIndex(project.slug) }} of {{ projects.length }}</span>
      </div>
      <CaseHero :project="project" />
    </div>

    <section class="flex flex-col gap-4">
      <h1 class="text-[30px]/[1.1] font-semibold tracking-display md:text-[38px]">{{ project.title }}</h1>
      <p class="text-[15px]/[25px] text-ink-2 md:text-base/[27px]">{{ project.summary }}</p>
      <div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <span class="text-muted">{{ getKindLabel(project.kind) }} · {{ project.year }}</span>
        <a
          v-for="store in project.stores"
          :key="store.label"
          :href="store.href"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1 font-medium transition-opacity hover:opacity-70"
        >
          {{ store.label }}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a
          v-if="project.url"
          :href="project.url"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-1 font-medium transition-opacity hover:opacity-70"
        >
          Visit site
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </section>

    <CaseFacts :project="project" />
    <CaseDemos v-if="project.demos?.length" :items="project.demos" />
    <CaseNext v-if="nextProject" :project="nextProject" />
  </main>
</template>
