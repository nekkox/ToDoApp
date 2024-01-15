<script setup>
import { computed, defineProps, watch, ref, reactive } from 'vue';

const $props = defineProps(['message'])
const isEmpty = computed(() => {
    return $props.message == '' ? false : true
})

const discount = ref(5);
const pizza = reactive({
    name: "Pepperoni Pizza",
    price: 10,
});

const newPrice = ref();

watch(
    discount,
    (newValue) => {
        newPrice.value = pizza.price - (pizza.price *
            newValue) / 100;
    },
    {
        immediate: true
    }
);

const updateDiscount = () => {
    discount.value = discount.value + 5;
};
</script>

<template>
    <div>
        <h1>{{ pizza.name }}</h1>
        <div>
            Monday Special: {{ discount }}% off!
            <strike>Was ${{ pizza.price }}</strike>
            <strong> Now at ${{ newPrice }} ONLY</strong>
        </div>
    </div>
    <button @click="updateDiscount" class="decrease-btn">
        Get a discount!
    </button>
</template>