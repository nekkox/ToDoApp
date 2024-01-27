<script setup>
import { inject, reactive, ref } from "vue"
import eventBus from '@/services/eventBus'
import ToDoService from "@/services/todo";
import { useRouter } from 'vue-router'
import ToDoServie from '@/services/todo'


// Initialization for ES Users
const slotP = ref()
const $modal = inject("$modals")
const _projectName = ref("")
const $router = useRouter()
//Create new project in localstorage if 
function newProject() {
    _projectName.value = ""
    $modal
        .show("NewProject")
        .then(() => {
            //max 10 signs
            if (_projectName.value != '' && _projectName.value.length <= 10) {
                ToDoService.createToDoProject(_projectName.value)
                eventBus.emit("UpdateProjects")
                //get the last created project
                console.log("New Project Created")
                let createdProjectId = ToDoService.getProjectId(_projectName.value)
                go(createdProjectId)

            }
        },
            () => {
                return console.log("Creating new project cancelled")
            })
}

function go(id) {
    // Programmatically navigate using router.push
    $router.push({ name: 'project', params: { id: id } });
}

const _projects = ref([])

function UpdateProjects() {
     let projects = ToDoServie.loadProjectsMain()
     _projects.value = projects.list
     console.log("changed");

}

UpdateProjects()
</script>

<template>
    <div class="landing-wrapper">
        <h1 class=" text-4xl pb-5 mb-5 border-solid border-b-4 border-indigo-500 shadow-lg ">
            <i class="fa-solid fa-list-check w3-text-purple"></i>
            All To Do
        </h1>

        <div v-for="project in _projects" :key="project.id" >
              <router-link :to="{ name: 'project', params: { id: project.id } }">
{{ project.name }}

              </router-link>
          </div>



    </div>
</template>

<style scoped>
.landing-wrapper {
    padding: 10rem;
    margin: 0 auto;
    min-width: 40rem;
    max-width: 60rem;
}
</style>