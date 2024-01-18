<script setup>
import FirstStep from "@/components/FirstStep.vue"
import SecondStep from "@/components/SecondStep.vue"
import { computed, defineComponent, onMounted, reactive, ref, shallowRef } from "vue";


const components = { FirstStep, SecondStep }
const dynamicComponent = ref("FirstStep")

const gatheredValues = reactive(
    {
        name: null,
        address: null
    }
)
const dynamicProps = ref({})

function changeComponent($event, dynamicComponent) {
    console.log($event);
    switch (dynamicComponent) {
        case 'FirstStep':
            console.log("In FirstStep Component");
            gatheredValues.address = $event
            break;
        case 'SecondStep':
            console.log("In SecondStep Component");
            dynamicProps.value = {
                name: $event
            }
            gatheredValues.name = $event
            break;
        default:
            console.log("Not sych component found");

    }

}

</script>

<template>
    <div id="container">
        <div>
            <h3>Hello from STEPS</h3>
        </div>

        <div>
            <keep-alive>
                <component :is=components[dynamicComponent]
                    @next="changeComponent($event, dynamicComponent = 'SecondStep');"
                    @back="changeComponent($event, dynamicComponent = 'FirstStep')" :props="dynamicProps" />
            </keep-alive>
            {{ console.log(gatheredValues) }}
        </div>

    </div>
</template>

<style scoped>
#container {
    width: 500px;
    height: 500px;
    background-color: #333333;
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: center
}
</style>