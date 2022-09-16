<template>
  <BaseLayout
    :sidebarData="sidebarData"
    @setFilter="setFilter"
    @setSubtab="setSubTab"
  >
    <div class="text-xl font-bold my-5 mx-3">
      {{ filter.label }}
    </div>

    <BaseTable
      v-if="!isLoading"
      :columns="tableColumns"
      :data="tableData"
      :isEditable="canEdit"
      @onSave="save"
      @onRemove="remove"
      @onAdd="showModal"
    />
    <BaseSkelet
      v-else
      :size="200"
    />

    <BaseModal
      v-if="isModalShow"
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
import { BaseTable, BaseModal, BaseInput, BaseSkelet } from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";
import {
  GroupsService,
  PlansService,
  StudentsService,
  SubjectsService,
  TeachersService,
  SGService,
  SPService,
  STService
} from "@/services";

export default {
  components: {
    BaseLayout,
    BaseTable,
    BaseModal,
    BaseInput,
    BaseSkelet,
  },
  data() {
    return {
      sidebarData: [],
      filter: {},

      activeService: {},

      service1: {},
      service2: {},

      tableColumns: [],
      tableData: [],
      newItem: {},

      isLoading: true,
      isModalShow: false,
      canEdit: false,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  async created() {
    this.sidebarData = [
      {
        value: "back",
        label: "Назад",
        icon: "fa-chevron-left",
      },
    ];
    await this.setService(this.$route.hash)
    await this.initActiveTable();
    this.isLoading = false;
  },
  methods: {
    async setFilter() {
      await this.$router.push(`/`);
    },

    async save(row) {
      this.isLoading = true;
      await this.activeService.editData(row);
      this.tableData = await this.activeService.getData();
      this.isLoading = false;
    },

    showModal() {
      this.clearNewItem();
      this.isModalShow = true;
    },

    async add() {
      if (Object.values(this.newItem).filter((item) => !item).length) {
        return;
      }
      this.isLoading = true;
      await this.activeService.addData(this.newItem);
      this.tableData = await this.activeService.getData();
      this.clearNewItem();
      this.isLoading = false;
      this.isModalShow = false;
    },

    async remove(id) {
      this.isLoading = true;
      await this.activeService.removeData(id);
      this.tableData = await this.activeService.getData();
      this.isLoading = false;
    },

    clearNewItem() {
      this.newItem = {};
      this.tableColumns.forEach((element) => {
        if (element.value !== "id") {
          this.newItem[element.value] = "";
        }
      });
    },

    cancel() {
      this.clearNewItem();
      this.isModalShow = false;
    },

    async initActiveTable() {
      this.isLoading = true;
      this.tableColumns = this.activeService.getColumns();
      this.tableData = await this.activeService.getData();

      this.clearNewItem();
      this.isLoading = false;
    },

    async setService(value) {
      if (value === "#subjects_plans") {
        this.activeService = SPService;
        this.service1 = SubjectsService;
        this.service2 = PlansService;
      }
      if (value === "#subjects_groups") {
        this.activeService = SGService;
        this.service1 = StudentsService;
        this.service2 = GroupsService;
      }
      if (value === "#subjects_teachers") {
        this.activeService = STService;
        this.service1 = SubjectsService;
        this.service2 = TeachersService;
      }
    },
  },
};
</script>
