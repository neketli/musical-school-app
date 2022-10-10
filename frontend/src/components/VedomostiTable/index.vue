<template>
  <div class="overflow-x-auto relative bg-white shadow-md sm:rounded-lg">
    <table class="overflow-x-auto w-full text-sm text-left text-gray-500">
      <thead class="overflow-x-auto text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th class="py-3 px-6 min-w-[100px]">Ученик</th>
          <th
            v-for="item in columns"
            :key="item"
            scope="col"
            class="py-3 px-6 min-w-[100px]"
          >
            {{ item.label }}
          </th>
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
            @onSave="save"
            @onCancel="cancel"
            @onRemove="remove"
          />
        </template>
      </tbody>
    </table>

    <div v-if="isPagination" class="flex justify-between px-5 py-3">
      <div v-if="isPagination" class="flex justify-center items-center gap-3">
        <BaseButton class="text-black" @click="prev">
          <i class="fa fa-angle-left" />
        </BaseButton>
        <div class="flex text-gray-500">
          {{ currentPage }} / {{ totalPages }}
        </div>
        <BaseButton class="text-black" @click="next">
          <i class="fa fa-angle-right" />
        </BaseButton>
      </div>
    </div>
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
    title: {
      type: String,
      default: "",
    },
    paginationLimit: {
      type: Number,
      default: 6,
    },
  },
  emits: { onSave: null, onAdd: null, onRemove: null, onUndo: null },
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
