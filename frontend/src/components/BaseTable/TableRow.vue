<template>
  <tr class="overflow-x-auto bg-white border-b hover:bg-gray-50">
    <template v-if="editMode">
      <template v-for="key in rowKeys">
        <td
          v-if="key === 'id' && includeId"
          :key="key"
          class="px-5 py-3 min-w-[100px]"
        >
          {{ row[key] }}
        </td>
        <td
          v-if="key !== 'id' && !key.includes('_select')"
          :key="key"
          class="px-5 py-3 min-w-[100px]"
        >
          <BaseInput v-model="row[key]" />
        </td>
        <td
          v-if="key.includes('_select') && !key.includes('-options')"
          :key="key"
          class="px-5 py-3 min-w-[100px]"
        >
          <vSelect v-model="row[key]" :options="row[`${key}-options`]" />
        </td>
      </template>
    </template>

    <template v-else>
      <template v-for="key in rowKeys" :key="key">
        <td
          v-if="(key !== 'id' || includeId) && !key.includes('-options')"
          class="px-5 py-3"
        >
          {{ row[key] }}
        </td>
      </template>
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    BaseButton,
    BaseInput,
    vSelect,
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
    includeId: {
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
