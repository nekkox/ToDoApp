<script setup>
import { onMounted, ref } from 'vue';

const filterModel = defineModel();
const _value = ref("")

onMounted(() => {
    // _value.text = filterModel
})

function publishValue() {
    // filterModel.value = _value.value
    console.log("done");
    console.log(filterModel);
    _value.value = filterModel.value
}

function clear() {
    // _value.value="";
    filterModel.value = ""
    publishValue()
}
</script>

<template>
    <div>
        <p class="mb-3 text-2xl drop-shadow-lg" style="color: #E91E63;"><i class="drop-shadow-lg fa-regular fa-magnifying-glass pr-2" style="color: #E91E63;"></i>Search: {{ filterModel }}</p>
    
    <div class="flex-container w3-border">
        <input class="w3-input w3-border-0" type="text" v-model="filterModel" placeholder="Enter filter text here..." @keyup.enter="publishValue()">
        <button class="w3-border-0" @click="clear()">
            <i class="fas fa-fw fa-times"></i>
        </button>
    </div>
   
        
</div>
</template>