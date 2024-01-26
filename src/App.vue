<script setup>
import ToDoProject from '@/components/ToDoProject.vue'
import Header from '@/components/Header.vue'
import SideBar from '@/components/Sidebar/Sidebar.vue'
import SideBar2 from '@/components/Sidebar/SideBar2.vue'

</script>

<template>
  <div class="app bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
    <Header class="h-10"></Header>
    <div class="wrapper">
      
      <div style="position: relative;">
        <SideBar class="sidebar"></SideBar>
      </div>
        <main class="">
          <!---  <ToDoProject></ToDoProject> -->
          <router-view></router-view>
        </main>
        <div style="position: relative;">
        <SideBar class="sidebar2"></SideBar>
      </div>
     
    </div>
  </div>
  <button>vvv</button>
</template>

<style scoped>
.app {
  
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: #333333;
  color: #EBEBEB;
}


.wrapper {
  display: grid;
  grid-template-columns: 13rem auto 13rem;

}

.sidebar {
   position: absolute;
  top: 0;
  left: 0;
  
  min-height: calc(100vh - 40px);
  max-height: 100vh;
}

.sidebar2 {
   position: absolute;
  top: 0;
  right: 0;
  
  min-height: calc(100vh - 40px);
  max-height: 100vh;
  
}
</style>
