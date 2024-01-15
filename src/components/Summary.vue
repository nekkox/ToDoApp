<script setup>
import ToDoService from '@/services/todo'
import { computed } from 'vue';
const $props = defineProps({
    items: {
        type: Array,
        default: () => { }
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
    <ul>
        <li v-for="item in items" :key="item.id">
            {{ item.text }}
        </li>
    </ul>
    <div class="summary-wrapper">
        <div>
            <strong>Pending</strong>
            <h2>{{_status?.not_started}}</h2>
        </div>
        <div>
            <strong>In progress</strong>
            <h2>{{_status?.in_progress}}</h2>
        </div>
        <div>
            <strong>Completed</strong>
            <h2>{{_status?.completed}}</h2>
        </div>
    </div>
    
</template>