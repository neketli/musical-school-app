<template>
  <div
    v-if="!isLoading"
    class="flex flex-col gap-2"
  >
    <h3 class="text-xl font-bold">
      Список моих предметов
    </h3>
    <div class="flex flex-col gap-4">
      <ul>
        <li
          v-for="subject in sujectsList"
          :key="subject.id"
          class="ml-4"
        >
          <i class="fa fa-check-circle-o" /> {{ subject.title }}
        </li>
      </ul>
    </div>
  </div>
  <BaseSkelet
    v-else
    :size="200"
  />
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["getUserInfo"]),
  },

  async created() {
    this.isLoading = true;
    const { data } = await this.$axios.get(
      `${import.meta.env.VITE_API_URL}/subjects_teachers?id_teacher=${
        this.getUserInfo.rid
      }`
    );
    this.sujectsList = data;
    this.isLoading = false;
  },
};
</script>
