<template>
  <tr class="overflow-x-auto bg-white border-b hover:bg-gray-50">
    <template v-if="editMode">
      <td v-for="key in rowKeys" :key="key" class="px-5 py-3 min-w-[100px]">
        <BaseInput v-if="key !== 'id'" :key="key" v-model="row[key]" />
        <template v-else>
          {{ row[key] }}
        </template>
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
        <BaseButton class="text-green-400 mx-2" @click="save">
          <i class="fa fa-check" />
        </BaseButton>
        <BaseButton class="text-red-400 mx-2" @click="cancel">
          <i class="fa fa-times" />
        </BaseButton>
        <BaseButton
          v-if="!isButtonDisabled"
          class="text-red-400 mx-2"
          @click="remove"
        >
          <i class="fa fa-trash-o" />
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton class="mx-2" @click="toggleEditMode">
          <i class="fa fa-pencil" />
        </BaseButton>
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
      return Object.keys(this.row);
    },
    isButtonDisabled() {
      // return Object.values(this.row).some((item) => !item);
      return false;
    },
  },
  created() {
    this.row = { ...this.rowData };
    if (Object.values(this.row).some((item) => !item)) {
      // this.toggleEditMode();
    }
  },
  methods: {
    toggleEditMode() {
      this.oldRow = { ...this.row };
      this.editMode = !this.editMode;
    },
    save() {
      if (this.isButtonDisabled) return;
      this.$emit("onSave", { ...this.row });
      this.toggleEditMode();
    },
    cancel() {
      if (this.isButtonDisabled) {
        this.$emit("onCancel");
      }
      this.row = { ...this.oldRow };
      this.toggleEditMode();
    },
    remove() {
      this.$emit("onRemove", this.row.id);
    },
  },
};
</script>
