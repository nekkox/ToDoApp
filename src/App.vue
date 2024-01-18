<script setup>
import ToDoProject from '@/components/ToDoProject.vue'
import Header from '@/components/Header.vue'

</script>

<template>
  <div class="app">
    <Header></Header>
    <main class="w3-container">
      <ToDoProject></ToDoProject>
    </main>
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  background-color: #333333;
  color: #EBEBEB;
}
</style>
