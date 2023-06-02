<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { BaseButton } from "@/components";

defineProps<{
  title?: string;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", modelValue: boolean): void;
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <VueFinalModal
    class="flex justify-center items-center"
    overlayTransition="vfm-fade"
    contentClass="relative flex flex-col max-h-full mx-4 p-4 border rounded bg-white"
    @update:modelValue="(val) => emit('update:modelValue', val)"
    ><h4 class="mr-8 text-2xl font-bold border-b-2 py-3">
      <slot name="title">
        {{ title }}
      </slot>
    </h4>
    <div class="flex-grow overflow-y-auto py-5">
      <slot />
    </div>
    <div
      class="flex-shrink-0 gap-5 border-t-2 flex justify-center items-center pt-4"
    >
      <BaseButton class="text-green-600" @click="$emit('confirm')">
        Подтвердить
      </BaseButton>
      <BaseButton class="text-red-600" @click="$emit('cancel')">
        Отмена
      </BaseButton>
    </div>
    <button
      class="absolute top-0 right-0 mt-2 mr-2 hover:text-blue-600"
      @click="$emit('cancel')"
    >
      <Icon name="mdi:close" />
    </button>
  </VueFinalModal>
</template>
