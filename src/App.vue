<template>
  <Menubar :model="items" />
  <router-view />
</template>

<script setup>
import Menubar from "primevue/menubar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => {
      router.push("/");
    },
  },
  {
    label: "About",
    icon: "pi pi-info",
    command: () => {
      router.push("/about");
    },
  },
]);
</script>

<style scoped></style>
