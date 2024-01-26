<script setup>

</script>

<template>
    <header class=" w3-padding glow">
        <i class="fa-solid fa-fw fa-list-check"></i>
        To-Do List
    </header>
</template>

<style scoped>
header{
 
  background: #0f1522;
  box-shadow: 0px 1px 2px hwb(180 0% 0% / 0.5), 
              0px 2px 4px rgba(0,255,255,0.5), 
              0px 4px 8px rgba(0,255,255,0.5), 
              0px 8px 16px rgba(0,255,255,0.5);
}

.glow {
      
      background: #121929;
      box-shadow: 0px 1px 2px rgba(0, 255, 255, 0.0),
                  0px 2px 4px rgba(0, 255, 255, 0.0),
                  0px 4px 8px rgba(0, 255, 255, 0.0),
                  0px 8px 16px rgba(0, 255, 255, 0.0);
      animation: glowAnimation 5s infinite alternate;
    }

    @keyframes glowAnimation {
      from {
        box-shadow: 0px 1px 2px rgba(0, 255, 255, 0.0),
                    0px 2px 4px rgba(0, 255, 255, 0.0),
                    0px 4px 8px rgba(0, 255, 255, 0.0),
                    0px 8px 16px rgba(0, 255, 255, 0.0);
      }
      to {
        box-shadow: 0px 2px 4px rgba(0, 255, 255, 0.3),
                    0px 4px 8px rgba(0, 255, 255, 0.3),
                    0px 8px 16px rgba(0, 255, 255, 0.3),
                    0px 16px 32px rgba(0, 255, 255, 0.3);
      }
    }
</style>