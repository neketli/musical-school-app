<template>
  <VueDatePicker
    v-model="value"
    :enableTimePicker="false"
    locale="ru"
    modelValue="Date"
    modelType="dd/MM/yyyy"
    format="dd/MM/yyyy"
    selectText="Выбрать"
    cancelText="Отмена"
    autoApply
    :teleport="true"
  />
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
export default {
  components: {
    VueDatePicker,
  },
  model: {
    prop: "modelValue",
    event: "update",
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
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
