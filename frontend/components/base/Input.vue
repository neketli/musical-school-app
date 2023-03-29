<script setup lang="ts">
interface IProps {
  modelValue: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  label: "",
  type: "text",
  placeholder: "",
});

const emit = defineEmits(["update:modelValue", "blur"]);
const updateValue = (event: Event): void => {
  emit("update:modelValue", event.target.value);
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="props.label" class="w-full text-gray-600">
      {{ props.label }}
    </div>
    <input
      :value="props.modelValue"
      :type="props.type"
      :placeholder="props.placeholder"
      class="w-full py-1 px-2 rounded-md border border-gray-300 hover:shadow-sm focus:shadow-md active:shadow-md bg-white text-base text-body-color placeholder-gray-300 outline-none focus:border-sky-500 hover:border-gray-400 transition-all"
      @blur="$emit('blur')"
      @input="updateValue"
    />
  </div>
</template>
