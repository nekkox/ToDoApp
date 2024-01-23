<script setup>
import ToDoService from '@/services/todo'
import { inject, reactive, ref, watch, onMounted } from 'vue';
import TodoItemForm from '@/components/TodoItemForm.vue'
import ToDoFilter from '@/components/ToDoFilter.vue'
import ToDoList from '@/components/ToDoList.vue'
import Summary from '@/components/Summary.vue'
import Promise from '@/components/otherComponents/Promise.vue'
import { useRouter, useRoute } from "vue-router"
import eventBus from '@/services/eventBus'
import { store } from '@/services/store'
//url params ('id')
const $params = defineProps(['id'])
const $route = useRoute()
const _project_name = ref("")


onMounted(loadProject)

//if /project/{id} changes, LoadProject() function is runned
watch(() => $params.id, loadProject)




const _item = ref(ToDoService.getDefaultItem())
const _items = ref([])
const $modal = inject("$modals")
const _filter = ref("")
const emptyValue = ref(true)

const routeId = ref("")


//Show a modal to create new item or edit existed one
function showModal(new_item = true, itemForEdit = {}) {

    if (new_item) {
        //Prepare a new item
        _item.value = ToDoService.getDefaultItem()
    } else {
        // Make a copy of the item for editing
        _item.value = ToDoService.makeCopy(itemForEdit);

    }
    //Open "New_or_Edit_Item" modal;
    $modal.show("New_or_Edit_Item").then(() => {
        //If new_item then add it to _items array
        if (new_item) {
            if (_item.value.text.trim() != "") {
                emptyValue.value = false;
                _items.value.push(_item.value)
                // emptyValue.value = true;
            } else {
                emptyValue.value = true;
                alert("error")
            }
        } else {
            //Replace item
            let index = getIndex(itemForEdit)
            if (index >= 0) {
                _items.value[index] = _item.value

            } else {
                alert("Error updating the item")
            }
        }
        saveProject()
    }, () => {
        console.log("Adding new item or editing canceled");
        emptyValue.value = true;
    }
    )
}

//Finding index of an item in array of items _items
function getIndex(item) {
    let index = _items.value.findIndex((it) => {
        return it.id == item.id
    })
    if (index == -1) {
        console.log("No such index");
        return false
    } else {
        return index
    }
}


function deleteItem(item) {
    $modal.show("deleteItem").then(() => {
        let index = getIndex(item);
        if (index >= 0) {
            _items.value.splice(index, 1)
            saveProject()
        }
    }, () => { console.log("Deleting item cancelled"); })
}


function toggleStatus(item) {
    item.status = ToDoService.toggleStatus(item.status)
    saveProject()
}


function loadProject() {
    _project_name.value = ToDoService.getProjectName($params.id)
    _items.value = ToDoService.loadProject($params.id)
    if (!_items.value) {
       console.log('null');
        _items.value = []
    }

    routeId.value = $route.params.id
    store.routeId = $route.params.id
    store.currentProjectId = $params.id;
    eventBus.emit('newRoute', $route.params)
    console.log("project loaded",_items.value );
}

function saveProject() {
    ToDoService.saveProject($params.id, _items.value)
    console.log("saved");
}
</script>

<template>
    <div class="project-container">

<div class="">{{ _project_name }}</div>

        <!-- Summary -->
        <Summary :items="_items" />

        
        {{ console.log(_filter) }}

        <!-- Filter bar -->
        <div class="w3-margin-bottom">
            <ToDoFilter class="mt-20"  v-model="_filter"></ToDoFilter>
        </div>

        <!-- Todo list -->
        <ToDoList v-model="_items" :filter="_filter" @toggle="toggleStatus" @edit="showModal(false, $event)"
            @delete="deleteItem">
            <button @click="showModal(true)" class="w3-button w3-blue w3-round-xxlarge">
                <i class="fa-solid fa-square-plus"></i>
                New item
            </button>
        </ToDoList>

        <!-- Modal for New item or for Edit -->
        <Modal name="New_or_Edit_Item" title="To Do Item" :disabled="emptyValue">
            <template v-slot:newItem>
                <TodoItemForm v-model="_item" :emptyValue="emptyValue" @notEmpty="emptyValue = false"
                    @empty="emptyValue = true">
                </TodoItemForm>
            </template>
        </Modal>

        <!-- Modal for delete item -->
        <Modal name="deleteItem" title="Delete To-Do Item">
            <p>
                This action will delete the item:<br>
                <strong>{{ _item.text }}</strong>
            </p>
            <p class="w3-text-red w3-pale-red w3-round-medium">
                This action cannot be undone.
            </p>
        </Modal>
        <Promise></Promise>
    </div>
</template>

<style scoped>
.project-container {
    max-width: 56rem;
    padding: 1rem;
    margin: 0 auto;
    
}
</style>