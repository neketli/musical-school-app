<template>
  <div class="flex items-center cursor-pointer p-2" @click.self="enterEditMode">
    <div v-if="!editMode">
      {{ dayjs(dataSource.label, "DD/MM/YYYY").format("DD.MM.YYYY") }}
    </div>
    <BaseDatePicker v-else v-model="dataSource.label" class="min-w-[200px]" />

    <div v-if="editMode" class="flex text-right justify-end">
      <template v-if="editMode">
        <BaseButton class="text-green-400 mx-2" @click="save">
          <Icon name="mdi:check" />
        </BaseButton>
        <BaseButton class="text-red-400" @click="cancel">
          <Icon name="mdi:close" />
        </BaseButton>
        <BaseButton class="text-red-400 mx-2" @click="remove">
          <Icon name="mdi:delete" />
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton class="mx-2">
          <Icon name="mdi:lead-pencil" />
        </BaseButton>
      </template>
    </div>
  </div>
</template>

<script>
import { BaseButton, BaseDatePicker } from "@/components";

export default {
  components: {
    BaseButton,
    BaseDatePicker,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    isEditable: {
      type: Boolean,
      required: true,
    },
  },
  emits: { onSave: null, onRemove: null, onCancel: null },
  data() {
    return {
      editMode: false,
      dataSource: {},
      oldData: {},
      dayjs: useDayjs(),
    };
  },
  mounted() {
    this.dataSource = { ...this.data };
    if (!this.dataSource.label) {
      this.editMode = true;
    }
  },
  methods: {
    enterEditMode() {
      if (this.editMode || !this.isEditable) return;
      this.editMode = true;
      this.oldData = { ...this.data };
    },
    toggleEditMode() {
      this.oldData = { ...this.data };
      this.editMode = !this.editMode;
    },
    save() {
      this.$emit("onSave", { ...this.dataSource, old: this.oldData });
      this.toggleEditMode();
    },
    cancel() {
      this.dataSource = { ...this.oldData };
      this.toggleEditMode();
      this.$emit("onCancel");
    },
    remove() {
      this.$emit("onRemove", this.dataSource);
    },
  },
};
</script>
