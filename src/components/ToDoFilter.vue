<script setup>
import { onMounted, ref } from 'vue';

const filterModel = defineModel();
const _value = ref("")

onMounted(()=>{
    _value.text = filterModel
})

function publishValue(){
    filterModel.value = _value.value
    console.log("done");
    console.log(_value);
    console.log(filterModel);
}

function clear(){
    _value.value="";
    publishValue()
}
</script>

<template>
     <div >
        <input  type="text" 
                v-model="_value"
                @keyup="publishValue()"
                placeholder="Enter filter text here..."
                >
        <button @click="clear()">
            <i class="fas fa-fw fa-times"></i>
        </button>
        <h3>{{ filterModel }}</h3>
        <h3>{{ _value }}</h3>
    </div>
</template>