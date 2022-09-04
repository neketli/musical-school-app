<template>
  <BaseLayout>
    <BaseTable :columns="tableColumns" :data="tableData" isEditable />
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import { BaseTable } from "@/components";

export default {
  components: {
    BaseLayout,
    BaseTable,
  },
  data() {
    return {
      activeTab: { value: 1, link: "/" },
      tableColumns: [
        {
          label: "id",
          value: "id",
        },
        {
          label: "login",
          value: "login",
        },
        {
          label: "password",
          value: "password",
        },
        {
          label: "user_group",
          value: "user_group",
        },
      ],
      tableData: [
        {
          id: 1,
          login: "1",
          password: "1",
          user_group: "1",
        },
        {
          id: 2,
          login: "2",
          password: "2",
          user_group: "2",
        },
      ],
    };
  },
  methods: {
    auth() {
      console.log(this.login, this.password);
      this.$router.push("/");
    },
  },
};
</script>
