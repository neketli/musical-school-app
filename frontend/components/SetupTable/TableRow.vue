<template>
  <tr class="overflow-x-auto bg-white border-b hover:bg-gray-50">
    <template v-if="editMode">
      <td class="px-5 py-3 min-w-[100px]">
        <vSelect
          v-model="row[firstField]"
          class="min-w-[25%]"
          :options="row.firstSelect"
        />
      </td>

      <td class="px-5 py-3 min-w-[100px]">
        <vSelect
          v-model="row[secondField]"
          class="min-w-[25%]"
          :options="row.secondSelect"
        />
      </td>
    </template>

    <template v-else>
      <td class="px-5 py-3">
        {{ row[firstField] }}
      </td>
      <td class="px-5 py-3">
        {{ row[secondField] }}
      </td>
    </template>
    <!-- Edit mode buttons -->
    <div v-if="isEditable" class="flex gap-5 px-5 py-3 text-right justify-end">
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
import { BaseButton } from "@/components";
export default {
  components: {
    BaseButton,
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
    firstField: {
      type: String,
      required: true,
    },
    secondField: {
      type: String,
      required: true,
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
  mounted() {
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
