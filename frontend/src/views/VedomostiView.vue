<template>
  <BaseLayout
    :sidebarData="sidebarData"
    :headerData="headerData"
    @setFilter="setFilter"
    @setSubTab="setSubTab"
  >
    <div class="text-xl font-bold my-5 mx-3">
      {{ activeService.label }}
    </div>

    <VedomostiTable
      v-if="!isLoading"
      :columns="tableColumns"
      :rows="tableRows"
      :data="tableData"
    />
    <BaseSkelet v-else :size="200" />
  </BaseLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { BaseSkelet, VedomostiTable } from "@/components";
import BaseLayout from "@/layouts/BaseLayout.vue";
// import { VedomostiService } from "@/services";

export default {
  components: {
    BaseLayout,
    VedomostiTable,
    BaseSkelet,
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
    this.isLoading = false;
  },
  methods: {
    async setFilter() {
      await this.$router.push(`/`);
    },
  },
};
</script>
