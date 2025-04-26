<script setup>
import { ref } from 'vue'
import Btn from './UI/Btn.vue'
import Circle from './UI/Circle.vue'

const emits = defineEmits(['add-sector', 'edit-sector'])

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  close: Function,
  name: String,
  value: Number,
  color: String,
  id: Number,
})

const name = ref(props.name ?? '')
const value = ref(props.value ?? null)
const color = ref(props.color ?? '#000000')
const opened = ref(true)

const openColorPicker = () => (opened.value = !opened.value)

const addNewSector = () => {
  if (name.value && value.value) {
    emits('add-sector', {
      name: name.value,
      value: value.value,
      color: color.value,
      id: props.id,
    })
  }
}

const editSector = () => {
  if (name.value && value.value) {
    emits('edit-sector', {
      name: name.value,
      value: value.value,
      color: color.value,
      id: props.id,
    })
  }
}
</script>

<template>
  <div @click="close" class="overlay"></div>
  <form class="form">
    <h4 class="form-title">{{ type === 'add' ? 'Добавление сектора' : 'Изменение сектора' }}</h4>
    <label for="name" class="form-input-group">
      <div class="form-input-label">Наименование</div>
      <input v-model="name" class="form-input" type="text" id="name" placeholder="" />
    </label>
    <label for="value" class="form-input-group">
      <div class="form-input-label">Значение</div>
      <input v-model="value" class="form-input" type="number" id="value" placeholder="" />
    </label>
    <label for="color" class="form-input-group color">
      <div>
        <div class="form-input-label">Цвет</div>
        <input class="form-input" type="text" v-model="color" id="color" />
      </div>
      <div class="picker-right">
        <Circle :color="color" />
        <button @click.prevent="openColorPicker" class="picker-open-btn">
          <img
            src="../assets/arrow.svg"
            alt="Arrow"
            :style="{ transform: !opened ? 'rotate(180deg)' : 'none' }"
          />
        </button>
      </div>
    </label>
    <Transition name="fade" mode="out-in">
      <v-color-picker
        v-if="opened"
        v-model="color"
        class="picker"
        elevation="0"
        mode="hexa"
      ></v-color-picker>
    </Transition>
    <btn @click.prevent="type === 'add' ? addNewSector() : editSector()">{{
      type === 'edit' ? 'Изменить сектор' : 'Добавить сектор'
    }}</btn>
  </form>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.overlay {
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  z-index: 0;
}

.form {
  position: fixed;
  background-color: #fff;
  width: 390px;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.form-title {
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 20px;
}

.form-input-group {
  border: 1px solid #dbdfe9;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: text;
  height: 64px;
  margin-bottom: 20px;
}

.form-input-group.color {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.form-input-group:focus-within {
  border-color: #1b84ff;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.form-input {
  border: none;
  font-size: 16px;
  width: 100%;
  outline: none;
}

.form-input-label {
  color: #99a1b7;
  font-size: 16px;
  transform: translateY(40%);
  transition: 0.3s;
}

.form-input-group:focus-within .form-input-label,
.form-input-group:has(.form-input:not(:placeholder-shown)) .form-input-label {
  font-size: 12px;
  transform: none;
}

.picker {
  width: 100%;
}

.picker-right {
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 2px;
}

.picker-open-btn {
  width: 16px;
  height: 16px;
}

.picker-open-btn img {
  transition: 0.3s;
}
</style>