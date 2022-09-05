<template>
  <tr
    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
  >
    <template v-if="editMode">
      <td v-for="key in rowKeys" :key="key" class="px-5 py-3">
        <BaseInput :key="key" v-model="row[key]" />
      </td>
    </template>
    <template v-else>
      <td v-for="key in rowKeys" :key="key" class="px-5 py-3">
        {{ row[key] }}
      </td>
    </template>
    <!-- Edit mode buttons -->
    <div v-if="isEditable" class="flex gap-5 px-5 py-3 text-right justify-end">
      <template v-if="editMode">
        <BaseButton @click="save" class="text-green-400 mx-2"
          ><i class="fa fa-check"
        /></BaseButton>
        <BaseButton @click="cancel" class="text-red-400 mx-2"
          ><i class="fa fa-times"
        /></BaseButton>
      </template>
      <template v-else>
        <BaseButton @click="toggleEditMode" class="mx-2"
          ><i class="fa fa-pencil"
        /></BaseButton>
      </template>
    </div>
  </tr>
</template>

<script>
import { BaseButton, BaseInput } from "@/components";
export default {
  components: {
    BaseButton,
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
  emits: { onSave: null },
  data() {
    return {
      editMode: false,
      row: {},
      oldRow: {},
    };
  },
  computed: {
    rowKeys() {
      return Object.keys(this.row);
    },
  },
  created() {
    this.row = this.rowData;
  },
  methods: {
    toggleEditMode() {
      this.oldRow = { ...this.row };
      this.editMode = !this.editMode;
    },
    save() {
      this.toggleEditMode();
      this.$emit("onSave", this.row);
    },
    cancel() {
      this.row = this.oldRow;
      this.toggleEditMode();
    },
  },
};
</script>
