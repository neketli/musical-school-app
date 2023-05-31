<template>
  <div class="bg-sky-50 relative min-h-full">
    <BaseHeader :data="headerData" @onLogOut="logOut" />
    <div class="flex container py-10">
      <BaseSidebar
        v-if="sidebarData.length"
        v-model="activeFilter"
        :data="sidebarData"
        @input="setFilter"
        @setSubTab="setSubTab"
      />
      <div class="content w-full px-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "~/stores/user";
import { BaseHeader, BaseSidebar } from "~/components";

export default {
  components: {
    BaseHeader,
    BaseSidebar,
  },
  props: {
    sidebarData: {
      type: Array,
      default: () => [],
    },
    headerData: {
      type: Array,
      default: () => [],
    },
  },
  emits: { setFilter: null, setSubTab: null },
  data() {
    return {
      activeFilter: this.sidebarData ? this.sidebarData[0] : {},
    };
  },
  methods: {
    ...mapActions(useUserStore, { logOutAction: "logout" }),
    logOut() {
      this.logOutAction();
      this.$router.push("/auth");
    },
    setFilter() {
      this.$emit("setFilter", this.activeFilter);
    },
    setSubTab(value) {
      this.$emit("setSubTab", value);
    },
  },
};
</script>

<style>
.fade-page-enter-active {
  transition: opacity 0.2s ease-in-out;
}

.fade-page-enter-from,
.fade-page-leave-to {
  opacity: 0;
}
</style>
