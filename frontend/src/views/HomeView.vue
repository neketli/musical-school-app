<template>
  <BaseLayout
    :sidebarData="sidebarData"
    @setFilter="setFilter"
    @setSubTab="setSubTab"
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
  ClassroomsService,
  DepartamentsService,
  GroupsService,
  JournalsService,
  PlansService,
  SpecialityService,
  StudentsService,
  SubjectsService,
  TeachersService,
  UsersService,
} from "@/services";

const TABLES = [
  {
    value: "users",
    label: "Пользователи",
    icon: "fa-user-circle-o",
    editAccess: ["admin"],
  },
  {
    value: "departaments",
    label: "Отделы",
    icon: "fa-archive",
    editAccess: ["admin", "director"],
    readAccess: ["teacher", "student", "head_teacher"],
  },
  {
    value: "speciality",
    label: "Специальности",
    icon: "fa-graduation-cap",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher", "student"],
  },
  {
    value: "subjects",
    label: "Предметы",
    icon: "fa-bookmark-o",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher", "student"],

    supLabel: "Указать планы",
    subValue: "subjects_plans",
  },
  {
    value: "classrooms",
    label: "Кабинеты",
    icon: "fa-key",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher", "student"],
  },
  {
    value: "groups",
    label: "Группы",
    icon: "fa-users",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher", "student"],
    
    supLabel: 'Указать учеников',
    subValue: 'students_groups',
  },
  {
    value: "journals",
    label: "Журналы",
    icon: "fa-book",
    editAccess: ["admin", "director", "head_teacher", "teacher"],
  },
  {
    value: "plans",
    label: "Планы",
    icon: "fa-columns",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher"],
  },
  {
    value: "students",
    label: "Ученики",
    icon: "fa-user",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher", "student"],
  },
  {
    value: "teachers",
    label: "Преподаватели",
    icon: "fa-user-o",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher", "student"],

    supLabel: 'Указать предметы',
    subValue: 'subjects_teachers',
  },
];

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
    this.sidebarData = TABLES.filter(
      (item) =>
        item?.editAccess?.includes(this.getUserInfo.role) ||
        item?.readAccess?.includes(this.getUserInfo.role)
    );
    this.setFilter(this.sidebarData[0]);
    await this.initActiveTable();
    this.isLoading = false;
  },
  methods: {
    async setFilter(value) {
      this.filter = value;
      this.setService(value.value);
      await this.initActiveTable();
      this.clearNewItem();
    },

    async setSubTab(value) {
      await this.$router.push(`/setup#${value.subValue}`);
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

    setService(value) {
      if (value === "users") {
        this.activeService = UsersService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "users")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "departaments") {
        this.activeService = DepartamentsService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "departaments")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "speciality") {
        this.activeService = SpecialityService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "speciality")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "subjects") {
        this.activeService = SubjectsService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "subjects")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "classrooms") {
        this.activeService = ClassroomsService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "classrooms")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "groups") {
        this.activeService = GroupsService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "groups")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "journals") {
        this.activeService = JournalsService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "journals")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "plans") {
        this.activeService = PlansService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "plans")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "students") {
        this.activeService = StudentsService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "students")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "teachers") {
        this.activeService = TeachersService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "teachers")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
    },
  },
};
</script>
