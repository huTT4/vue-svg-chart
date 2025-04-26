<template>
  <button class="btn"><slot>Добавить сектор</slot></button>
</template>

<style scoped>
.btn {
  padding: 15px;
  width: 100%;
  background-color: rgb(27, 132, 255);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
}

.btn:hover {
  transform: scale(1.01);
  background-color: rgb(27, 132, 255, 0.9);
}

.btn:active {
  transform: scale(0.99);
  background-color: rgb(11, 121, 248);
}
</style>