<template>
  <div class="overflow-x-auto relative bg-white shadow-md sm:rounded-lg">
    <table class="overflow-x-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="overflow-x-auto text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            v-for="item in columns"
            :key="item"
            scope="col"
            class="py-3 px-6 min-w-[100px]"
          >
            {{ item.label }}
          </th>
          <th
            v-if="isEditable"
            scope="col"
            class="py-3 px-6 text-right"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="row in dataSource"
          :key="row.id"
        >
          <TableRow
            :isEditable="isEditable"
            :rowData="row"
            @onSave="save"
            @onCancel="cancel"
            @onRemove="remove"
          />
        </template>
        <BaseButton
          class="text-green-400 mx-5 my-3"
          @click="add"
        >
          <i class="fa fa-plus" />
        </BaseButton>
      </tbody>
    </table>
  </div>
</template>

<script>
import { BaseButton } from "@/components";
import TableRow from "./TableRow.vue";

export default {
  components: { BaseButton, TableRow },
  props: {
    data: {
      type: Array,
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
  },
  emits: { onSave: null, onAdd: null, 'onRemove': null },
  data() {
    return {
      dataSource: [],
    };
  },
  created() {
    this.dataSource = this.data;
  },
  methods: {
    save(row) {
      this.$emit("onSave", row);
    },
    add() {
      this.$emit('onAdd');
    },
    cancel() {
      this.dataSource.pop();
    },
    remove(id) {
      this.$emit('onRemove', id);
      this.dataSource = this.dataSource.filter(item => item.id != id);
    }
  },
};
</script>
