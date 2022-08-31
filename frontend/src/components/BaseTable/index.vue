<template>
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th v-for="item in columns" :key="item" scope="col" class="py-3 px-6">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in data" :key="row.id">
          <TableRow :isEditable="isEditable" :rowData="row" @onSave="save" />
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import TableRow from "./TableRow.vue";

export default {
  components: { TableRow },
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
  emits: { onSave: null },
  methods: {
    save(row) {
      this.$emit("onSave", row);
    },
  },
};
</script>
