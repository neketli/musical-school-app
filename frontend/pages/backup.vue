<template>
  <BaseLayout
    :headerData="headerData"
    :sidebarData="sidebarData"
    @setFilter="setFilter"
  >
    <template v-if="!isLoading">
      <div v-if="filter.value === 'restore'" class="flex flex-col gap-5">
        <BaseFileInput @fileUpload="fileUpload">
          <template #description>
            <div class="mb-2 text-sm text-gray-500">
              Перенесите файл резервной копии в эту область или
              <span class="font-bold">нажмите</span> чтобы загрузить
            </div>
            <div class="mb-2 text-xs text-gray-500">
              Файл должен быть в формате .tar, без кириллицы и пробелов в
              названии
            </div>
          </template>
        </BaseFileInput>
        <BaseButton @click="fileSubmit"> Отправить </BaseButton>
        <Transition name="fade">
          <span
            v-if="message"
            class="text-xl text-clip mt-5"
            :class="{
              'text-green-500': code === 200,
              'text-orange-500': code === 500,
              'text-red-500': code === 415,
            }"
          >
            {{ message }}</span
          >
        </Transition>
      </div>
      <div
        v-if="filter.value === 'backup'"
        class="flex flex-col items-center justify-center text-center gap-5 mt-12"
      >
        <p class="text-gray-500 text-xl">
          На этой странице вы можете
          <span class="font-bold"
            >скачать <Icon name="mdi:cloud-download" />
          </span>
          резервную копию школьной базы данных для дальнейшего восстановления
        </p>
        <a ref="download" class="hidden" />
        <BaseButton class="w-[30%]" @click="download">
          Скачать <Icon name="mdi:download" />
        </BaseButton>
      </div>
      <div
        v-if="filter.value === 'history'"
        class="flex flex-col items-center justify-center text-center gap-5 mt-12"
      >
        <h2 class="text-gray-500 text-xl">
          История изменений всех доступных таблиц
        </h2>
        <vSelect
          v-model="selectedTable"
          class="text-gray-500 text-xl bg-white min-w-[50%]"
          label="label"
          :options="tablesList"
          :clearable="false"
          @close="updateTable"
        />
        <div class="flex items-center gap-6">
          Вернуться назад на
          <BaseInput v-model.trim.number="historyLimit" class="max-w-[100px]" />
          операций
          <BaseButton @click="revertByLimit"> Применить </BaseButton>
        </div>

        <div class="flex items-center gap-3">
          Откатить операцию по идентификатору
          <BaseInput
            v-model.trim.number="opId"
            class="max-w-[100px]"
            placeholder="op_id"
          />
          <BaseButton @click="revertById"> Применить </BaseButton>
        </div>
        <BaseTable
          v-if="tableLoaded"
          includeId
          :columns="tableColumns"
          :data="tableData"
        />
        <BaseSpinner v-else />
      </div>
    </template>
    <BaseSpinner v-else class="h-full" />
  </BaseLayout>
</template>

<script>
import { mapState } from "pinia";
import vSelect from "vue-select";
import { useUserStore } from "~/stores/user";
import {
  BaseTable,
  BaseInput,
  BaseFileInput,
  BaseButton,
  BaseSpinner,
} from "@/components";
import { History } from "@/services";
import BaseLayout from "@/layouts/BaseLayout.vue";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    BaseLayout,
    BaseFileInput,
    BaseButton,
    BaseSpinner,
    BaseTable,
    BaseInput,
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
      sidebarData: [
        {
          value: "backup",
          label: "Создать резервную копию",
          icon: "mdi:database",
        },
        {
          value: "restore",
          label: "Восстановить резервную копию",
          icon: "mdi:reply",
        },
        {
          value: "history",
          label: "История изменений",
          icon: "mdi:history",
        },
      ],
      tablesList: [
        {
          value: "users",
          label: "Пользователи",
        },
        {
          value: "departaments",
          label: "Отделения",
        },
        {
          value: "speciality",
          label: "Специальности",
        },
        {
          value: "subjects",
          label: "Предметы",
        },
        {
          value: "classrooms",
          label: "Кабинеты",
        },
        {
          value: "groups",
          label: "Группы",
        },
        {
          value: "journals",
          label: "Журналы",
        },
        {
          value: "plans",
          label: "Планы",
        },
        {
          value: "students",
          label: "Ученики",
        },
        {
          value: "teachers",
          label: "Преподаватели",
        },
        {
          value: "teachers",
          label: "Преподаватели",
        },
      ],

      tableData: [],
      tableColumns: [],

      filter: {},
      file: {},
      selectedTable: {},
      code: "",
      message: "",
      historyLimit: 1,
      opId: "",
      isLoading: true,
      tableLoaded: false,
    };
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },
  async mounted() {
    this.selectedTable = this.tablesList[0];
    await this.updateTable(this.selectedTable);
    this.setFilter(this.sidebarData[0]);
    this.isLoading = false;
  },
  methods: {
    setFilter(value) {
      this.filter = value;
    },
    fileUpload(value) {
      this.file = value;
    },
    async download() {
      const a = this.$refs.download;
      const data = await this.$api({
        url: `/dump`,
        method: "GET",
        responseType: "blob",
      });

      const fileName =
        data.headers["content-disposition"].match("[a-zA-Z0-9-_]*.tar");
      const file = new Blob([data.data], { type: "application/x-tar" });

      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    },
    async fileSubmit() {
      this.isLoading = true;

      const formData = new FormData();
      formData.append("file", this.file);
      try {
        const data = await this.$api.post(`/dump`, formData);
        this.code = data.status;
      } catch (error) {
        this.code = error.request.status;
      }

      switch (this.code) {
        case 500:
          this.message = "Возможна ошибка восстановления...";
          break;
        case 415:
          this.message = "Ошибка восстановления, неверный тип файла!";
          break;

        default:
          this.message = "База данных успешно восстановлена!";
          break;
      }

      setTimeout(() => {
        this.message = "";
      }, 10000);

      this.isLoading = false;
    },
    async updateTable() {
      this.tableLoaded = false;
      const service = new History(this.$api);
      this.tableData = await service.getData({
        table: this.selectedTable.value,
      });
      this.tableColumns = await service.colums;
      this.tableLoaded = true;
    },
    async revertByLimit() {
      await this.$api.post(`/${this.selectedTable.value}/undo`, {
        limit: this.historyLimit > 1 ? this.historyLimit : 1,
      });
      await this.updateTable();
    },
    async revertById() {
      await this.$api.post(`/${this.selectedTable.value}/undo`, {
        op_id: this.opId,
      });
      await this.updateTable();
    },
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
