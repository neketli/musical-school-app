<template>
  <div v-if="!isLoading" class="flex flex-col gap-2">
    <h3 class="text-xl font-bold">Список моих предметов</h3>
    <div class="flex flex-col gap-4">
      <ul>
        <li v-for="subject in sujectsList" :key="subject.id" class="ml-4">
          <Icon name="mdi:check-circle-outline" /> {{ subject.title }}
        </li>
      </ul>
    </div>
  </div>
  <BaseSkelet v-else :size="200" />
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/stores/user";
import { BaseSkelet } from "@/components";

export default {
  components: {
    BaseSkelet,
  },
  data() {
    return {
      sujectsList: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },

  async mounted() {
    this.isLoading = true;
    const { data } = await this.$api.get(`/subjects_teachers`, {
      params: {
        id_teacher: this.getUserInfo.rid,
      },
    });
    this.sujectsList = data;
    this.isLoading = false;
  },
};
</script>
