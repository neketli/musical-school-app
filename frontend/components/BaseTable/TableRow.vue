<template>
  <tr
    :class="{
      'overflow-x-auto bg-white border-b': true,
      'transition-all cursor-pointer hover:bg-gray-100 hover:ring-1 hover:ring-blue-300':
        isClickable,
    }"
  >
    <BaseModal
      v-model="editMode"
      @confirm="save"
      @cancel="cancel"
      @close="cancel"
    >
      <template #title> Редактировать </template>
      <div v-for="key in rowKeys" :key="key" class="flex flex-col">
        <td
          v-if="key === 'id' && includeId"
          :key="key"
          class="px-5 py-3 min-w-[100px]"
        >
          <span class="m-2 text-lg text-gray-500">{{ rowCols[key] }}</span>

          {{ row[key] }}
        </td>
        <td
          v-if="
            key !== 'id' && !key.includes('_select') && !key.includes('date')
          "
          :key="key"
          class="px-5 py-3 min-w-[100px]"
        >
          <span class="m-2 text-lg text-gray-500">{{ rowCols[key] }}</span>

          <BaseInput v-model="row[key]" />
        </td>
        <td
          v-if="key.includes('_select') && !key.includes('-options')"
          :key="key"
          class="px-5 py-3 min-w-[100px]"
        >
          <span class="m-2 text-lg text-gray-500">{{
            rowCols[getKey(key)]
          }}</span>
          <vSelect v-model="row[key]" :options="row[`${key}-options`]" />
        </td>
        <td
          v-if="key.includes('date')"
          :key="key"
          class="px-5 py-3 min-w-[200px]"
        >
          <span class="m-2 text-lg text-gray-500">{{ rowCols[key] }}</span>

          <BaseDatePicker v-model="row[key]" />
        </td>
      </div>
      <BaseButton
        v-if="!isButtonDisabled"
        class="flex gap-2 items-center justify-center w-full text-red-400 mt-2"
        @click="remove"
      >
        Удалить запись
        <Icon name="mdi:delete" />
      </BaseButton>
    </BaseModal>

    <template v-for="key in rowKeys" :key="key">
      <td
        v-if="
          (key !== 'id' || includeId) &&
          !key.includes('-options') &&
          !key.includes('_select') &&
          !key.includes('date')
        "
        class="px-5 py-3"
      >
        {{ row[key] }}
      </td>
      <td
        v-if="
          (key !== 'id' || includeId) &&
          key.includes('_select') &&
          !key.includes('-options')
        "
        class="px-5 py-3"
      >
        {{ row[key].label || row[key] }}
      </td>
      <td
        v-if="(key !== 'id' || includeId) && key.includes('date')"
        class="px-5 py-3"
      >
        {{ dayjs(row[key], "DD/MM/YYYY").format("DD.MM.YYYY") }}
      </td>
    </template>
    <!-- Edit mode buttons -->
    <div v-if="isEditable" class="flex gap-2 px-5 py-3 text-right justify-end">
      <BaseButton class="mx-2" @click="toggleEditMode">
        <Icon name="mdi:lead-pencil" />
      </BaseButton>
    </div>
  </tr>
</template>

<script>
import vSelect from "vue-select";

import { BaseModal, BaseButton, BaseInput, BaseDatePicker } from "@/components";

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseModal,
    BaseDatePicker,
    vSelect,
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    isClickable: {
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
      dayjs: useDayjs(),
    };
  },
  computed: {
    rowKeys() {
      return Object.keys(this.row);
    },
    rowCols() {
      return this.columns.reduce((acc, curr) => {
        acc[curr.value] = curr.label;
        return acc;
      }, {});
    },
    isButtonDisabled() {
      // return Object.values(this.row).some((item) => !item);
      return false;
    },
  },
  mounted() {
    this.row = { ...this.rowData };

    if (this.row.birthdate) {
      this.row.birthdate = this.dayjs(this.row.birthdate).format("DD/MM/YYYY");
    }
    if (Object.values(this.row).some((item) => !item)) {
      // this.toggleEditMode();
    }
  },
  methods: {
    getKey(key) {
      return key.split("_").slice(0, -1).join("_");
    },
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
