<template>
  <div class="w-auto">
    <div class="h-full flex flex-col gap-2 px-2">
      <!-- Sidebar btns -->
      <button
        v-for="item in data"
        :key="item.value"
        class="py-3 px-5 flex gap-3 items-center rounded-md border border-blue-100 bg-white text-gray-600 hover:bg-sky-600 hover:bg-opacity-10 transition-all cursor-pointer"
        :class="{
          'text-blue-600 bg-sky-300 border-blue-200  bg-opacity-10 transition-all cursor-default':
            item.value === modelValue.value,
        }"
        @click="setActiveTab(item)"
      >
        <i :class="['fa', item.icon]" />
        {{ item.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  emits: { "update:modelValue": null, 'input': null},
  methods: {
    setActiveTab(value) {
      this.$emit("update:modelValue", value);
      this.$emit('input', value)
    },
  },
};
</script>
