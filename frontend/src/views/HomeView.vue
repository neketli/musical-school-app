<template>
  <BaseLayout
    :sidebarData="sidebarData"
    :headerData="headerData"
    @setFilter="setFilter"
    @setSubTab="setSubTab"
  >
    <div class="text-xl font-bold my-5 mx-3">
      {{ activeService.label }}
    </div>

    <BaseTable
      v-if="!isLoading"
      :columns="tableColumns"
      :data="tableData"
      :isEditable="canEdit"
      @onSave="save"
      @onRemove="remove"
      @onAdd="showModal"
      @onUndo="undo"
    />
    <BaseSkelet v-else :size="200" />

    <BaseModal v-model="isModalShow" @confirm="add" @cancel="cancel">
      <template #title> Добавить </template>

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
  DepartamentsService,
  GroupsService,
  JournalsService,
  VedomostiService,
  SpecialityService,
  StudentsService,
  SubjectsService,
  TeachersService,
  TSService,
  UsersService,
  GroupStudentService,
  StudentJournalService,
} from "@/services";

const TABLES = [
  // Students
  {
    value: "student_journal",
    label: "Мои оценки",
    icon: "fa-book",
    readAccess: ["student"],
  },

  {
    value: "users",
    label: "Пользователи",
    icon: "fa-user-circle-o",
    editAccess: ["admin"],
  },
  {
    value: "departaments",
    label: "Отделения",
    icon: "fa-archive",
    editAccess: ["admin", "director"],
    readAccess: ["teacher", "head_teacher"],
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
    readAccess: ["teacher"],
  },
  {
    value: "groups",
    label: "Группы",
    icon: "fa-users",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher"],

    supLabel: "Списки учеников",
    subValue: "students_groups",
  },
  {
    value: "journals",
    label: "Журналы",
    icon: "fa-book",
    editAccess: ["admin", "director", "head_teacher"],
  },
  {
    value: "vedomosti",
    label: "Ведомости",
    icon: "fa-book",
    link: "/vedomosti",
    editAccess: ["teacher"],
  },
  {
    value: "students",
    label: "Ученики",
    icon: "fa-user",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: ["teacher"],
  },
  {
    value: "teachers",
    label: "Преподаватели",
    icon: "fa-user-o",
    editAccess: ["admin", "director", "head_teacher"],
    readAccess: [],

    supLabel: "Ответсвенные",
    subValue: "subjects_teachers",
  },
  {
    value: "teachers",
    label: "Преподаватели",
    icon: "fa-user-o",
    editAccess: [],
    readAccess: ["teacher", "student"],
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
      headerData: [],
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
    this.headerData =
      this.getUserInfo.role === "admin"
        ? [
            {
              value: "/",
              label: "Школа",
            },
            {
              value: "/backup",
              label: "Резервные копии",
            },
          ]
        : [];
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

    async undo() {
      this.isLoading = true;
      await this.activeService.revertData();
      this.tableData = await this.activeService.getData();
      this.isLoading = false;
    },

    showModal() {
      this.clearNewItem();
      this.isModalShow = true;
    },

    async add() {
      if (
        !Object.keys(this.newItem).includes("rid") &&
        Object.values(this.newItem).filter((item) => !item).length
      ) {
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
      if (this.getUserInfo.role === "student") {
        await this.activeService.updateData(this.getUserInfo.rid);
        this.tableData = await this.activeService.getData(this.getUserInfo.rid);
      } else {
        await this.activeService.updateData();

        this.tableData = await this.activeService.getData();
      }

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
      if (value === "vedomosti") {
        this.activeService = VedomostiService;
        this.canEdit = true;
      }
      if (value === "students") {
        this.activeService = StudentsService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "students")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "teachers") {
        this.activeService = ["student", "teacher"].includes(
          this.getUserInfo.role
        )
          ? TSService
          : TeachersService;

        this.canEdit = this.sidebarData
          .filter((item) => item.value === "teachers")[0]
          .editAccess.includes(this.getUserInfo.role);
      }
      if (value === "student_group") {
        this.activeService = GroupStudentService;
      }
      if (value === "student_journal") {
        this.activeService = StudentJournalService;
      }
    },
  },
};
</script>
