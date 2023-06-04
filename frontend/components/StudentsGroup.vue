<template>
  <BaseTable
    v-if="!isLoading"
    title="Мои группы"
    :columns="tableColumns"
    :data="tableData"
  />
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import BaseTable from "@/components/BaseTable";
import { GroupStudentService } from "@/services";

export default {
  components: {
    BaseTable,
  },
  data() {
    return {
      tableInfo: {
        value: "student_group",
        label: "Мои группы",
        icon: "mdi:account-group",
      },
      tableData: [],
      tableColumns: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },

  async mounted() {
    this.isLoading = true;
    const service = new GroupStudentService(this.$api);
    this.tableColumns = service.columns;
    this.tableData = await service.getData(this.getUserInfo.rid);

    this.isLoading = false;
  },
};
</script>
