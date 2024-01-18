<script setup>
import { ref } from "vue"
import ToDoService from '@/services/todo'
const $props = defineProps({
    modelValue: { type: Object, default: () => { return {} } },
    emptyValue: { type: Boolean }
})

const $emit = defineEmits(["update:modelValue", 'notEmpty', 'empty'])
const _item = ref({})

_item.value = { ...$props.modelValue }
const empty = ref("Empty")

function emitUpdate() {
    $emit("update:modelValue", _item.value)
}

//Accept button is disabled untill proper value is entered
function checkIfEmpty() {

    //$emit('notEmpty')
    if ($props.modelValue.text.trim() != '') {
        $emit('notEmpty')
    }
    else {
        $emit('empty')
    }

}

</script>

<template>
    <div class="w3-cell-row w3-padding">
        <div class="w3-cell w3-padding">

            <strong>Description: </strong>
            <input class="w3-input w3-border" type="text" v-model="$props.modelValue.text" @input="checkIfEmpty"
                @focus="checkIfEmpty" @blur="checkIfEmpty">

            <div v-if="_item.text != ''">
                <p>Value to edit: {{ _item.text }}</p>
                <p v-if="$props.emptyValue">Your value: <span class="w3-text-red">Cant be empty</span></p>
            </div>
            <div v-else-if="$props.emptyValue">
                <p>Your value: <span class="w3-text-red">Cant be empty</span></p>
            </div>

            <div v-else>
                <p>Your value: {{ $props.modelValue.text }}</p>
                <p>{{ _item.text }}</p>
            </div>
        </div>

        <div class="w3-cell w3-padding">
            <strong>Status</strong><br>
            <select class="w3-select w3-border" v-model.string="modelValue.status">
                <option v-for="state in ToDoService.getStatusList()" :key="state.id" :value="state.id">
                    {{ state.label }}
                </option>
            </select>
        </div>
    </div>
</template>