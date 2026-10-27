import { ref, computed, onMounted } from 'vue';

const theme = ref<'dark' | 'light'>('dark');

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark');

  const applyTheme = (val: 'dark' | 'light') => {
    theme.value = val;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', val);
      try {
        localStorage.setItem('theme', val);
      } catch (e) {
        // ignore
      }
    }
  };

  const toggle = (coords?: { x: number; y: number }) => {
    const nextTheme = theme.value === 'dark' ? 'light' : 'dark';

    // If View Transition API is supported and coordinates are provided
    if (
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      coords
    ) {
      const x = coords.x;
      const y = coords.y;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      // @ts-expect-error view transition types
      const transition = document.startViewTransition(() => {
        applyTheme(nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`
            ]
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.7, 0, 0.3, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else {
      applyTheme(nextTheme);
    }
  };

  onMounted(() => {
    try {
      const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
      if (saved === 'light' || saved === 'dark') {
        applyTheme(saved);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
      }
    } catch (e) {
      applyTheme('dark');
    }
  });

  return {
    theme,
    isDark,
    toggle,
    applyTheme
  };
}
