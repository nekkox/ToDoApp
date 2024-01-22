<script setup>
import { onMounted, ref, onUnmounted } from 'vue';

const paragraph = ref("")
const canvasRef = ref(null)

function getLastNumber(inputString) {
    // Ensure the input is a non-empty string
    if (typeof inputString === 'string' && inputString.length > 1) {
        // Use the charAt() method to get the last character
        return inputString.substring(inputString.length - 2);
    } else {
        // Return an appropriate value for empty or non-string inputs
        return null; // You can also return an empty string, throw an error, etc.
    }
}


const resizeCanvas = () => {
    const canvas = canvasRef.value;

    canvas.width = 500;
    canvas.height = 500;
    canvas.style.backgroundColor = "yellow";

    // Redraw graphics on resize
    drawGraphics();
};

// Function to draw graphics on the canvas
const drawGraphics = () => {
    const squareWidth = window.innerWidth;
    const squareHeight = window.innerHeight;
    const scale = getLastNumber(String(squareWidth));
    console.log(scale);
    const canvas = canvasRef.value;
    const ctx = canvas.getContext('2d');
    const randomNumber1 = Math.floor(Math.random() * 255) + 1;
    const randomNumber2 = Math.floor(Math.random() * 255) + 1;
    const randomNumber3 = Math.floor(Math.random() * 255) + 1;

    // Your drawing logic here
    ctx.fillStyle = `rgb(
                ${randomNumber1}
                ${randomNumber2}
                ${randomNumber3})`;
    ctx.translate(100 - scale, 500 - scale)
    ctx.fillRect(10, 10, 50, 50);

    // Add more drawing commands as needed
};



function newP() {
    const parent = document.querySelector('#wrapper2');
    const content = document.createTextNode(paragraph.value);
    const newP = document.createElement('p');
    newP.append(content)
    parent.append(newP)
}


const rootNode = document.body;
eachNode(rootNode, getNode);

function eachNode(rootNode, callback) {
    // If no callback is provided, return an array of all nodes
    if (!callback) {
        const nodes = [];
        eachNode(rootNode, (node) => {
            nodes.push(node);
        });
        console.log(nodes);
        return nodes;
    }

    // Apply the callback to the current node
    if (callback(rootNode) === false) {
        return false;
    }

    // Recursively traverse child nodes
    if (rootNode.hasChildNodes()) {
        for (const node of rootNode.childNodes) {
            if (eachNode(node, callback) === false) {
                return;
            }
        }
    }
}

function getNode(node) {
    if (node.tagName !== undefined) {
        console.log(node.tagName)
    } else {
        return false;
    }
}

eachNode(rootNode);



onUnmounted(() => {
    // Remove event listener on component unmount
    window.removeEventListener('resize', resizeCanvas);
    // Example: Print the tag name of each node
});

const rangeT = ref(null)

onMounted(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    const parent = document.querySelector('#wrapper2');
    const elements = parent.getElementsByTagName('p')
    console.log(elements);

    const r = rangeT.value
    const range = document.createRange()
    range.selectNodeContents(r.firstChild)
    console.log(range.startContainer.textContent);

})

const getName = (name) => (option) => `${name} ${option}`.toUpperCase();
let nameGetter = getName('vego');
let result = nameGetter('world');
const getN = (name) => name;
const getO = (name) => (option) => `${name} ${option}`.toUpperCase()
console.log(
    getO('beco')('ppp')
);

const placeholder = ref("value to add")


let company = { // the same object, compressed for brevity
    sales: [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 1600 }],
    development: {
        sites: [{ name: 'Peter', salary: 2000 }, { name: 'Alex', salary: 1800 }],
        internals: [{ name: 'Jack', salary: 1300 }]
    }
};

function sum(object) {


    if (Array.isArray(object)) {
        console.log("YES")
    } else {
        console.log("No")
    }

}

const list = {

    value: "item1",
    next: {
        value: "item2",
        next: {
            value: "item3",
            next: null
        }
    }

}
let number = 0;
function getItem(list, number = 0) {

    console.log(list.value);
    if (list.next) {

        list = list.next

        getItem(list, number + 1)

    } else {
        console.log("Number of items: ", number);
    }
}

sum(company);
getItem(list)


function outerFunction() {
    let outerVariable = 'I am from the outer function';
    let name = 'vego'

    function innerFunction() {
        console.log(name);
        console.log(outerVariable);
        name += 'Beco'
        console.log(name);
        return name
    }
    console.log(name);
    return innerFunction;
}

const closureFunction = outerFunction();
console.log(closureFunction());

function animal(x) {
    console.log(`Called with ${x}`)
    return x;
}

function animalDecorator(animalFunc) {

    let cache = new Map();

    return function (xy) {
        if (cache.has(xy)) {
            console.log(`Value ${xy} was in cache`);
            return cache.get(xy)
        }

        let result = animalFunc(xy)
        cache.set(xy, result)
        console.log("result", result);
        return result
    }

}

animal = animalDecorator(animal)
console.log(animal(5));
console.log(animal(5));

function adding(num1, num2) {

    let sum = 0
    return function (x, y) {
        sum += x;
        sum += y;
        console.log(sum);
    }
}
const sum2 = adding
console.log(sum2(4, 4));

function add(num1, num2) {
    return num1 + num2
}

function sub(num1, num2) {
    return num2 - num1
}

function makeCalculation(calculation) {


    switch (calculation) {
        case "add":
            console.log('add function');
            return function (num1, num2) { return num1 + num2 }
            break;
        case "sub":
            console.log('sub function');
            return function (num1, num2) { return num2 - num1 }
            break;

        default:
            break;
    }

}

function dogs(dog) {
    console.log(`Called with ${dog}`)
    return dog
}


function dogDecorator(func) {
    let cache = new Map()

    return function (dog) {
        console.log(`you passed ${dog}`);

        func(dog)
    }

}

dogs = dogDecorator(dogs)
dogs('vego')


console.log(makeCalculation('add')(4, 5));

let worker = {
    someMethod() {
        return 33;
    }
}

console.log(worker.someMethod());


function reapet(n, fn) {

    for (let index = 0; index < n; index++) {
        fn(index)
    }
}

let labels = []
reapet(10, (i) => { labels.push(i) })
console.log(labels);

function greaterThan(n) {
    return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan(100)(1000));


function noisy() {
    return function (args) {
        console.log("calling with", args);
        return "done"
    }
}

console.log(noisy()('xxx'));

function logSelection($event) {

    const log = document.getElementById("log");
    const selection = $event.target.value.substring(
        $event.target.selectionStart,
        $event.target.selectionEnd,
    );
    log.textContent = `You selected: ${selection}`;
}

</script>

<template>
    <div id="wrapper2">
        <h1>
            Canavsx :D
        </h1>
        <canvas id="myCanvas" ref="canvasRef"></canvas>
        <input type="text" v-model="paragraph" :placeholder="placeholder">
        <button @click="newP">Crete New</button>
        {{ paragraph }}
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <div id="rangeTest" ref="rangeT">
            <p>This is some Range test</p>
        </div>
        <button value="xxx" onclick="console.log(this.value);">click me</button>
        <textarea id="log" @select="logSelection($event)">SDSDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD</textarea>

    </div>
</template>

<style scoped>
#wrapper {
    margin-top: 50px;
}

#myCanvas {
    display: block;
}
</style>