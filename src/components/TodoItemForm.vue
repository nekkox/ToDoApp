<script setup>
import { ref } from "vue"
import ToDoService from '@/services/todo'
const
    $props = defineProps({
        modelValue: { type: Object, default: () => { return {} } }
    }),
    $emit = defineEmits(["update:modelValue"]),
    _item = ref({})

_item.value = { ...$props.modelValue }

function emitUpdate() {
    $emit("update:modelValue", _item.value)
}


</script>

<template>
    <div>
        <div>

            <strong>Description: </strong>
            <input type="text" v-model="modelValue.text">
            
        </div>
        <div>
            <strong>Status</strong><br>
            <select v-model.string="modelValue.status">
                <option v-for="state in ToDoService.getStatusList()" :key="state.id" :value="state.id">
                    {{state.label}}
                </option>
            </select>
        </div>
    </div>
</template>