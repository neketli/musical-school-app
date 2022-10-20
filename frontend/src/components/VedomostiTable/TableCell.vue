<template>
  <div class="flex items-center" @click.self="enterEditMode">
    <div v-if="!editMode || !isEditable">
      {{ dataSource.label }}
    </div>

    <BaseInput
      v-else
      v-model="dataSource.label"
      placeholder="dd.mm.year"
      class="min-w-[150px]"
      @keyup.enter="save"
    />
    <div v-if="editMode" class="flex text-right justify-end">
      <template v-if="editMode">
        <BaseButton class="text-green-400 mx-2" @click="save">
          <i class="fa fa-check" />
        </BaseButton>
        <BaseButton class="text-red-400 mx-2" @click="cancel">
          <i class="fa fa-times" />
        </BaseButton>
        <BaseButton class="text-red-400 mx-2" @click="remove">
          <i class="fa fa-trash-o" />
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton class="mx-2">
          <i class="fa fa-pencil" />
        </BaseButton>
      </template>
    </div>
  </div>
</template>

<script>
import { BaseButton, BaseInput } from "@/components";
export default {
  components: {
    BaseButton,
    BaseInput,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  emits: { onSave: null, onRemove: null, onCancel: null },
  data() {
    return {
      editMode: false,
      dataSource: {},
      oldData: {},
    };
  },
  created() {
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
