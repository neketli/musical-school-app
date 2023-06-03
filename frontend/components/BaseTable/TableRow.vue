<template>
  <tr
    :class="{
      'overflow-x-auto bg-white border-b': true,
      'transition-all cursor-pointer hover:bg-gray-100 hover:ring-1 hover:ring-blue-300':
        isClickable,
    }"
  >
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
          v-if="
            key !== 'id' && !key.includes('_select') && !key.includes('date')
          "
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
        <td
          v-if="key.includes('date')"
          :key="key"
          class="px-5 py-3 min-w-[200px]"
        >
          <BaseDatePicker v-model="row[key]" />
        </td>
      </template>
    </template>

    <template v-else>
      <template v-for="key in rowKeys" :key="key">
        <td
          v-if="
            (key !== 'id' || includeId) &&
            !key.includes('-options') &&
            !key.includes('date')
          "
          class="px-5 py-3"
        >
          {{ row[key] }}
        </td>
        <td
          v-if="(key !== 'id' || includeId) && key.includes('date')"
          class="px-5 py-3"
        >
          {{ dayjs(row[key], "DD/MM/YYYY").format("DD.MM.YYYY") }}
        </td>
      </template>
    </template>
    <!-- Edit mode buttons -->
    <div v-if="isEditable" class="flex gap-2 px-5 py-3 text-right justify-end">
      <template v-if="editMode">
        <BaseButton class="text-green-400 mx-2" @click="save">
          <Icon name="mdi:check" />
        </BaseButton>
        <BaseButton class="text-red-400 mx-2" @click="cancel">
          <Icon name="mdi:close" />
        </BaseButton>
        <BaseButton
          v-if="!isButtonDisabled"
          class="text-red-400 mx-2"
          @click="remove"
        >
          <Icon name="mdi:delete" />
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton class="mx-2" @click="toggleEditMode">
          <Icon name="mdi:lead-pencil" />
        </BaseButton>
      </template>
    </div>
  </tr>
</template>

<script>
import vSelect from "vue-select";

import { BaseButton, BaseInput, BaseDatePicker } from "@/components";

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseDatePicker,
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
