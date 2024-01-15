<script setup>
import { ref } from 'vue';

const message=ref("")
const $emits = defineEmits(['send'])

function clearMsg(){
    message.value='';
}

function emitMsg(){
$emits('send', {message:message.value, isSafe: true})
}

</script>

<template>

    <input type="text" v-model="message">
    <button @click="emitMsg()">Send Message</button>
    <button @click="clearMsg()">Clear Message</button>
    
</template>