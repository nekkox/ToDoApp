<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue"
import eventBus from '@/services/eventBus'
import ToDoServie from '@/services/todo'
//const _projects = ref([{ name: 'project1', id: 1 }, { name: 'project2', id: 2 }])

const _projects = ref([])
UpdateProjects();
onMounted(() => eventBus.on('UpdateProjects', UpdateProjects))

onBeforeUnmount(() => {
     // De-register events (Clean after yourself!)
     eventBus.off("UpdateProjects", UpdateProjects)
})

function UpdateProjects() {
     let projects = ToDoServie.loadProjectsMain()
     _projects.value = projects.list
}

console.log(_projects.value);
</script>

<template>
     <section class="w3-bar-block w3-blue-gray w3-card w3-border-right w3-border-black">
          <h4 class="w3-row-padding">To-Do-Projects</h4>
          <router-link :to="{ name: 'landing' }" class="w3-padding" active-class="w3-yellow"> Home </router-link>


          <!-- Projecs -->
          <div v-for="project in _projects" :key="project.id">
               <router-link :to="{ name: 'project', params: { id: project.id } }" active-class="w3-yellow"
                    class="w3-padding">
                    {{ project.name }}
               </router-link>
          </div>
     </section>
</template>
<style scoped>
a {
     text-decoration: none;
     display: block;
     padding: 4px;
}

section {
     height: 500px;

}
</style>