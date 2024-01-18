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
}

function clear() {
    // _value.value="";
    filterModel.value = ""
    publishValue()
}
</script>

<template>
    <div class="flex-container w3-border">
        <input class="w3-input w3-border-0" type="text" v-model="filterModel" placeholder="Enter filter text here..."
            @keyup.enter="publishValue()">
        <button class="w3-border-0" @click="clear()">
            <i class="fas fa-fw fa-times"></i>
        </button>
        <h3>{{ filterModel }}</h3>
        <h3>{{ _value }}</h3>
    </div>
</template>