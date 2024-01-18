<script setup>
import { ref } from 'vue';

const $props = defineProps(['props'])
const name = ref("")
const emits = defineEmits(['next'])


const next = () => {
    emits('next', name.value);
    //console.log(name.value);
};

</script>

<template>
    <div>
        <h1>First Step</h1>
        <label> Your name:
            <input type="text" v-model="name">
        </label>
        <button @click="next">Next</button>
    </div>
</template>