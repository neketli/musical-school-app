<template>
  <div class="w-auto">
    <div class="h-full flex flex-col gap-5 px-2">
      <!-- Sidebar btns -->
      <button
        v-for="item in data"
        :key="item.value"
        class="py-3 px-5 rounded-md border border-transparent text-gray-600 hover:bg-sky-600 hover:bg-opacity-10 transition-all cursor-pointer"
        :to="item.link"
        :class="{
          'text-blue-600 bg-sky-300 border-blue-200  bg-opacity-10 transition-all cursor-default':
            item.value === modelValue.value,
        }"
        @click="setActiveTab(item)"
      >
        {{ item.value }}
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
  emits: { "update:modelValue": null, onLogOut: null },
  methods: {
    setActiveTab(value) {
      this.$emit("update:modelValue", value);
    },
    logOut() {
      this.$emit("onLogOut");
    },
  },
};
</script>
