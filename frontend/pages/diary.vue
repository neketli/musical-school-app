<template>
  <BaseLayout :sidebarData="sidebarData" :headerData="headerData">
    <div class="flex flex-col gap-8 justify-center">
      <div class="flex flex-col gap-4">
        <h3 class="text-lg">Выбор предмета</h3>
        <vSelect
          v-model="activeSubject"
          class="min-w-[25%] bg-white"
          :options="subjects"
          placeholder="Предмет"
          @option:selected="formatData"
        />
      </div>

      <div v-if="activeSubject" class="flex">
        <div class="flex flex-col bg-white h-full">
          <div
            class="py-2 px-6 flex items-center border-b-[1px] border-b-grey-400 h-[75px] min-w-[200px]"
          >
            Дата занятий:
          </div>
          <template v-for="item in tableData" :key="item.name">
            <div
              class="py-2 px-6 flex items-center border-b-[1px] border-b-grey-400 h-[75px] min-w-[200px] rounded-sm"
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
          />
          <BaseSkelet v-else :size="200" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { mapState } from "pinia";
import vSelect from "vue-select";
import { useUserStore } from "~/stores/user";
import { BaseSkelet, VedomostiTable } from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { StudentJournalService } from "@/services";

export default {
  components: {
    BaseLayout,
    VedomostiTable,
    BaseSkelet,
    vSelect,
  },
  data() {
    return {
      headerData: [],
      sidebarData: [],

      tableColumns: [],
      tableData: [],

      subjects: [],
      activeSubject: null,
      service: null,
      journalsData: [],

      isLoading: true,
      name: "",
    };
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },
  async mounted() {
    this.service = new StudentJournalService(this.$api);
    this.sidebarData = [
      {
        link: "/",
        label: "Назад",
        icon: "mdi:reply",
      },
    ];

    await this.getData();

    this.isLoading = false;
  },
  methods: {
    async getData() {
      this.isLoading = true;
      this.journalsData = await this.service.getData(this.getUserInfo.rid);

      const subjects = await this.$api.get(`/subjects`);
      this.subjects = subjects.data.map((item) => {
        return {
          id: item.id,
          label: item.title,
        };
      });

      const { data } = await this.$api.get(`/students/${this.getUserInfo.rid}`);
      this.name = `${
        data.last_name
      } ${data.first_name[0].toUpperCase()}. ${data.patronymic[0].toUpperCase()}.`;

      this.formatData();

      this.isLoading = false;
    },
    formatData() {
      this.isLoading = true;

      this.tableData = [
        {
          id: this.getUserInfo.rid,
          name: this.name,
        },
      ].map((item) => {
        const obj = {};
        for (const data of this.journalsData) {
          if (data.id === this.activeSubject?.id) {
            const dayjs = useDayjs();
            obj[dayjs(data.date).format("DD/MM/YYYY")] = data.grade;
          }
        }

        return {
          id: item.id,
          name: item.name,
          ...obj,
        };
      });
      // .map((item) => {
      //   Object.keys(item).forEach((element) => {
      //     if (!item[element]) {
      //       delete item[element];
      //     }
      //   });

      //   return item;
      // });

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

      setTimeout(() => {
        this.isLoading = false;
      }, 10);
    },
  },
};
</script>
