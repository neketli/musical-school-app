<template>
  <div class="bg-sky-50 flex justify-center items-center h-[100%]">
    <div class="container h-full sm:h-auto transition-all">
      <div
        class="flex flex-col justify-center items-center mx-auto text-center bg-white shadow-sm hover:shadow-md rounded-lg overflow-hidden py-16 px-10 gap-10 sm:px-12 md:px-[60px] h-full w-full sm:h-auto sm:max-w-[525px] transition-all"
      >
        <div class="text-center inline-block max-w-[160px] mx-auto">
          Музыкальная школа
        </div>
        <form class="flex flex-col gap-6">
          <BaseInput v-model="login" placeholder="Логин" />
          <BaseInput v-model="password" type="password" placeholder="Пароль" />
          <BaseButton
            class="max-w-xs mx-[auto]"
            @keyup.enter="auth"
            @click="auth"
          >
            Войти
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { BaseInput, BaseButton } from "@/components";
import { useUserStore } from "~/stores/user";

export default {
  components: {
    BaseInput,
    BaseButton,
  },
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(useUserStore, { loginAction: "login" }),
    async auth() {
      try {
        await this.loginAction({
          login: this.login,
          password: this.password,
        });
      } catch (error) {
        console.error(error);
      }
      this.$router.push("/");
    },
  },
};
</script>
