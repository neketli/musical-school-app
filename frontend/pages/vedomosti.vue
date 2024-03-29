<template>
  <BaseLayout
    :sidebarData="sidebarData"
    :headerData="headerData"
    @setFilter="setFilter"
  >
    <div v-if="activeGroup" class="flex flex-col gap-8 justify-center">
      <div class="flex flex-col gap-4">
        <h3 class="text-lg">Выбор предмета</h3>
        <vSelect
          v-model="activeSubject"
          class="min-w-[25%] bg-white"
          :options="subjects"
          placeholder="Предмет"
          @option:selected="getData"
        />
      </div>

      <div v-if="activeSubject" class="flex">
        <div class="flex flex-col bg-white h-full">
          <div
            class="py-3 px-6 flex items-center border-b-[1px] border-b-grey-400 h-[75px] min-w-[200px]"
          >
            Ученик \ Дата занятия
          </div>
          <template v-for="item in tableData" :key="item.name">
            <div
              class="py-3 px-6 flex items-center border-b-[1px] border-b-grey-400 h-[75px] min-w-[200px] rounded-sm"
            >
              {{ item.name }}
            </div>
          </template>
        </div>

        <div class="flex overflow-auto flex-col gap-4">
          <VedomostiTable
            v-if="!isLoading"
            :columns="tableColumns"
            :data="tableData"
            isEditable
            @onRemove="remove"
            @onAdd="add"
            @onColumnSave="saveColumn"
          />
          <BaseSkelet v-else :size="200" />
          <BaseButton @click="save"> Сохранить </BaseButton>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-auto">
      <BaseTable
        v-if="!isLoading"
        title="Выбор группы"
        :data="groupsData"
        :columns="groupColumns"
        includeId
        isRowsClickable
        @onRowClicked="setGroup"
      />
      <BaseSkelet v-else :size="200" />
    </div>
  </BaseLayout>
</template>

<script>
import { mapState } from "pinia";
import vSelect from "vue-select";
import { toast } from "vue3-toastify";
import { useUserStore } from "~/stores/user";
import {
  BaseTable,
  BaseSkelet,
  BaseButton,
  VedomostiTable,
} from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { DefaultServiceFactory } from "@/services";
import { DefaultServiceType } from "@/services/tables";

export default {
  components: {
    BaseLayout,
    VedomostiTable,
    BaseSkelet,
    BaseTable,
    BaseButton,
    vSelect,
  },
  data() {
    return {
      headerData: [],
      sidebarData: [],
      filter: {},

      tableColumns: [],
      tableData: [],
      newItem: {},

      groupsData: {},
      initialData: {},
      removeList: [],
      groupsColumns: {},
      activeGroup: null,
      subjects: [],
      activeSubject: null,
      JournalsService: null,

      isLoading: true,
      isModalShow: false,
      canEdit: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },
  async mounted() {
    this.sidebarData = [
      {
        value: "back",
        label: "Назад",
        icon: "mdi:reply",
      },
    ];
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
    const GroupsService = DefaultServiceFactory(
      this.$api,
      DefaultServiceType.groups
    );

    this.JournalsService = DefaultServiceFactory(
      this.$api,
      DefaultServiceType.journals
    );

    this.groupsData = await GroupsService.getData();
    this.groupColumns = GroupsService.columns;

    if (this.getUserInfo.role === "teacher") {
      const { data } = await this.$api.get(`/subjects_teachers`, {
        params: {
          id_teacher: this.getUserInfo.rid,
        },
      });
      this.subjects = data.map((item) => {
        return {
          id: `${item.id}`,
          label: item.title,
        };
      });
    } else if (this.getUserInfo.role === "admin") {
      const { data } = await this.$api.get(`/subjects`);
      this.subjects = data.map((item) => {
        return {
          id: `${item.id}`,
          label: item.title,
        };
      });
    }

    this.isLoading = false;
  },
  methods: {
    async getData() {
      this.isLoading = true;
      const journalsData = await this.JournalsService.getData();

      this.tableData = this.tableData.map((item) => {
        const obj = {};
        for (const data of journalsData) {
          if (
            data.id_subject === this.activeSubject.id &&
            data.id_student === item.id
          ) {
            const dayjs = useDayjs();
            const date = dayjs(data.date).format("DD/MM/YYYY");
            obj[date] = data.grade;
            obj[`${date}-id_journal`] = data.id;
          }
        }

        return {
          id: item.id,
          name: item.name,
          ...obj,
        };
      });

      this.tableColumns = Object.keys(this.tableData[0])
        .filter(
          (item) =>
            item !== "id" && item !== "name" && !item.includes("-id_journal")
        )
        .map((item) => {
          return {
            label: item,
          };
        });

      this.tableData.forEach((i) => {
        this.tableColumns.forEach((j) => {
          if (i[j.label] === undefined) {
            i[j.label] = "";
          }
        });
      });

      this.initialData = [...this.tableData];

      this.isLoading = false;
    },
    async setFilter() {
      await this.$router.push(`/`);
    },
    async setGroup({ id }) {
      const { data } = await this.$api.get(`/students_groups`, {
        params: { id_group: id },
      });
      this.activeGroup = true;
      this.tableData = data.map((item) => {
        return {
          ...item,
        };
      });
    },
    remove(label) {
      this.tableColumns = this.tableColumns.filter(
        (item) => item.label !== label
      );
      this.tableData.forEach((item) => {
        this.removeList.push(item[`${label}-id_journal`]);
        if (item[label]) {
          delete item[label];
          delete item[`${label}-id_journal`];
        }
      });
    },
    add() {
      this.tableColumns.push({
        label: "",
      });
    },
    saveColumn({ label, old }) {
      if (!old.label) {
        this.tableColumns = this.tableColumns.filter(
          (item) => item.label !== ""
        );
        this.tableColumns.push({ label });

        this.tableData.forEach((item) => {
          item[label] = "";
        });
        return;
      }
      if (old.label !== label) {
        this.tableData.forEach(async (item) => {
          const oldDate = old.label;
          await this.JournalsService.update({
            id: item[`${oldDate}-id_journal`],
            grade: item[oldDate],
            date: label,
            type: "",
            id_student: item.id,
            id_subject: this.activeSubject.id,
          });
          item[`${label}-id_journal`] = item[`${oldDate}-id_journal`];
          item[label] = item[oldDate];
          delete item[oldDate];
          delete item[`${oldDate}-id_journal`];
        });
        this.tableColumns = this.tableColumns.filter(
          (item) => item.label !== old.label
        );
        this.tableColumns.push({ label });
      }
    },
    save() {
      this.isLoading = true;
      if (this.removeList.length) {
        this.removeList.forEach(async (id) => {
          await this.JournalsService.remove(id);
        });
      }

      this.tableData.forEach((item) => {
        Object.keys(item)
          .filter((i) => i !== "id" && i !== "name")
          .forEach(async (data) => {
            if (this.removeList.filter((k) => k === item[data]).length) return;
            if (data.includes("-id_journal")) {
              const date = data.replace("-id_journal", "");
              await this.JournalsService.update({
                id: item[data],
                grade: item[date],
                date,
                type: "",
                id_student: item.id,
                id_subject: this.activeSubject.id,
              });
            } else if (!item[`${data}-id_journal`]) {
              await this.JournalsService.create({
                grade: item[data],
                date: data,
                type: "",
                id_student: item.id,
                id_subject: this.activeSubject.id,
              });
            }
          });
      });

      this.removeList = [];

      toast.success("Успешно сохранено!", {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
      });

      this.isLoading = false;
    },
  },
};
</script>
