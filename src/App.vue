<script setup>
import ToDoProject from '@/components/ToDoProject.vue'
import Header from '@/components/Header.vue'
import SideBar from '@/components/Sidebar/Sidebar.vue'

</script>

<template>
  <div class="app">
    <Header></Header>
    <div id="wrapper">
      <SideBar></SideBar>
      <main class="w3-container">
        <!---  <ToDoProject></ToDoProject> -->
        <router-view></router-view>
      </main>
    </div>
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

#wrapper {
  display: grid;
  grid-template-columns: 12rem auto;
  justify-items: stretch;
}
</style>
