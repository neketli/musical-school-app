<template>
  <BaseLayout @setFilter="setFilter">
    <BaseTable
      v-if="!isLoading"
      :columns="tableColumns"
      :data="tableData"
      isEditable
      @onSave="save"
      @onRemove="remove"
      @onAdd="showModal"
    />

    <BaseModal
      v-model="isModalShow"
      @confirm="add"
      @cancel="cancel"
    >
      <template #title>
        Добавить
      </template>

      <div class="flex flex-col gap-4">
        <template v-for="column in tableColumns">
          <BaseInput
            v-if="column.value !== 'id'"
            :key="column.label"
            v-model="newItem[column.value]"
            :label="column.label"
          />
        </template>
      </div>
    </BaseModal>
  </BaseLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseTable, BaseModal, BaseInput } from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";
import UserService from "@/services/users";

export default {
  components: {
    BaseLayout,
    BaseTable,
    BaseModal,
    BaseInput,
  },
  data() {
    return {
      sidebarData: [],
      headerData: [],
      activeFilters: {},
      tableColumns: [],
      tableData: [],
      newItem: {},

      isLoading: true,
      isModalShow: false,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  async created() {
    if (this.getUserInfo.user_group === "admin") {
      this.tableColumns = UserService.getColumns();
      this.tableData = await UserService.getUsers();
      this.clearnewItem();
      this.isLoading = false;
    }
  },
  methods: {
    setFilter(value) {
      this.activeFilters = value;
    },
    async save(row) {
      this.isLoading = true;
      await UserService.editUser(row);
      this.tableData = await UserService.getUsers();
      this.isLoading = false;
    },
    showModal() {
      this.isModalShow = true;
    },
    async add() {
      if (Object.values(this.newItem).filter(item => !item).length) {
        return
      }
      this.isLoading = true;
      await UserService.addUser(this.newItem);
      this.tableData = await UserService.getUsers();
      this.clearnewItem();
      this.isLoading = false;
      this.isModalShow = false;
    },
    async remove(id) {
      await UserService.removeUser(id);
      this.tableData = await UserService.getUsers();
    },
    clearnewItem() {
      this.tableColumns.forEach(element => {
        if (element.value !== 'id') {
          this.newItem[element.value] = "" 
        }
      });
    },
    cancel() {
      this.clearnewItem();
      this.isModalShow = false;
    }
  },
};
</script>
