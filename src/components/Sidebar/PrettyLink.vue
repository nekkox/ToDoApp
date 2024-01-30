<script setup>
import { onMounted, ref,watch } from 'vue';
import { RouterLink, useLink, useRoute } from 'vue-router'

const $props = defineProps({
    to: {
        type: Object,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    items: {
        type: Array,
        required: false
    },
    cssElement: {
        type: Object,
        required: false
    },
    projects: {
        type: Array,
        required: false
    }
}
)

const link = ref(null)
const $route = useRoute()
const $link = useLink(RouterLink.props)

function applyStyle(){
    let regex = /^\/app\/project\/(\d+)$/;
    let match = $route.fullPath.match(regex);
    let element = document.getElementById('xxx')
    let a = element.getElementsByTagName('a')[0]
    

if(match){
console.log('MATCHES',$route.fullPath);
console.log(link);
console.log($link);
console.log(element);
a.classList.add('active-link')
}else{
console.log('not matches', $route.fullPath);
console.log(link);
console.log($link);
console.log(element);
}
}

onMounted(()=>{
    applyStyle()
    
})

watch(() => $route.fullPath, applyStyle)

</script>

<template>
    <div>
        <router-link :to="$props.to" class="green" active-class="active-link" ref="link">
            <span class="actual-text4">&nbsp;
                <slot />&nbsp;
            </span>
            <span aria-hidden="true" class="hover-text">&nbsp;
                <slot />&nbsp;
            </span>
        </router-link>


        <div v-if="$props.projects && $props.projects.length > 0" class="h-64 overflow-x-auto overscroll-none mt-2">
            <div v-for="project in $props.projects" :key="project.id"
                class="cursor-pointer text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 hover:bg-gray-700 rounded-md mt-1"
                id="submenu">
                <router-link :to="{ name: 'project', params: { id: project.id } }" class="p-1 block"
                    active-class="text-left text-sm mt-2 block text-gray-200 font-bold bg-gray-700 rounded-md mt-1">
                    <slot name="link-list" :item="project" />
                </router-link>

            </div>

        </div>
    </div>
    {{ console.log(link) }}
    {{ console.log($link) }}
    {{ console.log('route',$route) }}
</template>
<style>
a.green {
    display: flex;
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
    text-decoration: none;
    /* Make sure anchor elements don't have underline by default */
    line-height: 45px;
}

/* button styling */
a.green {
    --border-right: 6px;
    --text-stroke-color: rgba(255, 255, 255, 0.6);
    --animation-color: #37FF8B;
    --fs-size: 2em;
    letter-spacing: 3px;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
}

/* this is the text, when you hover on button */
.hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);

}

/* hover */
a.green:hover .hover-text {
    width: 100%;
    transition: width 0.5s ease-in-out 0.1s;
    filter: drop-shadow(0 0 23px var(--animation-color));

}


.active-link .hover-text {

    width: 100%;
    filter: drop-shadow(0 0 7px var(--animation-color));
    color: var(--animation-color);
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    -webkit-text-stroke: 1px var(--animation-color);
    transition: filter 0.5s ease;
    /* Transition filter for a smooth effect */
}




div::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #151d2c;
}

div::-webkit-scrollbar
{
  width: 12px;
  background-color: #151d2c;
}

div::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}
</style>
