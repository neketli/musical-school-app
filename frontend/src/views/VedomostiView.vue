<template>
  <BaseLayout
    :sidebarData="sidebarData"
    :headerData="headerData"
    @setFilter="setFilter"
  >
    <div class="text-xl font-bold my-5 mx-3">
      {{ activeService.label }}
    </div>

    <div v-if="activeGroup" class="flex">
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

export default {
  components: {
    BaseLayout,
    VedomostiTable,
    BaseSkelet,
    BaseTable,
  },
  data() {
    return {
      headerData: [],
      sidebarData: [],
      filter: {},

      activeService: {},

      tableColumns: [
        {
          label: "17.02",
        },
        {
          label: "15.03",
        },
        {
          label: "16.03",
        },
      ],
      tableData: [
        {
          17.02: 3,
          15.03: 5,
          16.03: 4,

          name: "Васюткин И.А.",
        },
      ],
      newItem: {},

      groupsData: {},
      groupsColumns: {},
      activeGroup: null,

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
    this.isLoading = false;
  },
  methods: {
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
          17.02: 3,
          15.03: 5,
          16.03: 4,

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
