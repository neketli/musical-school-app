<template>
  <div class="overflow-x-auto flex-auto relative bg-white shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th
            v-for="item in columns"
            :key="item.label"
            scope="col"
            class="py-3 px-6 min-w-[250px]"
          >
            <TableCell :data="item" @onSave="saveColumn" @onRemove="remove" />
          </th>
          <th v-if="isEditable" class="py-3 px-6 min-w-[100px]">
            <BaseButton class="text-green-400" @click="add">
              <i class="fa fa-plus" />
            </BaseButton>
          </th>
        </tr>
      </thead>
      <tbody v-for="row in dataSource" :key="row">
        <TableRow :rowData="row" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { BaseButton } from "@/components";
import TableRow from "./TableRow.vue";
import TableCell from "./TableCell.vue";

export default {
  components: { BaseButton, TableRow, TableCell },
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
    title: {
      type: String,
      default: "",
    },
  },
  emits: {
    onSave: null,
    onAdd: null,
    onRemove: null,
    onUndo: null,
    onColumnSave: null,
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
    saveColumn({ label, old }) {
      this.$emit("onColumnSave", { label, old });
    },
    add() {
      this.$emit("onAdd");
    },
    cancel() {
      this.dataSource.pop();
    },
    remove({ label }) {
      this.dataSource.forEach((item) => {
        if (item[label]) {
          delete item[label];
        }
      });
      this.$emit("onRemove", label);
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
