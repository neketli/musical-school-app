<template>
  <BaseLayout hideSidebar>
    <div class="h-full pt-32 flex flex-col gap-10 items-center justify-center">
      <p class="text-5xl text-blue-900">Упс...</p>
      <div class="text-6xl -ml-16 text-blue-900">
        <i class="fa fa-search" /> 4 <span class="text-black">0</span> 4
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
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import { BaseButton } from "@/components";

export default {
  components: {
    BaseLayout,
    BaseButton,
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
