<template>
  <div class="flex flex-col gap-5">
    <div v-if="label" class="w-full text-gray-400">
      {{ label }}
    </div>
    <input
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      class="w-full py-3 px-5 rounded-md border border-gray-300 hover:shadow-sm focus:shadow-md active:shadow-md bg-white text-base text-body-color placeholder-gray-300 outline-none focus:border-sky-500 hover:border-gray-400 transition-all"
      @blur="$emit('blur')"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: [String],
      default: "",
    },
    type: {
      type: [String],
      default: "text",
    },
    placeholder: {
      type: [String],
      default: "",
    },
  },
  emits: ["update:modelValue", "blur"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
