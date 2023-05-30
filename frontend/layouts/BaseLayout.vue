<template>
  <div class="bg-sky-50 relative min-h-full">
    <TheHeader :data="headerData" @onLogOut="logOut" />
    <div class="flex container py-10">
      <TheSidebar
        v-if="sidebarData"
        v-model="activeFilter"
        :data="sidebarData"
        @input="setFilter"
        @setSubTab="setSubTab"
      />
      <div class="content w-full px-10">
        <transition-group name="fade-page">
          <slot />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "~/stores/user";

export default {
  components: {
    TheHeader,
    TheSidebar,
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
