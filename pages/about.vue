<script setup lang="ts">
import {
  experience,
  freelanceExperience,
  toolboxCategories
} from '~/data/portfolio';

useSeoMeta({
  title: 'About · M. Febri Setiawan',
  description: 'Software engineering student at SMK Bina Mandiri Multimedia with skills in HTML, CSS, PHP, Python, C++, Figma, and game development.'
});
</script>

<template>
  <main class="flex flex-col gap-10 md:gap-14">
    <!-- Intro section -->
    <section class="flex flex-col gap-4">
      <h1 class="text-[22px]/[1.3] font-semibold tracking-display md:text-[26px]/[1.25]">
        I'm Febri, a software engineering student based in Bogor.
      </h1>
      <div class="flex flex-col gap-5 text-sm/6 text-ink-2 md:text-[15px]/[26px]">
        <p>
          I'm studying Rekayasa Perangkat Lunak (RPL) at SMK Bina Mandiri Multimedia. I enjoy building things — desktop apps, games, websites, and small tools — and I'm always looking for new challenges to solve.
        </p>
        <p>
          My skills include HTML, CSS, PHP for the web; Python for scripting and simple apps; C++ for lightweight programs; and Figma for UI design. I also make games using Construct 2 and 3.
        </p>
        <p>
          Outside of school, I enjoy exploring new technologies, tinkering with code, and improving my problem-solving skills. I believe in learning by doing.
        </p>
      </div>
    </section>

    <!-- Experience section -->
    <section class="flex flex-col gap-3.5" aria-labelledby="experience-heading">
      <h2 id="experience-heading" class="text-sm text-muted">Experience</h2>
      <ul class="flex flex-col border-b border-line">
        <li
          v-for="item in experience"
          :key="item.company.name"
          class="flex items-center gap-4 rounded-[10px] border-t border-line px-2.5 py-4 transition-colors hover:bg-hover"
        >
          <img
            :src="item.company.logo"
            :alt="item.company.name"
            class="size-10 rounded-[10px] outline -outline-offset-1 outline-line-strong"
          />
          <div class="flex flex-1 flex-col gap-0.75">
            <h3 class="text-base font-semibold">{{ item.company.name }}</h3>
            <p class="text-sm text-muted">{{ item.description }}</p>
          </div>
          <span
            :class="[
              'rounded-full border px-2.5 py-1.25 text-xs',
              item.current
                ? 'border-live/20 bg-live/10 text-live'
                : 'border-line bg-surface-2 text-muted'
            ]"
          >
            {{ item.current ? 'Now' : 'Before' }}
          </span>
        </li>

        <!-- Freelance item with stacked logos (-ml-2) -->
        <li class="flex items-center gap-3.5 rounded-[10px] border-t border-line px-2.5 py-4 transition-colors hover:bg-hover">
          <div class="flex">
            <img
              v-for="(logo, idx) in freelanceExperience.logos"
              :key="logo.name"
              :src="logo.logo"
              :alt="logo.name"
              :class="[
                'size-8.5 rounded-[9px] outline -outline-offset-1 outline-line-strong',
                { '-ml-2': idx > 0 }
              ]"
            />
          </div>
          <div class="flex flex-1 flex-col gap-0.75">
            <h3 class="text-base font-semibold">{{ freelanceExperience.title }}</h3>
            <p class="text-sm text-muted">{{ freelanceExperience.description }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Toolbox section -->
    <section class="flex flex-col gap-3.5" aria-labelledby="toolbox-heading">
      <h2 id="toolbox-heading" class="text-sm text-muted">Toolbox</h2>
      <dl class="flex flex-col border-b border-line">
        <div
          v-for="category in toolboxCategories"
          :key="category.label"
          class="flex flex-col gap-2.5 border-t border-line px-2.5 py-3.5 md:flex-row md:items-center md:gap-4"
        >
          <dt class="text-sm text-muted md:w-20 md:shrink-0">{{ category.label }}</dt>
          <dd class="flex flex-wrap gap-1.5">
            <span
              v-for="tool in category.tools"
              :key="tool.label"
              class="flex items-center gap-1.75 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[13px]"
            >
              <BaseBrandIcon v-if="tool.icon" :name="tool.icon" />
              {{ tool.label }}
            </span>
          </dd>
        </div>
      </dl>
    </section>
  </main>
</template>
