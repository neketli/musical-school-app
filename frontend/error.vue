<template>
  <main>
    <BaseHeader />
    <div class="h-full flex flex-col gap-10 items-center justify-center">
      <p class="text-3xl mt-32 text-blue-900">Упс...</p>
      <div class="text-6xl -ml-16 text-blue-900">
        <Icon name="mdi:search" /> 4 <span class="text-black">0</span> 4
      </div>
      <p class="text-3xl text-blue-900">
        Мы не смогли найти, что вы искали, но мы правда старались
      </p>
      <BaseButton
        class="text-xl bg-blue-400 border-none hover:bg-blue-400 hover:border-none hover:bg-opacity-30 bg-opacity-20 text-blue-900"
        @click="back"
      >
        Назад
      </BaseButton>
    </div>
  </main>
</template>

<script>
import { BaseButton, BaseHeader } from "@/components";

export default {
  components: {
    BaseButton,
    BaseHeader,
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
