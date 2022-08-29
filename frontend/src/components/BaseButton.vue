<template>
  <button
    @click.prevent="onClick"
    class="rounded-md border border-gray-300 py-3 px-5 transition-all"
    :class="{
      'bg-gray-50 text-gray-600 hover:border-gray-400 hover:bg-gray-100 hover:shadow-sm active:border-slate-400 active:bg-slate-200':
        !isDisabled,
      'bg-gray-300 text-gray-400 cursor-default': isDisabled,
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    isDisabled: {
      type: [Boolean],
      default: false,
    },
  },
  emits: { click: null },
  methods: {
    onClick() {
      if (!this.isDisabled) {
        this.$emit("click");
      }
    },
  },
};
</script>
