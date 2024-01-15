<template>
    <select>
        <option :selected="selected === o.value" v-for="o in options" :key="o.value">
            {{ o.label }}
        </option>
    </select>
</template>

<script setup>
const $props = defineProps({
    selected: {
        type: String
    },
    options: {
        type: Array
    }
})


</script>