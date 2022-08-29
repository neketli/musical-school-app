<template>
  <section class="bg-slate-100 flex justify-center items-center h-[100%]">
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
          <BaseButton class="max-w-xs mx-[auto]" @click="auth">
            Войти
          </BaseButton>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import BaseInput from "@/components/BaseInput.vue";
import BaseButton from "@/components/BaseButton.vue";

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
    auth() {
      console.log(this.login, this.password);
    },
  },
};
</script>

<style lang="scss"></style>
