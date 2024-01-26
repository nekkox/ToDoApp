<script setup>

import { useRouter } from 'vue-router'
const $router = useRouter()

const $props = defineProps({
    projectId: {
        type: Number,
        required: true
    },
    buttonText: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
})


function go(id) {
    // Programmatically navigate using router.push
    $router.push({ name: 'project', params: { id: id } });
}


</script>

<template>
    <button @click="go($props.projectId)" class="button add" :class="{ 'active-link': isActive }">
        <span class="actual-text">{{ buttonText }}</span>
        <span aria-hidden="true" class="front-text">{{ buttonText }}</span>
    </button>
</template>

<style scoped>
.button {
    position: relative;
    border: none;
    background: transparent;
    --stroke-color: #ffffff7c;
    --ani-color: rgba(95, 3, 244, 0);
    --color-gar: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    letter-spacing: 3px;
    font-size: 2em;
    font-family: "Arial";
    /*  text-transform: uppercase;*/
    color: transparent;
    -webkit-text-stroke: 1px var(--stroke-color);
    cursor: pointer;
}

.front-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    background: var(--color-gar);
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200%;
    overflow: hidden;
    transition: all 1s;
    animation: 8s ani infinite;
    border-bottom: 1px solid transparent;
}

.button:hover .front-text {
    width: 100%;
    border-bottom: 1px solid #03a9f4;
    -webkit-text-stroke: 1px var(--ani-color);
}

@keyframes ani {
    0% {
        background-position: 0%;
    }

    50% {
        background-position: 400%;
    }

    100% {
        background-position: 0%;
    }
}

.add {
    font-size: 17px;
    font-weight: 300;
    height: 45px, ;
    line-height: 20px;
}


.active-link .front-text {
    border-bottom: 1px solid #03a9f4;
    width: 100%;
}
</style>