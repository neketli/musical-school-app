<template>
  <BaseLayout
    :sidebarData="sidebarData"
    :headerData="headerData"
    @setFilter="setFilter"
  >
    <div class="text-xl font-bold my-5 mx-3">
      {{ activeService.label }}
    </div>

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
        <div class="flex flex-col bg-white">
          <div
            class="py-3 px-6 flex items-center border-b-[1px] border-b-grey-400 h-[75px] min-w-[200px]"
          >
            Ученик \ Дата занятия
          </div>
          <template v-for="item in tableData" :key="item.name">
            <div
              class="py-3 px-6 flex items-center border-b-[1px] border-b-grey-400 h-[75px] min-w-[200px]"
            >
              {{ item.name }}
            </div>
          </template>
        </div>

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
      </div>
    </div>
    <div v-else class="flex flex-auto">
      <BaseTable
        title="Выбор группы"
        v-if="!isLoading"
        @onRowClicked="setGroup"
        :data="groupsData"
        :columns="groupColumns"
      />
      <BaseSkelet v-else :size="200" />
    </div>
  </BaseLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseTable, BaseSkelet, VedomostiTable } from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { GroupsService } from "@/services";
import vSelect from "vue-select";

export default {
  components: {
    BaseLayout,
    VedomostiTable,
    BaseSkelet,
    BaseTable,
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

      groupsData: {},
      groupsColumns: {},
      activeGroup: null,
      subjects: [],
      activeSubject: null,

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

    this.groupsData = await GroupsService.getData();
    this.groupColumns = GroupsService.getColumns();

    if (this.getUserInfo.role === "teacher") {
      const { data } = await this.$axios.get(
        `${import.meta.env.VITE_API_URL}/subjects_teachers?id_teacher=${
          this.getUserInfo.rid
        }`
      );
      this.subjects = data.map((item) => {
        return {
          id: item.id,
          label: item.title,
        };
      });
    }

    this.isLoading = false;
  },
  methods: {
    async getData() {},
    async setFilter() {
      await this.$router.push(`/`);
    },
    async setGroup({ id }) {
      const { data } = await this.$axios.get(
        `${import.meta.env.VITE_API_URL}/students_groups?id_group=${id}`
      );
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
        if (item[label]) {
          delete item[label];
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
        this.tableData.forEach((item) => {
          item[label] = item[old.label];
          delete item[old.label];
        });
        this.tableColumns = this.tableColumns.filter(
          (item) => item.label !== old.label
        );
        this.tableColumns.push({ label });
      }
    },
  },
};
</script>
