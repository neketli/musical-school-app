<script setup lang="ts"></script>

<template>
  <main class="bg-sky-50 relative min-h-full">
    <div class="flex container py-10">
      <div class="content w-full px-10">
        <transition-group name="fade-page">
          <slot />
        </transition-group>
      </div>
    </div>
  </main>
</template>

<style>
.fade-page-enter-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}
</style>
