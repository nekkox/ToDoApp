<script setup>
import ToDoProject from '@/components/ToDoProject.vue'
import Header from '@/components/Header.vue'
import SideBar from '@/components/Sidebar/Sidebar.vue'

</script>

<template>
  <div class="app bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
    <Header class="h-10"></Header>
    <div id="wrapper">
      <div class="relative ">
      <SideBar class="sidebar"></SideBar>
    </div>
      <main class="w3-container">
        <!---  <ToDoProject></ToDoProject> -->
        <router-view ></router-view>
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

.sidebar{
  position: absolute;
  top: 0;
  left: 0;
  min-height: calc(100vh - 40px);
  max-height: 100vw;
}
#wrapper {
  display: grid;
  grid-template-columns: 13rem auto;
  justify-items: stretch;
}
</style>
