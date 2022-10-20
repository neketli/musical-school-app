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
            v-if="
              !column.value.includes('id') && column.value !== 'role_select'
            "
            :key="column.label"
            v-model="newItem[column.value]"
            :label="column.label"
          />
          <div
            v-if="column.value === 'id_departament'"
            :key="column.label"
            class="flex flex-col"
          >
            {{ column.label }}
            <vSelect
              :options="selectOptions"
              @option:selected="slectedDepartament"
            />
          </div>
          <div
            v-if="column.value === 'role_select'"
            :key="column.label"
            class="flex flex-col"
          >
            {{ column.label }}

            <vSelect
              v-model="newItem[column.value]"
              :reduce="(item) => item.label"
              :options="roles"
              @option:selected="selectedRole"
            />
          </div>
          <div
            v-if="column.value === 'rid'"
            :key="column.label"
            class="flex flex-col"
          >
            {{ column.label }}

            <vSelect
              v-model="newItem[column.value]"
              :options="selectOptions"
              @option:selected="selectedRid"
            />
          </div>
        </template>
      </div>
    </BaseModal>
  </BaseLayout>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
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
    readAccess: ["teacher"],
  },
  {
    value: "speciality",
    label: "Специальности",
    icon: "fa-graduation-cap",
    editAccess: ["admin", "director"],
    readAccess: ["teacher", "student"],
  },
  {
    value: "subjects",
    label: "Предметы",
    icon: "fa-bookmark-o",
    editAccess: ["admin", "director"],
    readAccess: ["teacher"],
  },
  {
    value: "groups",
    label: "Группы",
    icon: "fa-users",
    editAccess: ["admin", "director"],
    readAccess: ["teacher"],

    supLabel: "Списки учеников",
    subValue: "students_groups",
  },
  {
    value: "journals",
    label: "Журналы",
    icon: "fa-book",
    editAccess: [],
  },
  {
    value: "vedomosti",
    label: "Ведомости",
    icon: "fa-book",
    link: "/vedomosti",
    editAccess: ["admin", "director", "teacher"],
  },
  {
    value: "students",
    label: "Ученики",
    icon: "fa-user",
    editAccess: ["admin", "director"],
    readAccess: ["teacher"],
  },
  {
    value: "teachers",
    label: "Преподаватели",
    icon: "fa-user-o",
    editAccess: ["admin", "director"],
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
    vSelect,
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
      selectOptions: [],
      roles: [
        { label: "student" },
        { label: "teacher" },
        { label: "director" },
      ],

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
      if (row["id_departament_select"]) {
        await this.activeService.editData({
          ...row,
          id_departament: row.id_departament_select.split(" ")[0],
        });
      } else if (row["rid_select"]) {
        await this.activeService.editData({
          ...row,
          rid: row.rid_select.split(" ")[0],
          role: row.role_select.label,
        });
      } else {
        await this.activeService.editData(row);
      }
      await this.initActiveTable();
      this.isLoading = false;
    },

    async undo() {
      this.isLoading = true;
      await this.activeService.revertData();
      await this.initActiveTable();
      this.isLoading = false;
    },

    async showModal() {
      this.clearNewItem();
      if (
        this.tableColumns.filter((item) => item.value === "id_departament")
          .length
      ) {
        const data = await DepartamentsService.getData();
        this.selectOptions = data.map((item) => Object.values(item).join(" "));
      } else if (
        this.tableColumns.filter((item) => item.value === "role_select").length
      ) {
        const teachers = await TeachersService.getData();
        const students = await StudentsService.getData();
        this.selectOptions = [
          "- Список преподавателей -",
          ...teachers.map((item) => Object.values(item).join(" ")),
          "- Список учеников -",
          ...students.map((item) => Object.values(item).join(" ")),
        ];
      }
      this.isModalShow = true;
    },
    slectedDepartament(option) {
      this.newItem["id_departament"] = option.split(" ")[0];
    },
    selectedRid(option) {
      this.newItem["rid"] = option.split(" ")[0];
    },
    selectedRole(option) {
      this.newItem["role"] = option.label;
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

      await this.initActiveTable();

      this.isLoading = false;
      this.isModalShow = false;
    },

    async remove(id) {
      this.isLoading = true;
      await this.activeService.removeData(id);
      await this.initActiveTable();
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

      if (
        this.tableColumns.filter((item) => item.value === "id_departament")
          .length
      ) {
        const data = await DepartamentsService.getData();
        this.tableData = this.tableData.map((item) => {
          return {
            ...item,
            "id_departament_select-options": data.map((item) =>
              Object.values(item).join(" ")
            ),
          };
        });
      }

      if (
        this.tableColumns.filter((item) => item.value === "role_select").length
      ) {
        const teachers = await TeachersService.getData();
        const students = await StudentsService.getData();
        const selectOptions = [
          "- Список преподавателей -",
          ...teachers.map((item) => Object.values(item).join(" ")),
          "- Список учеников -",
          ...students.map((item) => Object.values(item).join(" ")),
        ];

        this.tableData = this.tableData.map((item) => {
          return {
            ...item,
            "rid_select-options": selectOptions,
            "role_select-options": this.roles,
          };
        });
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
    },
  },
};
</script>
