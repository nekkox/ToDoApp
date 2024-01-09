<script setup>
import ToDoService from '@/services/todo'
import { ref } from 'vue';
const item = ref("")
function getNewItem(){
  item.value = ToDoService.getDefaultItem()
  console.log(item);
}

</script>

<template>
  <p>hello</p>
  <button @click="getNewItem">Get new item</button>



</template>

<style scoped>
header {
  line-height: 1.5;
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
