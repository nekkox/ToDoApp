<script setup>

//Conponent shows all items or only the filtered ones. Each item has its own status that can be toggled, 
//button EDIT and DELETE that emits events back to parent component when clicked
import { computed } from 'vue';
const itemsModel = defineModel()
const props = defineProps(['filter'])
const emit = defineEmits(['toggle', 'edit', 'delete'])

const _filtered_list = computed(() => {
    if (props.filter) {
        return itemsModel.value.filter((item) => {
            return item.text.toUpperCase().includes(props.filter.toUpperCase())
        })
    } else {
        return itemsModel.value;
    }
})

function emitEvent(event_name, payload) {
    emit(event_name, payload)
}

</script>

<template>
    <div>
        <table class="w3-table">
            <thead>
                <tr class="w3-bottombar w3-topbar w3-border-pink">
                    <th>Status</th>
                    <th>Item</th>
                    <th class="w3-right-align">
                        <slot></slot>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in _filtered_list" :key="item.id">
                    <td class="clickable w3-hover-dark-gray" @click="emitEvent('toggle', item)">
                        <i class="fa-solid fa-2x fa-square w3-text-light-gray" v-if="item.status == 'not_started'"></i>
                        <i class="fa-solid fa-2x fa-square-minus w3-text-teal" v-if="item.status == 'in_progress'"></i>
                        <i class="fa-solid fa-2x fa-square-check w3-text-green" v-if="item.status == 'completed'"></i>
                    </td>
                    <td>{{ item.text }}</td>
                    <td class="w3-right-align">
                        <span
                            class="clickable w3-transparent w3-text-blue w3-hover-text-blue w3-margin-right w3-hover-sepia"
                            @click="emitEvent('edit', item)">
                            <i class="fa-solid fa-pen-to-square"></i>
                            Edit
                        </span>

                        <span class="clickable w3-transparent w3-text-purple w3-hover-text-red w3-hover-sepia"
                            @click="emitEvent('delete', item)">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                        </span>
                    </td>
                </tr>
                <tr v-if="_filtered_list.length == 0">
                    <td><i class="fa-solid fa-square w3-text-pink"></i></td>
                    <td class="">The list is empty.</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>