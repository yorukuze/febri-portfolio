import { ref, onMounted, onUnmounted } from 'vue';

export function useLocalTime(timeZone = 'Africa/Lagos') {
  const time = ref('');
  let timer: any = null;

  const update = () => {
    try {
      time.value = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(new Date());
    } catch (e) {
      const d = new Date();
      time.value = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    }
  };

  onMounted(() => {
    update();
    timer = setInterval(update, 30000);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return { time };
}
