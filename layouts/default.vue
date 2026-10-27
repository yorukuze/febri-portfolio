<template>
  <div class="flex min-h-dvh flex-col items-center px-5 pt-10 pb-10 md:px-8 md:pt-22 md:pb-14">
    <div class="flex w-full max-w-180 flex-col gap-10 md:gap-14">
      <AppHeader />
      <slot />
      <AppFooter />
    </div>
  </div>
</template>
