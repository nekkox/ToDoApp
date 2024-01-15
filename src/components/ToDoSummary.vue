<script setup>
import Inside from '@/components/Inside.vue'
import CustomSelect from '@/components/CustomSelect.vue'
import Message from '@/components/Message.vue'
import Hello from '@/components/Hello.vue'
import Steps from '@/components/Steps.vue'
import { computed, onMounted, ref, watch } from 'vue';

const $props = defineProps(['items'])
const count = ref(22)
const divideByTwo = ref(0)
const myData = ref("Vego")
onMounted(() => {

})

watch(myData, (newData, Olddata) => {
    console.log('myDataProperty changed:', newData,
        Olddata);
})

function changeData() {
    myData.value = "beco"

}

const tr = computed(() => {

})

const incrementOne = computed({
    get() {
        return count.value + 1
    },
    set(value) {
        count.value = value - 1
        divideByTwo.value = value / 2
    }

})
const methodFilterList = ref([])
const input = ref("")
function searchMethod(e) {
    methodFilterList.value = frameworkList.value.filter((item) => item.toLowerCase().includes(input.value.toLowerCase()))
    console.log(methodFilterList);
}
const frameworkList = ref(['React', 'Backbone', 'Ember', 'Knockout', 'jQuery', 'Angular'])
const CompList = computed(() => methodFilterList.value = frameworkList.value.filter((item) => item.toLowerCase().includes(input.value.toLowerCase()))
)

const animals = ref(['mice', 'cat'])
const animal = computed(() => {

    return animals.value[0]
})

const countx = ref(1)
function increment() {
    countx.value += 1
}

const selected = ref('cheese-onion')
const options = ref([{
    value: 'ready-salted',
    label: 'Ready Salted'
},
{
    value: 'cheese-onion',
    label: 'Cheese & Onion'
},
{
    value: 'salt-vinegar',
    label: 'Salt & Vinegar'
},

])

const parentMessage = ref("")
function updateParentMessage(newMessage){
    console.log(newMessage);
    console.log(event);
    parentMessage.value=newMessage
}

const helloMsg = ref("x")

</script>

<template>
    <input type="number" v-model="incrementOne" />
    <h3>Get input: {{ incrementOne }}</h3>
    <h5>Set division: {{ divideByTwo }}</h5>
    <h1>{{ myData }}</h1>
    <button @click="changeData()">changedata</button>
    <h1>Methods vs watchers vs computed props</h1>
    <input type="text" placeholder="Search with method" v-model="input" @keyup="searchMethod" />
    <p>{{ input }}</p>
    <ul>
        <li v-for="(item, i) in frameworkList" :key="i">
            {{ item }}</li>
    </ul>

    <p>LISTA: </p>
    <ul>
        <li v-for="(item, i) in methodFilterList" :key="i">
            {{ item }}</li>
    </ul>
    {{ console.log("Computed") }}
    {{ console.log(CompList) }}

    {{ console.log(animal) }}
    <p>{{ animal }}</p>

    <Inside :times="countx" content="repeat"></Inside>
    <button @click="increment()">Repeatt</button>

    <CustomSelect :selected="selected" :options="options" />

    <h2 >The Message: {{ parentMessage  }}</h2>
    <Message @send="console.log($event)"></Message>

   

</template>