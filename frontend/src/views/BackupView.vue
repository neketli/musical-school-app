<template>
  <BaseLayout
    :headerData="headerData"
    :sidebarData="sidebarData"
    @setFilter="setFilter"
  >
    <template v-if="!isLoading">
      <div v-if="filter.value === 'restore'" class="flex flex-col gap-5">
        <BaseFileInput @fileUpload="fileUpload" />
        <BaseButton @click="fileSubmit"> Отправить </BaseButton>
        <span
          v-if="message"
          class="text-xl text-clip mt-5"
          :class="{
            'text-green-500': code === 200,
            'text-red-500': code !== 200,
          }"
        >
          {{ message }}</span
        >
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center text-center gap-5 mt-12"
      >
        <p class="text-gray-500 text-xl">
          На этой странице вы можете
          <span class="font-bold"
            >скачать <i class="fa fa-cloud-download" />
          </span>
          резервную копию школьной базы данных для дальнейшего восстановления
        </p>
        <a class="hidden" ref="download" />
        <BaseButton @click="download" class="w-[30%]">
          Скачать <i class="fa fa-download" />
        </BaseButton>
      </div>
    </template>
    <BaseSpinner v-else />
  </BaseLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseFileInput, BaseButton, BaseSpinner } from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  components: {
    BaseLayout,
    BaseFileInput,
    BaseButton,
    BaseSpinner,
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
          icon: "fa-database",
        },
        {
          value: "restore",
          label: "Восстановить резервную копию",
          icon: "fa-reply",
        },
      ],

      filter: {},

      file: {},
      code: "",
      message: "",
      isLoading: true,
    };
  },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  created() {
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
      const data = await this.$axios({
        url: `${import.meta.env.VITE_API_URL}/dump`,
        method: "GET",
        responseType: "blob",
      });

      const fileName =
        data.headers["content-disposition"].match("[a-zA-Z0-9-_]*.tar");
      let file = new Blob([data.data], { type: "application/x-tar" });

      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    },
    async fileSubmit() {
      this.isLoading = true;

      let formData = new FormData();
      formData.append("file", this.file);
      try {
        const data = await this.$axios.post(
          `${import.meta.env.VITE_API_URL}/dump`,
          formData
        );
        this.code = data.status;
      } catch (error) {
        console.error(error);
        this.code = error.request.status;
      }

      console.log(this.code);

      this.message =
        this.code === 200
          ? "База данных успешно восстановлена!"
          : "Ошибка восстановления!";

      setTimeout(() => {
        this.message = "";
      }, 10000);

      this.isLoading = false;
    },
  },
};
</script>
