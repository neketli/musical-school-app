<template>
  <BaseLayout
    :sidebarData="sidebarData"
    :headerData="headerData"
    @setFilter="setFilter"
  >
    <h2 class="text-xl font-bold my-5 mx-3">
      {{ activeService.label }}
    </h2>
    <!-- Main table -->
    <SetupTable
      v-if="!isLoading"
      class="z-10"
      :columns="tableColumns"
      :data="tableData"
      :isEditable="canUserEdit"
      :firstField="firstField"
      :secondField="secondField"
      @onSave="save"
      @onRemove="remove"
      @onAdd="toggleMenu"
    />
    <BaseSkelet v-else :size="200" />

    <!-- Dropdown Menu -->
    <Transition name="slide-fade">
      <div v-show="isMenuShow && !isLoading" class="-mt-1 w-full">
        <div class="flex flex-col gap-5 rounded-b-xl p-10 bg-white shadow-md">
          <!-- Content -->
          <div class="flex w-full justify-between items-center gap-5">
            <div class="flex flex-col gap-2 w-[50%]">
              <!-- 1 sevice -->
              <span class="text-gray-500">{{ firstService.label }}</span>
              <vSelect
                v-model="newItem[tableColumns[0]?.value]"
                class="min-w-[25%]"
                :options="firstSelect"
              />
            </div>

            <div class="flex flex-col gap-2 w-[50%]">
              <!-- 2 sevice -->
              <span class="text-gray-500">{{ secondService.label }}</span>
              <vSelect
                v-model="newItem[tableColumns[1]?.value]"
                class="min-w-[25%]"
                :options="secondSelect"
              />
            </div>
          </div>
          <!-- Buttons -->
          <div class="gap-5 flex justify-center items-center">
            <BaseButton class="text-green-600 w-[20%]" @click="add">
              <i class="fa fa-check" />
            </BaseButton>
            <BaseButton class="text-red-600 w-[20%]" @click="cancel">
              <i class="fa fa-times" />
            </BaseButton>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Bottom tables -->
    <div class="flex mt-10 justify-between gap-10">
      <BaseTable
        v-if="!isLoading"
        :columns="firstService.getColumns()"
        :data="firstService.data || []"
        :title="firstService.label"
      />
      <BaseSkelet v-else :size="200" />

      <BaseTable
        v-if="!isLoading"
        :columns="secondService.getColumns()"
        :data="secondService.data || []"
        :title="secondService.label"
      />
      <BaseSkelet v-else :size="200" />
    </div>
  </BaseLayout>
</template>

<script>
import { mapGetters } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import BaseLayout from "@/layouts/BaseLayout.vue";
import {
  GroupsService,
  SubjectsService,
  TeachersService,
  StudentsService,
  SGService,
  STService,
} from "@/services";

export default {
  components: {
    BaseLayout,
    BaseButton,
    BaseSkelet,
    BaseTable,
    vSelect,
    SetupTable,
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

      firstService: {},
      secondService: {},

      tableColumns: [],
      tableData: [],
      newItem: {},

      firstField: "",
      secondField: "",

      isLoading: true,
      isMenuShow: false,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
    firstSelect() {
      return this.firstService.data.map((item) =>
        Object.values(item).join(" ")
      );
    },
    secondSelect() {
      return this.secondService.data.map((item) =>
        Object.values(item).join(" ")
      );
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
      if (row["id_student"]) {
        await this.activeService.editData(row.id, {
          id_student: +row.id_student.split(" ")[0],
          id_group: +row.id_group.split(" ")[0],
        });
      } else if (row["id_teacher"]) {
        await this.activeService.editData(row.id, {
          id_teacher: +row.id_teacher.split(" ")[0],
          id_subject: +row.id_subject.split(" ")[0],
        });
      } else {
        await this.activeService.editData(row);
      }
      await this.updateTableData();
      this.isLoading = false;
    },

    toggleMenu() {
      this.clearNewItem();
      this.isMenuShow = !this.isMenuShow;
    },

    async add() {
      if (Object.values(this.newItem).filter((item) => !item).length) {
        return;
      }
      this.isLoading = true;
      this.isMenuShow = false;

      const item = Object.fromEntries(
        Object.entries(this.newItem).map((item) => [
          item[0],
          item[1].split(" ")[0],
        ])
      );
      await this.activeService.addData(item);
      await this.updateTableData();

      this.clearNewItem();
      this.isLoading = false;
    },

    async remove(id) {
      this.isLoading = true;
      await this.activeService.removeData(id);
      await this.updateTableData();

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
      this.isMenuShow = false;
    },

    async initActiveTable() {
      this.isLoading = true;
      this.tableColumns = this.activeService.getColumns();
      this.tableData = await this.activeService.getData();

      await this.firstService.getData();
      await this.secondService.getData();

      this.tableData = this.tableData.map((item) => {
        return {
          ...item,
          firstSelect: this.firstSelect,
          secondSelect: this.secondSelect,
        };
      });

      this.clearNewItem();
      this.isLoading = false;
    },

    async updateTableData() {
      this.isLoading = true;
      await this.activeService.updateData();
      this.tableData = await this.activeService.getData();

      this.tableData = this.tableData.map((item) => {
        return {
          ...item,
          firstSelect: this.firstSelect,
          secondSelect: this.secondSelect,
        };
      });

      this.clearNewItem();
      this.isLoading = false;
    },

    async setService(value) {
      if (value === "#students_groups") {
        this.activeService = SGService;
        this.firstService = StudentsService;
        this.secondService = GroupsService;

        this.firstField = "id_student";
        this.secondField = "id_group";
      }
      if (value === "#subjects_teachers") {
        this.activeService = STService;
        this.firstService = SubjectsService;
        this.secondService = TeachersService;

        this.firstField = "id_subject";
        this.secondField = "id_teacher";
      }
    },
  },
};
</script>

<style lang="scss">
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
  z-index: -2;
}
</style>
