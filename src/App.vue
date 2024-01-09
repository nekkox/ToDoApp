<script setup>
import ToDoProject from '@/components/ToDoProject.vue'
import Header from '@/components/Header.vue'

</script>

<template>

<Header></Header>
<main>
<ToDoProject></ToDoProject>
</main>

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
