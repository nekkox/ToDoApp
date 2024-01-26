<script setup>
import { RouterLink } from 'vue-router'

const $props = defineProps({
    to: {
        type: Object,
        required: true
    },
    text: {
        type: String,
        required: false
    },
    items: {
        type: Array,
        required: false
    }
}
)

</script>

<template>
    <div>
        <router-link :to="$props.to" class="button4" active-class="active-link">
            <span class="actual-text4">&nbsp;
                <slot />&nbsp;
            </span>
            <span aria-hidden="true" class="hover-text4">&nbsp;
                <slot />&nbsp;
            </span>
        </router-link>

        <div v-if="$props.items && $props.items.length > 0">
            <ul>
                <li v-for="(item, index) in $props.items" :key="index">
                    <slot name="link-list" :item="item" />
                </li>
            </ul>
        </div>

    </div>
</template>

<style>
a.button4 {
    display: flex;
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
    text-decoration: none;
    /* Make sure anchor elements don't have underline by default */
    line-height: 45px;
}

/* button styling */
a.button4 {
    --border-right: 6px;
    --text-stroke-color: rgba(255, 255, 255, 0.6);
    --animation-color: #37FF8B;
    --fs-size: 2em;
    letter-spacing: 3px;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
}

/* this is the text, when you hover on button */
.hover-text4 {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);

}

/* hover */
a.button4:hover .hover-text4 {
    width: 100%;
    transition: width 0.5s ease-in-out 0.1s;
    filter: drop-shadow(0 0 23px var(--animation-color));

}


.active-link .hover-text4 {

    width: 100%;
    filter: drop-shadow(0 0 7px var(--animation-color));
    color: var(--animation-color);
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    -webkit-text-stroke: 1px var(--animation-color);
    transition: filter 0.5s ease;
    /* Transition filter for a smooth effect */
}
</style>
