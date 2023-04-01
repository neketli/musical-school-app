<template>
  <BaseTable
    v-if="!isLoading"
    title="Мои группы"
    :columns="tableColumns"
    :data="tableData"
  />
  <BaseSkelet v-else :size="200" />
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/stores/user";
import { BaseTable, BaseSkelet } from "@/components";
import { GroupStudentService } from "@/services";

export default {
  components: {
    BaseTable,
    BaseSkelet,
  },
  data() {
    return {
      tableInfo: {
        value: "student_group",
        label: "Мои группы",
        icon: "fa-users",
      },
      tableData: [],
      tableColumns: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },

  async created() {
    this.isLoading = true;
    this.tableColumns = GroupStudentService.getColumns();
    await GroupStudentService.updateData(this.getUserInfo.rid);
    this.tableData = await GroupStudentService.getData(this.getUserInfo.rid);

    this.isLoading = false;
  },
};
</script>
