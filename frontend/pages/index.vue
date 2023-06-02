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
      :includeId="activeService.label === 'Группы'"
      @onSave="save"
      @onRemove="remove"
      @onAdd="showModal"
      @onUndo="undo"
    />
    <BaseSkelet v-else :size="200" />
    <ModalsContainer />
    <template v-if="canEdit && isModalShow">
      <BaseModal v-model="isModalShow" @confirm="add" @cancel="cancel">
        <template #title> Добавить </template>

        <div class="flex flex-col gap-4">
          <template v-for="column in tableColumns">
            <BaseInput
              v-if="column.type === 'input'"
              :key="column.label"
              v-model="newItem[column.value]"
              :label="column.label"
            />
            <div
              v-if="column.type === 'select'"
              :key="column.label"
              class="flex flex-col text-gray-600 gap-2"
            >
              {{ column.label }}
              <vSelect
                :options="column.selectOptions || selectOptions"
                @option:selected="selectCallback"
              />
            </div>
            <div
              v-if="column.type === 'date'"
              :key="column.label"
              class="flex flex-col text-gray-600 gap-2"
            >
              {{ column.label }}
              <VueDatePicker
                v-model="newItem[column.value]"
                :enableTimePicker="false"
                locale="ru"
              />
            </div>
          </template>
        </div>
      </BaseModal>
    </template>
  </BaseLayout>
</template>

<script>
import vSelect from "vue-select";
import VueDatePicker from "@vuepic/vue-datepicker";

import { mapState } from "pinia";
import { useUserStore } from "~/stores/user";
import { BaseTable, BaseModal, BaseInput, BaseSkelet } from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";
import {
  UsersService,
  TeachersService,
  DefaultServiceFactory,
} from "@/services";

import { DefaultServiceType } from "@/services/tables";

import { TABLES } from "@/helpers/tables";

