<template>
  <BaseLayout @setFilter="setFilter">
    <BaseTable
      v-if="!isLoading"
      :columns="tableColumns"
      :data="tableData"
      isEditable
      @onSave="save"
      @onRemove="remove"
    />
  </BaseLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseTable } from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";
import UserService from "@/services/users";

export default {
  components: {
    BaseLayout,
    BaseTable,
  },
  data() {
    return {
      sidebarData: [],
      headerData: [],
      activeFilters: {},
      tableColumns: [],
      tableData: [],

      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  async created() {
    if (this.getUserInfo.user_group === "admin") {
      this.tableColumns = UserService.getColumns();
      this.tableData = await UserService.getUsers();
      this.isLoading = false;
    }
  },
  methods: {
    setFilter(value) {
      this.activeFilters = value;
    },
    async save(row) {
      if (this.tableData.some((item) => item.id === row.id) && row.id !== "?") {
        UserService.editUser(row);
      } else {
        UserService.addUser(row);
      }
    },
    async remove(id) {
      UserService.removeUser(id);
    },
  },
};
</script>
