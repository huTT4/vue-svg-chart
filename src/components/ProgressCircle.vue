<script setup>
import { computed } from 'vue'

const props = defineProps({
  range: Number,
  type: String,
  radius: {
    type: Number,
    default: 60,
  },
})

const ratio = computed(() => props.radius / 60)
const circumference = 2 * Math.PI * props.radius
const offset = circumference / 4

const progress = computed(() => {
  if (props.type === 'default') return circumference - props.range * (circumference / 100)
  else {
    return circumference - props.range * ((circumference - offset) / 100)
  }
})

const color = computed(() => {
  const num = props.range
  if (props.type === 'default') {
    if (num >= 100) return '#12ce66'
    else if (num > 50) return '#e7a23d'
    else if (num > 25) return '#ff4747'
    else return '#20a0ff'
  } else {
    if (num >= 100) return '#12ce66'
    else if (num > 50) return '#20a0ff'
    else return '#ff4747'
  }
})
</script>

<template>
  <svg :width="200 * ratio" :height="200 * ratio">
    <g
      :style="{
        transform: type === 'dashboard' ? 'rotate(135deg)' : 'rotate(-90deg)',
        transformOrigin: 'center',
        transition: '0.5s',
      }"
    >
      <circle
        :r="radius"
        :cx="100 * ratio"
        :cy="100 * ratio"
        fill="transparent"
        stroke="#f6f7fa"
        :stroke-width="(6 * ratio) / 1.5"
        stroke-linecap="round"
        :stroke-dashoffset="type === 'dashboard' ? offset : 0"
        :stroke-dasharray="circumference"
        style="transition: 0.5s"
      ></circle>
      <circle
        :r="radius"
        :cx="100 * ratio"
        :cy="100 * ratio"
        :stroke="color"
        :stroke-width="(6 * ratio) / 1.5"
        stroke-linecap="round"
        fill="transparent"
        :stroke-dashoffset="progress"
        :stroke-dasharray="circumference"
        style="transition: 0.5s"
      ></circle>
    </g>

    <foreignObject :x="50 * ratio" :y="50 * ratio" :width="100 * ratio" :height="100 * ratio">
      <div class="content-center">
        <Transition name="fade" mode="out-in">
          <div v-if="range <= 25 || type === 'dashboard'" key="text" class="text">{{ range }}%</div>

          <svg width="10" height="10" v-else-if="range <= 50" key="error">
            <line
              x1="0"
              y1="0"
              x2="10"
              y2="10"
              stroke="#ff4747"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="10"
              y1="0"
              x2="0"
              y2="10"
              stroke="#ff4747"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>

          <svg width="10" height="10" v-else-if="range < 100" key="warning">
            <circle r="8" cx="5" cy="5" fill="#e7a23d"></circle>
            <line
              x1="5"
              y1="1"
              x2="5"
              y2="6.5"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <line
              x1="5"
              y1="9"
              x2="5"
              y2="9"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>

          <svg width="17" height="3.5" v-else-if="range >= 100" key="success">
            <line
              x1="0"
              y1="0"
              x2="7"
              y2="7"
              stroke="#12ce66"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="7"
              y1="7"
              x2="17"
              y2="-3"
              stroke="#12ce66"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </Transition>
      </div>
    </foreignObject>
  </svg>
</template>

<style scoped>
.content-center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.text {
  font-size: 18px;
  font-weight: bold;
  color: gray;
  text-align: center;
}

.fade-enter-active {
  transition: all 0.5s ease;
}

.fade-leave-active {
  transition: all 0.15s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(5px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

svg {
  overflow: visible;
}
</style>