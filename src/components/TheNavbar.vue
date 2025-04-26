<template>
  <nav>
    <ul>
      <li>
        <router-link to="/svg">SVG-TASK</router-link>
      </li>
      <li>
        <router-link to="/chart">CHART-TASK</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: center;
  padding: 10px 15px;
  border-bottom: 1px solid rgb(85, 85, 85, 0.2);
  background-color: #f8f8f8;
}

ul {
  display: flex;
  gap: 25px;
}

li a {
  color: rgb(56, 56, 56);
  padding-bottom: 2px;
  position: relative;
  transition: all 0.3s ease;
}

li a::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #000;
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: 100px;
}

li a:hover::before,
li a.active::before {
  width: 100%;
}
</style>