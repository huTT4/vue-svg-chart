<script setup>
import AddOrChangeSectorForm from '@/components/AddOrChangeSectorForm.vue'
import Btn from '@/components/UI/Btn.vue'
import Circle from '@/components/UI/Circle.vue'

import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js'
import { computed, reactive, ref } from 'vue'

ChartJS.register(Tooltip, Legend, ArcElement)

const chartData = reactive({
  labels: ['Сектор-1', 'Сектор-2', 'Сектор-3'],
  datasets: [
    {
      data: [25, 25, 25],
      backgroundColor: ['#ff4069', '#059bff', '#ffc234'],
      borderWidth: 1,
    },
  ],
})

chartData.ids = [1, 2, 3]

const chartOptions = reactive({
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        boxHeight: 10,
        padding: 15,
        font: {
          size: 14,
        },
      },
    },
  },
})

const sectors = computed(() => {
  return chartData.labels.map((label, index) => ({
    title: label,
    value: chartData.datasets[0].data[index],
    color: chartData.datasets[0].backgroundColor[index],
    id: chartData.ids[index],
  }))
})

// edit, remove sectors
const editing = ref(false)
const name = ref('')
const value = ref(null)
const color = ref('')
const id = ref(null)
const beginEditSector = (sectorId) => {
  editing.value = true
  const idx = chartData.ids.indexOf(sectorId)
  name.value = chartData.labels[idx]
  value.value = chartData.datasets[0].data[idx]
  color.value = chartData.datasets[0].backgroundColor[idx]
  id.value = sectorId
}
const editSector = (sector) => {
  editing.value = false

  const idx = chartData.ids.indexOf(sector.id)

  chartData.labels[idx] = sector.name
  chartData.datasets[0].data[idx] = sector.value
  chartData.datasets[0].backgroundColor[idx] = sector.color
}
const removeSector = (id) => {
  const idx = chartData.ids.indexOf(id)

  const labels = [...chartData.labels]
  const values = [...chartData.datasets[0].data]
  const colors = [...chartData.datasets[0].backgroundColor]
  const ids = [...chartData.ids]

  labels.splice(idx, 1)
  values.splice(idx, 1)
  colors.splice(idx, 1)
  ids.splice(idx, 1)

  chartData.labels = labels
  chartData.datasets[0].data = values
  chartData.datasets[0].backgroundColor = colors
  chartData.ids = ids
}

// add new sector
const adding = ref(false)
const addNewSector = (sectorInfo) => {
  adding.value = false
  let id = 1
  if (chartData.ids.length) {
    id = chartData.ids[chartData.ids.length - 1] + 1
  }
  chartData.labels = [...chartData.labels, sectorInfo.name]
  chartData.datasets[0].data = [...chartData.datasets[0].data, sectorInfo.value]
  chartData.datasets[0].backgroundColor = [
    ...chartData.datasets[0].backgroundColor,
    sectorInfo.color,
  ]
  chartData.ids = [...chartData.ids, id]
}
</script>

<template>
  <Teleport to="body">
    <AddOrChangeSectorForm
      v-if="editing"
      type="edit"
      :name="name"
      :value="value"
      :color="color"
      :id="id"
      @edit-sector="editSector"
      :close="() => (editing = false)"
    />
    <AddOrChangeSectorForm
      v-if="adding"
      type="add"
      @add-sector="addNewSector"
      :close="() => (adding = false)"
    />
  </Teleport>
  <div class="container">
    <h1 class="title">Круговая диаграмма</h1>
    <div class="base">
      <div class="sectors">
        <p v-if="!sectors.length">Добавьте новый сектор чтобы увидеть диаграмму</p>
        <ul class="form-list">
          <li v-for="sector in sectors" :key="sector.id">
            <div class="form-list-info">
              <p class="form-list-title">{{ sector.title }}</p>
              <span class="form-list-separator"></span>
              <span class="form-list-value">{{ sector.value }}</span>
              <span class="form-list-separator"></span>
              <Circle :color="sector.color" />
            </div>
            <div class="form-list-control">
              <img @click="beginEditSector(sector.id)" src="../assets/Edit.svg" alt="Edit" />
              <img @click="removeSector(sector.id)" src="../assets/Trash.svg" alt="Remove" />
            </div>
          </li>
        </ul>
        <Btn @click="adding = true" />
      </div>

      <div class="chart">
        <Pie :key="JSON.stringify(chartData)" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.title {
  font-size: 30px;
  font-weight: 500;
  border-bottom: 1px solid rgb(85, 85, 85, 0.2);
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.base {
  display: flex;
  justify-content: space-between;
  gap: 50px;
}

.sectors {
  width: 100%;
}

.form-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
}

.form-list li {
  background-color: rgba(220, 224, 234, 0.2);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-list-info {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.form-list-separator {
  background-color: #dbdfe9;
  width: 2px;
  height: 16px;
  border-radius: 2px;
  margin: 0 25px;
}

.form-list-title {
  width: 100px;
}

.form-list-value {
  width: 50px;
  text-align: center;
}

.form-list-control {
  display: flex;
  align-items: center;
  gap: 15px;
}

.form-list-control img {
  cursor: pointer;
  width: 24px;
  transition: 0.2s;
}

.form-list-control img:hover {
  transform: scale(1.15);
}

.chart canvas {
  width: 450px;
}
</style>