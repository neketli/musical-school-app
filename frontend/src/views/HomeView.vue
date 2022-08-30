<template>
  <BaseLayout> 123 </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";

export default {
  components: {
    BaseLayout,
  },
  data() {
    return {
      activeTab: { value: 1, link: "/" },
    };
  },
  methods: {
    auth() {
      console.log(this.login, this.password);
      this.$router.push("/");
    },
  },
};
</script>
