<template>
  <BaseLayout
    :sidebarData="sidebarData"
    :headerData="headerData"
    @setFilter="setFilter"
  >
    <h2 class="text-xl font-bold my-5 mx-3">
      {{ activeService.label }}
    </h2>

    <BaseTable
      v-if="!isLoading"
      :columns="tableColumns"
      :data="tableData"
      :isEditable="canUserEdit"
      @onSave="save"
      @onRemove="remove"
      @onAdd="showModal"
    />
    <BaseSkelet v-else :size="200" />

    <div class="flex mt-10 gap-10">
      <BaseTable
        v-if="!isLoading"
        :columns="service1.getColumns()"
        :data="service1.data || []"
        :title="service1.label"
      />
      <BaseSkelet v-else :size="200" />

      <BaseTable
        v-if="!isLoading"
        :columns="service2.getColumns()"
        :data="service2.data || []"
        :title="service2.label"
      />
      <BaseSkelet v-else :size="200" />
    </div>

    <BaseModal
      v-if="isModalShow"
      v-model="isModalShow"
      @confirm="add"
      @cancel="cancel"
    >
      <template #title> Добавить </template>

      <div class="flex flex-col gap-4">
        <!-- 1 sevice -->
        <span class="text-gray-500">{{ service1.label }}</span>
        <vSelect
          v-model="newItem[tableColumns[1]?.value]"
          :options="firstSelect"
        />
        <!-- 2 sevice -->
        <span class="text-gray-500">{{ service2.label }}</span>
        <vSelect
          v-model="newItem[tableColumns[2]?.value]"
          :options="secondSelect"
        />
      </div>
    </BaseModal>
  </BaseLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseTable, BaseModal, BaseSkelet } from "@/components";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import BaseLayout from "@/layouts/BaseLayout.vue";
import {
  GroupsService,
  PlansService,
  StudentsService,
  SubjectsService,
  TeachersService,
  SGService,
  SPService,
  STService,
} from "@/services";

export default {
  components: {
    BaseLayout,
    BaseTable,
    BaseModal,
    BaseSkelet,
    vSelect,
  },
  data() {
    return {
      headerData: [
        {
          value: "/",
          label: "Школа",
        },
        {
          value: "/backup",
          label: "Резервные копии",
        },
      ],
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
    firstSelect() {
      return this.service1.data.map((item) => Object.values(item).join(" "));
    },
    secondSelect() {
      return this.service2.data.map((item) => Object.values(item).join(" "));
    },
    canUserEdit() {
      return !["student", "teacher"].includes(this.getUserInfo.role);
    },
  },
  async created() {
    if (this.getUserInfo.role === "student") {
      await this.$router.push(`/`);
    }
    this.sidebarData = [
      {
        value: "back",
        label: "Назад",
        icon: "fa-chevron-left",
      },
    ];
    await this.setService(this.$route.hash);
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
      const item = Object.fromEntries(
        Object.entries(this.newItem).map((item) => [
          item[0],
          item[1].split(" ")[0],
        ])
      );
      this.isLoading = true;
      await this.activeService.addData(item);
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

      await this.service1.getData();
      await this.service2.getData();

      this.clearNewItem();
      this.isLoading = false;
    },

    async setService(value) {
      if (value === "#subjects_plans") {
        this.activeService = SPService;
        this.service1 = SubjectsService;
        this.service2 = PlansService;
      }
      if (value === "#students_groups") {
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
