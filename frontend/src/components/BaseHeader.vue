<template>
  <div class="w-full sticky bg-gray-800 h-16">
    <div class="h-full flex justify-between items-center px-4">
      <!-- Nav links -->
      <div class="flex gap-5 items-center">
        <router-link
          to="/"
          class="text-white text-2xl flex gap-2 items-center"
        >
          <img
            src="@/assets/img/logo.png"
            class="w-12 h-12"
            alt="musical chool logo"
          />
          Musical School
        </router-link>
        <template v-if="data">
          <router-link
            v-for="item in data"
            :key="item.value"
            class="py-3 px-5 rounded-md text-gray-300 hover:text-white hover:bg-sky-100 hover:bg-opacity-10 transition-all cursor-pointer"
            :to="item.value"
            :class="{
              'text-white bg-sky-100 bg-opacity-10 transition-all cursor-default':
                item.value === $route.path,
            }"
          >
            {{ item.label }}
          </router-link>
        </template>
      </div>
      <div class="flex gap-5 items-center">
        <div class="user-data">
          <span class="text-gray-300">{{ getUserInfo.login }}</span>
        </div>
        <button
          class="log-out p-3 rounded-md text-gray-300 hover:text-white hover:bg-sky-100 hover:bg-opacity-10 transition-all cursor-pointer font-normal"
          @click="logOut"
        >
          <i class="fa fa-sign-out" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  emits: { onLogOut: null },
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    logOut() {
      this.$emit("onLogOut");
    },
  },
};
</script>
