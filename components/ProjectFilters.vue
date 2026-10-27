<script setup lang="ts">
import { ref, reactive, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps<{
  modelValue: string;
  counts?: Record<string, number>;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const tabs = [
  { value: 'all', label: 'All', short: 'All' },
  { value: 'web', label: 'Web', short: 'Web' },
  { value: 'mobile', label: 'Mobile', short: 'Mobile' },
  { value: 'oss', label: 'Open source', short: 'OSS' }
];

const track = ref<HTMLElement | null>(null);
const buttons = ref<HTMLElement[]>([]);

const indicator = reactive({
  left: 0,
  width: 0,
  ready: false
});

const updateIndicator = () => {
  const index = tabs.findIndex(t => t.value === props.modelValue);
  const el = buttons.value[index];
  if (el) {
    indicator.left = el.offsetLeft;
    indicator.width = el.offsetWidth;
  }
};

onMounted(() => {
  updateIndicator();
  requestAnimationFrame(() => {
    indicator.ready = true;
  });
  window.addEventListener('resize', updateIndicator);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIndicator);
});

watch(() => props.modelValue, () => {
  nextTick(() => {
    updateIndicator();
  });
}, { flush: 'post' });

const getTabClass = (val: string) => {
  if (val === props.modelValue) {
    return indicator.width ? 'text-ink' : 'bg-surface-2 text-ink';
  }
  return 'text-muted hover:text-ink';
};
</script>

<template>
  <div
    ref="track"
    class="relative flex w-fit gap-0.5 rounded-full border border-line bg-surface p-[3px]"
    role="tablist"
    aria-label="Filter projects"
  >
    <!-- Sliding pill indicator -->
    <span
      class="absolute inset-y-[3px] left-0 rounded-full bg-surface-2"
      :class="indicator.ready ? 'transition-[translate,width] duration-300 ease-out-expo' : ''"
      :style="{
        translate: `${indicator.left}px 0`,
        width: `${indicator.width}px`
      }"
      aria-hidden="true"
    />

    <!-- Tab buttons -->
    <button
      v-for="(tab, i) in tabs"
      :key="tab.value"
      :ref="(el) => { if (el) buttons[i] = el as HTMLElement; }"
      type="button"
      role="tab"
      :aria-selected="modelValue === tab.value"
      class="relative z-1 flex items-center gap-1.5 rounded-full px-2.75 py-1 text-xs font-medium transition-colors md:px-3 md:py-1.25"
      :class="getTabClass(tab.value)"
      @click="emit('update:modelValue', tab.value)"
    >
      <span class="md:hidden">{{ tab.short }}</span>
      <span class="hidden md:inline">{{ tab.label }}</span>
      <span
        v-if="counts && counts[tab.value] !== undefined"
        class="text-[11px] tracking-normal text-faint tabular-nums"
      >
        {{ counts[tab.value] }}
      </span>
    </button>
  </div>
</template>
