<script setup>
import { onMounted, onBeforeUnmount, ref, computed, watch } from "vue"
import eventBus from '@/services/eventBus'
import ToDoServie from '@/services/todo'
import { store } from '@/services/store'
import { useRouter, useRoute, useLink, RouterLink } from 'vue-router'
import Link from '@/components/Sidebar/Link.vue'


import PrettyLink from '@/components/Sidebar/PrettyLink.vue'


const _projects = ref([])
const activeProjectId = ref(null)
//const currentProjectId = ref(null)
const $router = useRouter();
const $link = useLink(RouterLink.props)
console.log($link);
console.log(RouterLink);
console.log($router);

watch(
     () => store.routeId, (toParams, previousParams) => {
          console.log("Watcher:", toParams, previousParams);
          // activeProjectId.value = isActive(store.routeId)
     }
)

UpdateProjects();

onMounted(() => {
     eventBus.on('UpdateProjects', UpdateProjects)
     eventBus.on('newRoute', onRouteChange)
})

onBeforeUnmount(() => {
     // De-register events (Clean after yourself!)
     eventBus.off("UpdateProjects", UpdateProjects)
})

function UpdateProjects() {
     let projects = ToDoServie.loadProjectsMain()
     _projects.value = projects.list
     console.log("changed");

}

function onRouteChange(type, e) {
     // currentProjectId.value = store.routeId
     //console.log('Route changed!!!! currentProjectId', currentProjectId.value);
     //  xxx.value = _projects.value.some(project => project.id == store.currentProjectId) ? store.currentProjectId : null
}

//check if cuurrent prote is the same as project id. Function used to set active link in sidebar
function isActive(projectId) {
     let eq = parseInt(store.routeId) == parseInt(projectId);
     return eq;
}


function go(id) {
     // Programmatically navigate using router.push
     $router.push({ name: 'project', params: { id: id } });
}

</script>

<template>
     <section
          class="w-48 text-sm font-medium text-gray-900 bg-white border-x border-zinc-700 rounded-b-lg dark:bg-gray-700 dark:border-zinc-700 dark:text-white">

        <!--  <router-link :to="{ name: 'landing' }" class="m-4 text-center" active-class="home"> New </router-link> -->
      <PrettyLink :to="{ name: 'landing' }"> Home </PrettyLink>

          <div v-for="project in _projects" :key="project.id" class="pt-2 pb-2 mt-2 mb-2 ">
               <PrettyLink :to="{ name: 'project', params: { id: project.id } }" :items="['a', 'b', 'c']">
                    {{ project.name }}

                    <template #link-list="SlotProps">
                         {{ SlotProps.item }}
                    </template>

               </PrettyLink>
          </div>

     </section>
</template>
<style scoped>
section {
     background-color: #121929;
}

.home {
     background-color: aqua;
}

</style>