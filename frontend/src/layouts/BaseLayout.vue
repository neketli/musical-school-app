<template>
  <div class="bg-sky-50 relative min-h-full">
    <BaseHeader
      v-model="activeTab"
      :data="[
        { value: 1, link: '/' },
        { value: 2, link: '/' },
        { value: 3, link: '/' },
      ]"
      @onLogOut="logOut"
    />
    <div class="flex container py-10">
      <BaseSidebar
        v-if="!hideSidebar"
        v-model="activeFilter"
        :data="[
          { value: 1, link: '/' },
          { value: 2, link: '/' },
          { value: 3, link: '/' },
        ]"
      />
      <div class="content w-full px-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { BaseHeader, BaseSidebar } from "@/components";

export default {
  components: {
    BaseHeader,
    BaseSidebar,
  },
  props: {
    hideSidebar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeTab: { value: 1, link: "/" },
      activeFilter: { value: 1, link: "/" },
    };
  },
  methods: {
    logOut() {
      console.log("LogOut");
    },
  },
};
</script>
