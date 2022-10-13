<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <template v-for="key in rowKeys" :key="key">
      <td class="px-6 py-3">
        <!-- eslint-disable-next-line vue/no-mutating-props -->
        <BaseInput :key="key" v-model="rowData[key]" />
      </td>
    </template>
  </tr>
</template>

<script>
import { BaseInput } from "@/components";
export default {
  components: {
    BaseInput,
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  emits: { onSave: null, onRemove: null, onCancel: null },
  data() {
    return {
      editMode: false,
      row: {},
      oldRow: {},
    };
  },
  computed: {
    rowKeys() {
      return Object.keys(this.rowData).filter((item) => item !== "name");
    },
  },
  methods: {
    toggleEditMode() {
      this.oldRow = { ...this.rowData };
      this.editMode = !this.editMode;
    },
    save() {
      this.$emit("onSave", { ...this.rowData });
      this.toggleEditMode();
    },
    remove() {
      this.$emit("onRemove", this.rowData.id);
    },
  },
};
</script>
