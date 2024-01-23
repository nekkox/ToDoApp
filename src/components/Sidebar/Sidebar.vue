<script setup>
import { onMounted, onBeforeUnmount, ref, computed, watch } from "vue"
import eventBus from '@/services/eventBus'
import ToDoServie from '@/services/todo'
import { store } from '@/services/store'
import { useRouter, useRoute } from 'vue-router'


const _projects = ref([])
const activeProjectId = ref(null)
//const currentProjectId = ref(null)
const $router = useRouter()


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
          class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <h4 class="w3-row-padding">To-Do-Projects</h4>
          <router-link :to="{ name: 'landing' }" class="" active-class=""> Home </router-link>

          <!-- Tab with Projecs -->
          <div v-for="project in _projects" :key="project.id" class="pl-2 text-center mb-3 border-b pb-2 border-zinc-700">
               <button @click="go(project.id)" class="button add" data-text="Awesome"
                    :class="{ 'active-link': isActive(project.id) }">
                    <span class="actual-text">{{ project.name }}</span>
                    <span aria-hidden="true" class="front-text">{{ project.name }}</span>
               </button>
          </div>
     </section>
</template>
<style scoped>
section {
     background-color: #1a2536;
}

a {
     text-decoration: none;
     display: block;
     padding: 4px;
}

.button {
     position: relative;
     border: none;
     background: transparent;
     --stroke-color: #ffffff7c;
     --ani-color: rgba(95, 3, 244, 0);
     --color-gar: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
     letter-spacing: 3px;
     font-size: 2em;
     font-family: "Arial";
     /*  text-transform: uppercase;*/
     color: transparent;
     -webkit-text-stroke: 1px var(--stroke-color);
     cursor: pointer;
}

.front-text {
     position: absolute;
     top: 0;
     left: 0;
     width: 0%;
     background: var(--color-gar);
     -webkit-background-clip: text;
     background-clip: text;
     background-size: 200%;
     overflow: hidden;
     transition: all 1s;
     animation: 8s ani infinite;
     border-bottom: 1px solid transparent;
}

.button:hover .front-text {
     width: 100%;
     border-bottom: 1px solid #03a9f4;
     -webkit-text-stroke: 1px var(--ani-color);
}

@keyframes ani {
     0% {
          background-position: 0%;
     }

     50% {
          background-position: 400%;
     }

     100% {
          background-position: 0%;
     }
}

.add {
     font-size: 17px;
     font-weight: 300;
     height: 45px, ;
     line-height: 20px;
}


.active-link .front-text {
     border-bottom: 1px solid #03a9f4;
     width: 100%;
}
</style>