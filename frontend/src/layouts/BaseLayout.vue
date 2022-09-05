<template>
  <div class="bg-sky-50 relative min-h-full">
    <BaseHeader
      v-model="activeTab"
      :data="headerData"
      @onLogOut="logOut"
      @input="setFilter"
    />
    <div class="flex container py-10">
      <BaseSidebar
        v-if="sidebarData"
        v-model="activeFilter"
        :data="sidebarData"
        @input="setFilter"
      />
      <div class="content w-full px-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { BaseHeader, BaseSidebar } from "@/components";
import { mapActions } from "vuex";

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
emits: {'setFilter': null},
  data() {
    return {
      activeTab: { value: 1, link: "/" },
      activeFilter: { value: 1, link: "/" },
    };
  },
  methods: {
    ...mapActions(["logout"]),
    async logOut() {
      await this.logout();
      this.$router.push("/auth");
    },
    setFilter() {
      this.$emit('setFilter', {activeTab: this.activeTab, activeFilter: this.activeFilter})
    }
  },
};
</script>
