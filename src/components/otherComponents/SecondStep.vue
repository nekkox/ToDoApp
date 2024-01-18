<script setup>
import { ref } from 'vue';

const $props = defineProps(['props'])
const emits = defineEmits(["next", "back"])
const address = ref("");

const next = () => {
    emits("nextB");

};
const back = () => {
    emits("back", address.value);
};

</script>
<template>
    <div>
        <h1>Second Step</h1>
        <h3>Hello {{ $props.props.name }}</h3>
        <label> Address: <input v-model="address" /> </label>
        <button @click="nextB">Next</button>
        <button @click="back">Back</button>
    </div>
</template>