<script setup>

// Sample array of dogs
const dogArray = ['Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'Bulldog', 'Poodle'];
let intervalId;
// Function to get array of dogs at intervals
function getDogArrayAtIntervals() {
  let currentIndex = 0;

  const intervalId = setInterval(() => {
    if (currentIndex === dogArray.length) {
      currentIndex = 0;
    }

    const currentDog = dogArray[currentIndex];
    console.log('Current Dog:', currentDog);
    currentIndex++;
  }, 1000);
  return intervalId
}

function stop(intervalId){
   
    if (intervalId) {
    clearInterval(intervalId);
    console.log('Interval stopped.');
  }
}
    



</script>

<template>
    <button @click="intervalId = getDogArrayAtIntervals()">Yes</button> <button @click="stop(intervalId)">No</button>
</template>