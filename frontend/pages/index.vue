<script setup lang="ts">
import { useFetch } from "@vueuse/core";
const { data, isFetching } = await useFetch("https://httpbin.org/get");
</script>

<template>
  <div v-if="!isFetching" class="div">{{ data }}</div>
  <div v-else class="div">loading</div>
</template>
