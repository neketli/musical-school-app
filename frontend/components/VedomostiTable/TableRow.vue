<!-- eslint-disable vue/no-mutating-props -->
<template>
  <tr class="bg-white border-b hover:bg-gray-50">
    <template v-for="key in rowKeys" :key="key">
      <td v-if="key !== 'id'" class="px-6 py-3">
        <BaseInput
          v-if="isEditable"
          :key="key"
          v-model="rowData[key]"
          :class="getClassByKey(rowData[key])"
          type="number"
        />
        <div v-else :class="getClassByKey(rowData[key])">
          {{ rowData[key] }}
        </div>
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
      return Object.keys(this.rowData).filter(
        (item) => item !== "name" && !item.includes("-id_journal")
      );
    },
  },
  methods: {
    getClassByKey(key) {
      switch (+key) {
        case 5:
          return `text-green-700 border-green-700 border-2 rounded-md`;
        case 4:
          return `text-green-400 border-green-400 border-2 rounded-md`;
        case 3:
          return `text-orange-400 border-orange-400 border-2 rounded-md`;
        case 2:
          return `text-red-500  border-red-400 border-2 rounded-md`;
        default:
          return `text-black`;
      }
    },
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
