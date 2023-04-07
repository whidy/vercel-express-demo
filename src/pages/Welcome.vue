<template>
  <div>Welcome page</div>
  <p>{{ result }}</p>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const result = ref("");
try {
  // axios.get("https://randomfox.ca/floof/").then((res) => {
  // axios.get("http://localhost:6173/users").then((res) => {
  axios.get("http://localhost:6173/api").then((res) => {
    // console.log(res.data);
    result.value = res.data;
  });
} catch (error) {
  result.value = error;
}
</script>

<style lang="scss" scoped></style>
