<script setup>
import { computed } from 'vue';

const $props = defineProps({times: Number, content:String})
const repetitions = computed(()=>{return Array.from({length: $props.times})})
</script>

<template>
    {{ console.log(repetitions) }}
    <h2>Hello {{ $props.times }} {{ $props.content }}</h2>
    <div>
    <span v-for="r in repetitions" :key="r">
        {{ $props.content }}
        </span>
   
       
    </div>
    </template>