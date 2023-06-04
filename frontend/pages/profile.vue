<template>
  <BaseLayout :headerData="headerData">
    <div class="flex gap-8 flex-col">
      <h2 class="text-3xl">Профиль</h2>

      <div class="flex gap-10 px-8">
        <div class="flex h-[100px] items-center px-8 rounded-lg bg-sky-200">
          <Icon name="mdi:account" class="text-6xl text-blue-400" />
        </div>
        <div class="flex flex-col gap-4">
          <div class="font-bold font-2xl block">
            {{ userData.role }}
          </div>
          <div v-if="getUserInfo.rid" class="flex flex-col gap-2">
            <span>ФИО: {{ userData.full_name }}</span>
            <span>Дата рождения: {{ userData.birthdate }}</span>
            <span>Номер телефона: {{ userData.phone }}</span>
            <template v-if="userData.role === 'Ученик'">
              <span>Номер телефона родителя: {{ userData.parents_phone }}</span>
            </template>
            <template v-else>
              <span>Должность: {{ userData.position }}</span>
              <span>Заработная плата: {{ userData.salary }}</span>
            </template>
          </div>
          <StudentsGroup v-if="userData.role === 'Ученик'" />
          <TeachersSubjects v-if="userData.role === 'Преподаватель'" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/stores/user";
import BaseLayout from "@/layouts/BaseLayout.vue";
import { TeachersSubjects } from "@/components";
import StudentsGroup from "@/components/StudentsGroup";

export default {
  components: {
    BaseLayout,
    StudentsGroup,
    TeachersSubjects,
  },
  data() {
    return {
      headerData: [],
      userData: {},
    };
  },
  computed: {
    ...mapState(useUserStore, ["getUserInfo"]),
  },
  async mounted() {
    const role = this.getUserInfo.role;

    const { data } = await this.$api.get(
      `/${role === "student" ? "students" : "teachers"}/${this.getUserInfo.rid}`
    );

    this.userData = {
      ...data,
      role: role === "student" ? "Ученик" : "Преподаватель",
      full_name: `${data.last_name} ${data.first_name} ${data.patronymic}`,
      birthdate: new Date(data.birthdate).toLocaleDateString("ru-RU"),
    };

    if (role === "admin") {
      this.headerData = [
        {
          value: "/",
          label: "Школа",
        },
        {
          value: "/backup",
          label: "Резервные копии",
        },
      ];

      this.userData = { ...this.userData, role: "Администратор" };
    }
  },
};
</script>
