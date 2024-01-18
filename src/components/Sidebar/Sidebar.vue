<script setup>
import {ref} from "vue"
const _projects = ref([{name: 'project1', id: 1},{name: 'project2', id: 2}])

</script>

<template>

<section class="w3-blue">
    <h4 class="w3-row-padding">To-Do-Projects</h4>
    <router-link :to="{name:'landing'}" class="w3-padding" active-class="w3-yellow"> Home </router-link>


     <!-- Projecs -->
     <div v-for="project in _projects" :key="project.id">
<router-link
:to="{name: 'project', params: {id:project.id}}"
active-class="w3-yellow"
class="w3-padding"
>{{ project.name }}</router-link>
     </div>
</section>

</template>
<style scoped>
#sidebar{



}
</style>