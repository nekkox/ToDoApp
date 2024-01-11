<script setup>
import ToDoService from '@/services/todo'
import { ref } from 'vue';
const $props = defineProps({
        modelValue: { type: Object, default: () => { return {} } }
    }),
   
    _item = ref({})

_item.value = { ...$props.modelValue }

//---

const itemModel = defineModel('the_item')
const _item2 = ref({})
_item2.value = itemModel

</script>

<template>
    <div>
        <div>
         <p> Item1: {{ _item }}</p>
          <p>Item2:  {{ _item2 }} </p>
          <p>itemModel:  {{ itemModel }} </p>
            <strong>Description: </strong>
            <input type="text" v-model="itemModel.text">
            
        </div>
        <div>
            <strong>Status</strong><br>
            <select v-model.string="itemModel.status">
                <option v-for="state in ToDoService.getStatusList()" :key="state.id" :value="state.id">
                    {{state.label}}
                </option>
            </select>
        </div>
    </div>
</template>