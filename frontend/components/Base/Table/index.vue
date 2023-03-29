<template>
  <div
    class="overflow-x-auto flex-auto relative bg-white shadow-md sm:rounded-lg"
  >
    <div v-if="title" class="text-xl font-bold my-5 mx-3">
      {{ title }}
    </div>
    <table class="overflow-x-auto w-full text-sm text-left text-gray-500">
      <thead class="overflow-x-auto text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th
            v-for="item in columns"
            :key="item"
            scope="col"
            class="py-3 px-6 min-w-[100px]"
          >
            {{ item.label }}
          </th>
          <th v-if="isEditable" scope="col" class="py-3 px-6 text-right" />
        </tr>
      </thead>
      <tbody>
        <template
          v-for="row in dataSource"
          :key="row.stamp ? row.stamp : row.id"
        >
          <TableRow
            :isEditable="isEditable"
            :rowData="row"
            :includeId="includeId"
            @onSave="save"
            @onCancel="cancel"
            @onRemove="remove"
            @click="rowClicked(row)"
          />
        </template>
      </tbody>
    </table>

    <div
      v-if="isEditable || isPagination"
      class="flex justify-between px-5 py-3"
    >
      <div v-if="isEditable" class="flex gap-3">
        <Button class="text-green-400" @click="add">
          <i class="fa fa-plus" />
        </Button>

        <Button class="text-yellow-400" @click="undo">
          <i class="fa fa-undo" />
        </Button>
      </div>

      <div v-if="isPagination" class="flex justify-center items-center gap-3">
        <Button class="text-black" @click="prev">
          <i class="fa fa-angle-left" />
        </Button>
        <div class="flex text-gray-500">
          {{ currentPage }} / {{ totalPages }}
        </div>
        <Button class="text-black" @click="next">
          <i class="fa fa-angle-right" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import TableRow from "./TableRow.vue";

export default {
  components: { Button, TableRow },
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
    includeId: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    paginationLimit: {
      type: Number,
      default: 6,
    },
  },
  emits: {
    onSave: null,
    onRowClicked: null,
    onAdd: null,
    onRemove: null,
    onUndo: null,
  },
  data() {
    return {
      dataSource: [],
      currentPage: 1,
      totalPages: 1,
      currStart: 0,
    };
  },
  computed: {
    isPagination() {
      return this.data.length > this.paginationLimit;
    },
  },
  created() {
    if (this.isPagination) {
      this.initPagination();
    } else {
      this.dataSource = this.data;
    }
  },
  methods: {
    save(row) {
      this.$emit("onSave", row);
    },
    add() {
      this.$emit("onAdd");
    },
    cancel() {
      this.dataSource.pop();
    },
    remove(id) {
      this.$emit("onRemove", id);
      this.dataSource = this.dataSource.filter((item) => item.id != id);
    },
    rowClicked(row) {
      this.$emit("onRowClicked", row);
    },
    undo() {
      this.$emit("onUndo");
    },
    initPagination() {
      this.totalPages = Math.ceil(this.data.length / this.paginationLimit);
      this.dataSource = this.data.slice(0, this.paginationLimit);
    },
    async next() {
      if (this.currentPage === this.totalPages) return;

      this.currStart += this.paginationLimit;
      this.dataSource = this.data.slice(
        this.currStart,
        this.currStart + this.paginationLimit
      );
      this.currentPage += 1;
    },
    async prev() {
      if (this.currentPage === 1) return;
      this.currStart -= this.paginationLimit;

      this.dataSource = this.data.slice(
        this.currStart,
        this.currStart + this.paginationLimit
      );
      this.currentPage -= 1;
    },
  },
};
</script>
