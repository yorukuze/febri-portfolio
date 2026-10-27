<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { onClickOutside } from '@vueuse/core';
import { profile } from '~/data/portfolio';

const route = useRoute();
const menuOpen = ref(false);
const menu = ref<HTMLElement | null>(null);
const toggle = ref<HTMLElement | null>(null);

const navLinks = computed(() => [
  { label: 'Work', to: '/work', active: route.path === '/' || route.path.startsWith('/work') },
  { label: 'About', to: '/about', active: route.path === '/about' }
]);

onClickOutside(menu, () => {
  menuOpen.value = false;
}, { ignore: [toggle] });

watch(() => route.path, () => {
  menuOpen.value = false;
});
</script>

<template>
  <header class="relative flex items-center justify-between">
    <!-- Brand -->
    <NuxtLink to="/" class="group/brand flex items-center gap-3 md:gap-3.5">
      <AppBrand />
      <span class="flex flex-col">
        <span class="text-sm font-medium tracking-heading text-ink">{{ profile.name }}</span>
        <span class="text-[13px] text-muted">{{ profile.role }}</span>
      </span>
    </NuxtLink>

    <!-- Desktop Navigation -->
    <nav class="hidden items-center gap-6 text-sm md:flex">
      <NuxtLink
        v-for="item in navLinks"
        :key="item.to"
        :to="item.to"
        class="transition-colors hover:text-ink"
        :class="item.active ? 'text-ink' : 'text-muted'"
      >
        {{ item.label }}
      </NuxtLink>
      <a
        v-if="profile.resume"
        :href="profile.resume"
        target="_blank"
        rel="noopener"
        class="text-muted transition-colors hover:text-ink"
      >
        Résumé
      </a>
      <a
        v-else-if="profile.call"
        :href="profile.call"
        target="_blank"
        rel="noopener"
        class="text-muted transition-colors hover:text-ink"
      >
        Contact
      </a>
      <AppThemeSwitch />
    </nav>

    <!-- Mobile Menu Controls -->
    <div class="flex items-center gap-2 md:hidden">
      <AppThemeSwitch />
      <button
        ref="toggle"
        type="button"
        class="relative flex size-8 items-center justify-center rounded-full border border-line bg-surface text-ink"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="absolute h-[1.5px] w-3.5 rounded-full bg-current transition-transform duration-500 ease-out-expo"
          :class="menuOpen ? 'rotate-45' : '-translate-y-[3.5px]'"
          aria-hidden="true"
        />
        <span
          class="absolute h-[1.5px] w-3.5 rounded-full bg-current transition-transform duration-500 ease-out-expo"
          :class="menuOpen ? '-rotate-45' : 'translate-y-[3.5px]'"
          aria-hidden="true"
        />
      </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-400 ease-out-expo"
      enter-from-class="-translate-y-1.5 scale-95 opacity-0 blur-xs"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="-translate-y-1 scale-97 opacity-0 blur-xs"
    >
      <nav
        v-if="menuOpen"
        ref="menu"
        class="absolute top-full right-0 z-20 mt-3 flex w-44 origin-top-right flex-col rounded-2xl border border-line bg-surface p-1.5 text-sm shadow-[0_12px_32px_-12px_rgb(0_0_0/0.25)] md:hidden"
        aria-label="Mobile"
      >
        <NuxtLink
          v-for="item in navLinks"
          :key="item.to"
          :to="item.to"
          class="rounded-xl px-3 py-2.5 transition-colors"
          :class="item.active ? 'bg-surface-2 text-ink' : 'text-muted'"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <a
          v-if="profile.resume"
          :href="profile.resume"
          target="_blank"
          rel="noopener"
          class="rounded-xl px-3 py-2.5 text-muted transition-colors hover:text-ink"
          @click="menuOpen = false"
        >
          Résumé
        </a>
        <a
          v-else-if="profile.call"
          :href="profile.call"
          target="_blank"
          rel="noopener"
          class="rounded-xl px-3 py-2.5 text-muted transition-colors hover:text-ink"
          @click="menuOpen = false"
        >
          Contact
        </a>
      </nav>
    </Transition>
  </header>
</template>
