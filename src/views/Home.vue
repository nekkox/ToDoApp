<script setup>
import { inject, reactive, ref } from "vue"
import eventBus from '@/services/eventBus'
import ToDoService from "@/services/todo";
import { useRouter } from 'vue-router'



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
</script>

<template>
    <div class="landing-wrapper">
        <h1 class=" text-4xl pb-5 mb-5 border-solid border-b-4 border-indigo-500 shadow-lg ">
            <i class="fa-solid fa-list-check w3-text-purple"></i>
            HOME PAGE

        </h1>
    </div>
</template>

<style scoped>
.landing-wrapper {
    padding: 10rem;
    margin: 0 auto;
    min-width: 40rem;
    max-width: 60rem;
}




.copy-box {
    position: relative;
    display: inline-block;
    margin: 0 auto;
    width: 200px;
    background-color: #111111;
    color: #333333;
    font-family: sans-serif;
    padding: 20px;
}

.copy-box .line {
    position: absolute;
    background-color: aqua;
    box-shadow: 0px 0px 12px aqua;
    width: 4px;
    height: calc(100% - 20px);
    top: 10px;
    left: 22px;
    border-radius: 50%;
    overflow: hidden;
}

.copy-box.two .line {
    border-radius: 0;
    width: 2px;
}

.copy-box .line .scanner {
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    width: 100%;
    height: 20px;
    border-radius: 50%;
    animation: scanner-loop 3s ease-in-out infinite;
}

.copy-box.two .line .scanner {
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    height: 50%;
}

@keyframes scanner-loop {
    0% {
        top: 0;
    }

    50% {
        top: 100%;
    }

    100% {
        top: 0;
    }
}

.copy-box .inner {
    padding: 30px;
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
    text-transform: uppercase;
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
    border-bottom: 2px solid transparent;
}

.button:hover .front-text {
    width: 100%;
    border-bottom: 2px solid #03a9f4;
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
</style>