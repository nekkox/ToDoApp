
import ModalVue from '@/plugins/modals/Modal.vue';

import { inject } from 'vue';
<script setup>
import { inject, ref } from "vue"
import eventBus from '@/services/eventBus'
import ToDoService from "@/services/todo";
//import ToDoService from '@/services/todo'

const $modal = inject("$modals")
const _projectName = ref("")

//Create new project in localstorage if 
function newProject() {
    _projectName.value = ""
    $modal
        .show("NewProject")
        .then(() => {
            if(_projectName.value != ''){
                ToDoService.createToDoProject(_projectName.value)
                eventBus.emit("UpdateProjects")
                console.log("New Project Created")
            }
            
        },
            () => {
                return console.log("Creating new project cancelled")
            })
}



</script>

<template>
    <div class="landing-wrapper">
        <h1 class="w3-bottombar">
            <i class="fa-solid fa-list-check w3-text-purple"></i>
            Landing page
        </h1>
        <p>
            Create a new project or select one from the sidebar.
        </p>
        <p>
            This route was defined as static in our router.
        </p>
        <button @click="newProject()">
            New project
        </button>

        <!-- Modal -->
        <Modal name="NewProject" title="New To-Do Project">
            <strong>Name</strong>
            <input type="text" class="w3-input w3-border" placeholder="Enter project name..." v-model="_projectName">
        </Modal>
        <p>{{ _projectName }}</p>
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