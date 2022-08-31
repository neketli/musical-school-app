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
      tableColumns: ["hi", "hello", "bonjour"],
      tableData: [
        {
          hi: 1,
          hello: 2,
          bonjour: 1,
        },
        {
          hi: 2,
          hello: 2,
          bonjour: 2,
        },
        {
          hi: 3,
          hello: 3,
          bonjour: 3,
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
