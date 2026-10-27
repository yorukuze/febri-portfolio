<script setup lang="ts">
import { profile } from '~/data/portfolio';
</script>

<template>
  <div
    class="size-10 overflow-hidden rounded-full outline -outline-offset-1 outline-line-strong md:size-12 transition-transform duration-300 ease-out-expo group-hover/brand:scale-105"
  >
    <img
      src="/avatar.jpg"
      :alt="profile.name"
      class="size-full object-cover"
    />
  </div>
</template>
