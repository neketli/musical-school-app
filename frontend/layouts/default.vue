<template>
  <div class="bg-sky-50 relative min-h-full">
    <div class="content w-full px-10">
      <slot />
    </div>
  </div>
</template>

<style>
.fade-page-enter-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}
</style>
