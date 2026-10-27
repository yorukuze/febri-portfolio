<script setup lang="ts">
import { computed } from 'vue';
import {
  profile,
  companies,
  projects,
  featuredSlugs,
  ProjectFilter,
  ProjectKind
} from '~/data/portfolio';
import { icons } from '~/data/uiIcons';

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

const displayedProjects = computed(() => {
  if (filter.value === ProjectFilter.ALL) {
    return featuredSlugs
      .map(slug => projects.find(p => p.slug === slug))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
  }
  return projects.filter(p => matches(p.kind)).slice(0, 6);
});

useSeoMeta({
  title: 'M. Febri Setiawan · Software Engineering Student',
  description: 'Software engineering student at SMK Bina Mandiri Multimedia, building desktop apps, websites, games, and Python tools.'
});
</script>

<template>
  <main class="flex flex-col gap-12 md:gap-14">
    <!-- Hero bio section -->
    <section class="flex flex-col gap-6">
      <div class="flex flex-col gap-5 text-sm/6 text-ink-2 md:gap-5 md:text-[15px]/[26px]">
        <p>I'm a software engineering student (RPL) at SMK Bina Mandiri Multimedia, passionate about building things — from desktop apps and websites to games and Python tools.</p>
        <p>
          Currently studying at <HomeCompany :company="companies.smkbm" suffix="," /> focusing on Rekayasa Perangkat Lunak (software engineering).
        </p>
        <p>
          I've built desktop apps, educational games with Construct 2 & 3, websites with HTML & CSS, and small Python programs — all during school.
        </p>
      </div>

      <!-- Social links (mobile) -->
      <p class="text-sm/6 text-ink-2 md:hidden">
        Find me on
        <a :href="`mailto:${profile.email}`" class="text-ink underline decoration-line-strong underline-offset-4">Email</a>
        or chat via
        <a :href="profile.call" target="_blank" rel="noopener" class="text-ink underline decoration-line-strong underline-offset-4">WhatsApp</a>.
      </p>

      <!-- Social links (desktop) -->
      <div class="hidden flex-wrap gap-2 md:flex">
        <BasePill :href="`mailto:${profile.email}`" label="Email" :icon="icons.mail" :external="false" />
        <BasePill v-if="profile.call" :href="profile.call" label="WhatsApp" :external="true" />
        <BasePill v-if="profile.github && profile.github !== 'https://github.com'" :href="profile.github" label="GitHub" :icon="icons.github" :external="true" />
        <BasePill v-if="profile.resume" :href="profile.resume" label="Résumé" :icon="icons.resume" :external="true" />
      </div>
    </section>

    <!-- Work section -->
    <section class="flex flex-col gap-5" aria-labelledby="work-heading">
      <div class="flex items-center justify-between">
        <h2 id="work-heading" class="hidden text-[15px] font-medium md:block">Work</h2>
        <ProjectFilters v-model="filter" :counts="counts" />
      </div>

      <div class="group/grid grid gap-4 md:grid-cols-2">
        <ProjectCard
          v-for="(project, i) in displayedProjects"
          :key="project.slug"
          :project="project"
          :priority="i < 2"
        />
      </div>

      <div class="flex justify-center pt-1">
        <NuxtLink to="/work" class="flex items-center gap-1.5 rounded-full border border-line px-4 py-2.25 text-[13px] transition-colors hover:bg-surface">See all {{ projects.length }} projects <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18.5 12L4.99997 12" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6" stroke-linecap="round" stroke-linejoin="round"/></svg></NuxtLink>
      </div>
    </section>
  </main>
</template>
