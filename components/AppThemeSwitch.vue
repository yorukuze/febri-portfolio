<script setup lang="ts">
import { ref } from 'vue';
import { useTheme } from '~/composables/useTheme';

const { isDark, toggle } = useTheme();
const button = ref<HTMLButtonElement | null>(null);

const stars = [
  { top: '23%', left: '12%', size: '2.2px' },
  { top: '56%', left: '25%', size: '1.6px' },
  { top: '27%', left: '38%', size: '1.3px' },
  { top: '63%', left: '14%', size: '1px' },
  { top: '41%', left: '31%', size: '1px' }
];

const handleToggle = () => {
  if (button.value) {
    const rect = button.value.getBoundingClientRect();
    toggle({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  } else {
    toggle();
  }
};
</script>

<template>
  <button
    ref="button"
    type="button"
    role="switch"
    :aria-checked="isDark"
    data-theme-keep=""
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    class="relative h-8 w-15 shrink-0 cursor-pointer overflow-hidden rounded-full transition-colors duration-500 md:h-8.5 md:w-16"
    :class="isDark ? 'bg-[#24205a] shadow-[inset_0_0_0_1px_#ffffff1f]' : 'bg-[#9fd8f6] shadow-[inset_0_0_0_1px_#0000000f]'"
    @click="handleToggle"
  >
    <!-- Stars with staggered delays -->
    <span
      v-for="(star, i) in stars"
      :key="i"
      class="absolute rounded-full bg-white transition-[opacity,transform] duration-300"
      :class="isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
      :style="{
        top: star.top,
        left: star.left,
        width: star.size,
        height: star.size,
        transitionDelay: isDark ? `${150 + i * 60}ms` : '0ms'
      }"
    />

    <!-- Clouds -->
    <div
      class="absolute inset-0 transition-[opacity,transform] duration-500 ease-out"
      :class="isDark ? 'translate-y-3 opacity-0' : 'translate-y-0 opacity-100'"
    >
      <span class="absolute rounded-full bg-white top-[46%] right-[17%] h-[26%] w-[25%]" />
      <span class="absolute rounded-full bg-white top-[31%] right-[22%] h-[29%] w-[16%]" />
      <span class="absolute rounded-full bg-white top-[37%] right-[12%] h-[24%] w-[16%]" />
    </div>

    <!-- Orb -->
    <div
      class="absolute top-1/2 size-6 -translate-y-1/2 rounded-full transition-[left,background-color,box-shadow,rotate] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] md:size-6.5"
      :class="isDark ? 'left-[calc(100%-1.75rem)] rotate-0 bg-[#fdf2cc] shadow-[0_0_0_3px_#fdf4d714] md:left-[calc(100%-1.875rem)]' : 'left-1 -rotate-180 bg-[#fbbf24] shadow-[0_0_0_3px_#fde68a66]'"
    >
      <!-- Moon craters -->
      <div
        class="absolute inset-0 transition-opacity duration-300"
        :class="isDark ? 'opacity-100' : 'opacity-0'"
      >
        <span class="absolute top-[28%] left-[25%] size-1.5 rounded-full bg-[#d8c280]" />
        <span class="absolute top-[52%] left-[48%] size-1 rounded-full bg-[#d8c280]" />
        <span class="absolute top-[35%] left-[58%] size-0.75 rounded-full bg-[#d8c280]" />
      </div>

      <!-- Sun flare shine -->
      <div
        class="absolute inset-0 transition-opacity duration-300"
        :class="isDark ? 'opacity-0' : 'opacity-100'"
      >
        <span class="absolute top-1 left-1.5 size-1.5 rounded-full bg-white/50" />
      </div>
    </div>
  </button>
</template>
