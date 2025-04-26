<script setup>
import { computed, ref } from 'vue'

import ProgressCircle from '@/components/ProgressCircle.vue'

const range = ref(0)
const getRange = computed(() => Number(range.value))
const type = ref('default') // default | dashboard

const changeType = () => {
  if (type.value === 'default') type.value = 'dashboard'
  else type.value = 'default'
}
</script>

<template>
  <div class="base">
    <div class="inputs">
      <div class="control">
        <input type="range" v-model="range" class="control-range" />
        <button @click="changeType" class="control-btn">Change Type</button>
      </div>
      <div class="info">
        <input class="info-num" type="number" min="0" max="100" v-model="range" />
        <p class="info-type">
          Type: <span>{{ type }}</span>
        </p>
      </div>
    </div>

    <ProgressCircle :range="getRange" :type="type" :radius="120" />
  </div>
</template>

<style scoped>
.base {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inputs {
  width: 300px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-radius: 10px;
  padding: 20px;
  background-color: rgba(128, 128, 128, 0.077);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.171);
}

.control {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 160px;
  justify-content: space-between;
  position: relative;
}

.control-range {
  margin-top: 5px;
}

.control-btn {
  background-color: black;
  color: white;
  border-radius: 10px;
  padding: 10px;
  transition: 0.15s;
}

.control-btn:hover {
  background-color: #000000c7;
  transform: scale(1.05);
}

.control-btn:active {
  transform: scale(0.95);
}

.info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 85px;
}

.info-num {
  border: 1px solid rgba(128, 128, 128, 0.331);
  padding-left: 10px;
  outline: none;
}

.info-type {
  display: flex;
  flex-direction: column;
}

.info-type span {
  font-weight: 600;
}
</style>