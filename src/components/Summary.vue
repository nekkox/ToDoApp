<script setup>
import ToDoService from '@/services/todo'
import { computed } from 'vue';

const $props = defineProps({
    items: {
        type: Array,
        default: () => []
    }
})

//get all available statuses
const _status = computed(() => {
    let status = {}
    ToDoService.getStatusList().forEach((stat) => status[stat.id] = 0)

    $props.items.forEach((todo) => { status[todo.status] += 1; })

    console.log(status);
    return status
})

</script>

<template>
    <div class="summary-wrapper">
        <div class="w3-deep-purple w3-padding w3-center">
            <strong>Pending</strong>
            <h2>{{ _status?.not_started }}</h2>
        </div>
        <div class="w3-sand w3-padding w3-center">
            <strong>In progress</strong>
            <h2>{{ _status?.in_progress }}</h2>
        </div>
        <div class="w3-cyan w3-padding w3-center">
            <strong>Completed</strong>
            <h2>{{ _status?.completed }}</h2>
        </div>
    </div>
</template>

<style scoped>
.summary-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    justify-items: stretch;
    margin-top: 10px;
}
</style>