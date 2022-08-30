<template>
  <div class="w-full sticky bg-gray-800 h-16">
    <div class="h-full flex justify-between items-center px-4">
      <!-- Nav links -->
      <div class="flex gap-5 items-center">
        logo
        <router-link
          v-for="item in data"
          :key="item.value"
          class="py-3 px-5 rounded-md text-gray-300 hover:text-white hover:bg-sky-100 hover:bg-opacity-10 transition-all cursor-pointer"
          :to="item.link"
          :class="{
            'text-white bg-sky-100 bg-opacity-10 transition-all cursor-default':
              item.value === modelValue.value,
          }"
          @click="setActiveTab(item)"
        >
          {{ item.value }}
        </router-link>
      </div>
      <div class="flex gap-5 items-center">
        <div class="user-data">
          <span class="text-gray-300">user.login</span>
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
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  emits: { "update:modelValue": null, onLogOut: null },
  methods: {
    setActiveTab(value) {
      this.$emit("update:modelValue", value);
    },
    logOut() {
      this.$emit("onLogOut");
    },
  },
};
</script>