export default {
  components: {
    BaseLayout,
    BaseTable,
    BaseModal,
    BaseInput,
    BaseSkelet,
    vSelect,
    VueDatePicker,
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

      isLoading: true,
      isModalShow: false,
      canEdit: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },
  async mounted() {
    this.sidebarData = TABLES.filter(
      (item) =>
        item?.editAccess?.includes(this.getUserInfo.role) ||
        item?.readAccess?.includes(this.getUserInfo.role)
    );

    if (this.getUserInfo.role === "admin") {
      this.headerData = [
        {
          value: "/",
          label: "Школа",
        },
        {
          value: "/backup",
          label: "Резервные копии",
        },
      ];
    }

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
      if (row.id_departament_select) {
        await this.activeService.update({
          ...row,
          id_departament: row.id_departament_select.id,
        });
      } else if (row.id_speciality_select) {
        await this.activeService.update({
          ...row,
          id_speciality: row.id_speciality_select.id,
        });
      } else if (row.rid_select) {
        await this.activeService.update({
          ...row,
          rid: row.rid_select.id,
          role: row.role_select?.value || row.role_select,
        });
      } else {
        await this.activeService.update(row);
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
      if (this.tableColumns.find((item) => item.value === "id_departament")) {
        const DepartamentsService = DefaultServiceFactory(
          this.$api,
          DefaultServiceType.departaments
        );
        const data = await DepartamentsService.getData();
        this.selectOptions = data.map((item) => ({
          id: item.id,
          label: item.title,
          key: "id_departament",
        }));
      }

      if (this.tableColumns.find((item) => item.value === "id_speciality")) {
        const SpecialityService = DefaultServiceFactory(
          this.$api,
          DefaultServiceType.speciality
        );
        const data = await SpecialityService.getData();
        this.selectOptions = data.map((item) =>
          Object.values(item).slice(0, 2).join(" ")
        );
      }

      if (this.tableColumns.find((item) => item.value === "role_select")) {
        const TeachersService = DefaultServiceFactory(
          this.$api,
          DefaultServiceType.teachers
        );
        const StudentsService = DefaultServiceFactory(
          this.$api,
          DefaultServiceType.students
        );
        const teachers = await TeachersService.getData();
        const students = await StudentsService.getData();
        this.selectOptions = [
          "- Список преподавателей -",
          ...teachers.map((item) => ({
            label: `${item.last_name} ${item.first_name} ${item.patronymic} ${item.birthdate}`,
            id: item.id,
            key: "rid",
          })),
          "- Список учеников -",
          ...students.map((item) => ({
            label: `${item.last_name} ${item.first_name} ${item.patronymic} ${item.birthdate}`,
            id: item.id,
            key: "rid",
          })),
        ];
      }

      this.isModalShow = true;
    },

    selectCallback({ key, id, value }) {
      this.newItem[key] = id || value;
    },

    async add() {
      if (
        !Object.keys(this.newItem).includes("rid") &&
        Object.values(this.newItem).filter((item) => !item).length
      ) {
        return;
      }
      this.isLoading = true;
      await this.activeService.create(this.newItem);

      await this.initActiveTable();

      this.isLoading = false;
      this.isModalShow = false;
    },

    async remove(id) {
      this.isLoading = true;
      await this.activeService.remove(id);
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
      this.tableColumns = this.activeService.columns;
      if (this.getUserInfo.role === "student") {
        await this.activeService.fetch(this.getUserInfo.rid);
        this.tableData = await this.activeService.getData(this.getUserInfo.rid);
      } else {
        await this.activeService.fetch();
        this.tableData = await this.activeService.getData();
      }

      if (this.tableColumns.find((item) => item.value === "id_departament")) {
        const DepartamentsService = DefaultServiceFactory(
          this.$api,
          DefaultServiceType.departaments
        );
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

      if (this.tableColumns.find((item) => item.value === "id_speciality")) {
        const SpecialityService = DefaultServiceFactory(
          this.$api,
          DefaultServiceType.speciality
        );
        const data = await SpecialityService.getData();
        this.tableData = this.tableData.map((item) => {
          return {
            ...item,
            "id_speciality_select-options": data.map((item) =>
              Object.values(item).slice(0, 2).join(" ")
            ),
          };
        });
      }
      if (this.tableColumns.find((item) => item.value === "role_select")) {
        const TeachersService = DefaultServiceFactory(
          this.$api,
          DefaultServiceType.teachers
        );
        const StudentsService = DefaultServiceFactory(
          this.$api,
          DefaultServiceType.students
        );
        const teachers = await TeachersService.getData();
        const students = await StudentsService.getData();

        const usersOptions = [
          "- Список преподавателей -",
          ...teachers.map((item) => ({
            label: `${item.last_name} ${item.first_name} ${item.patronymic} ${item.birthdate}`,
            id: item.id,
            key: "role",
          })),
          "- Список учеников -",
          ...students.map((item) => ({
            label: `${item.last_name} ${item.first_name} ${item.patronymic} ${item.birthdate}`,
            id: item.id,
            key: "role",
          })),
        ];

        this.tableData = this.tableData.map((item) => {
          return {
            ...item,
            "rid_select-options": usersOptions,
            "role_select-options": this.tableColumns.find(
              (item) => item.value === "role_select"
            ).selectOptions,
          };
        });
      }

      this.clearNewItem();
      this.isLoading = false;
    },

    setService(value) {
      switch (value) {
        case "users":
          this.activeService = new UsersService(this.$api);
          this.canEdit = this.sidebarData
            .find((item) => item.value === "users")
            .editAccess.includes(this.getUserInfo.role);
          break;
        case "departaments":
          this.activeService = DefaultServiceFactory(
            this.$api,
            DefaultServiceType.departaments
          );
          this.canEdit = this.sidebarData
            .find((item) => item.value === "departaments")
            .editAccess.includes(this.getUserInfo.role);
          break;
        case "speciality":
          this.activeService = DefaultServiceFactory(
            this.$api,
            DefaultServiceType.speciality
          );
          this.canEdit = this.sidebarData
            .find((item) => item.value === "speciality")
            .editAccess.includes(this.getUserInfo.role);
          break;
        case "subjects":
          this.activeService = DefaultServiceFactory(
            this.$api,
            DefaultServiceType.subjects
          );
          this.canEdit = this.sidebarData
            .find((item) => item.value === "subjects")
            .editAccess.includes(this.getUserInfo.role);
          break;
        case "groups":
          this.activeService = DefaultServiceFactory(
            this.$api,
            DefaultServiceType.groups
          );
          this.canEdit = this.sidebarData
            .find((item) => item.value === "groups")
            .editAccess.includes(this.getUserInfo.role);
          break;
        case "journals":
          this.activeService = DefaultServiceFactory(
            this.$api,
            DefaultServiceType.journals
          );
          this.canEdit = this.sidebarData
            .find((item) => item.value === "journals")
            .editAccess.includes(this.getUserInfo.role);
          break;
        case "vedomosti":
          this.activeService = DefaultServiceFactory(
            this.$api,
            DefaultServiceType.vedomosti
          );
          this.canEdit = true;
          break;
        case "students":
          this.activeService = DefaultServiceFactory(
            this.$api,
            DefaultServiceType.students
          );
          this.canEdit = this.sidebarData
            .find((item) => item.value === "students")
            .editAccess.includes(this.getUserInfo.role);
          break;
        case "teachers":
          this.activeService = ["student", "teacher"].includes(
            this.getUserInfo.role
          )
            ? new TeachersService(this.$api)
            : DefaultServiceFactory(this.$api, DefaultServiceType.teachers);

          this.canEdit = this.sidebarData
            .find((item) => item.value === "teachers")
            .editAccess.includes(this.getUserInfo.role);
          break;
        default:
          break;
      }
    },
  },
};
</script>
