<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
</script>

<template>
  <TheNavbar />
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.main {
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>