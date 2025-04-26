<script setup>
defineProps({
  color: {
    type: String,
    default: '#999',
  },
})
</script>

<template>
  <span class="circle" :style="{ 'background-color': color }"></span>
</template>

<style scoped>
.circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>