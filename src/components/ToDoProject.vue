<script setup>
import ToDoService from '@/services/todo'
import { inject, reactive, ref } from 'vue';
import TodoItemForm from '@/components/TodoItemForm.vue'
import ToDoFilter from '@/components/ToDoFilter.vue'
import ToDoList from '@/components/ToDoList.vue'
import Summary from '@/components/Summary.vue'

const _item = ref(ToDoService.getDefaultItem())
const _items = ref([])
const $modal = inject("$modals")
const _filter = ref("")
const emptyValue = ref(true)

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
        }
    }, () => { console.log("Deleting item cancelled"); })
}


function toggleStatus(item) {
    item.status = ToDoService.toggleStatus(item.status)
}

</script>

<template>
    <div class="project-container">

        <!-- Summary -->
        <Summary :items="_items" />

        <h3>Search: {{ _filter }}</h3>
        {{ console.log(_filter) }}

        <!-- Filter bar -->
        <div class="w3-margin-bottom">
            <ToDoFilter v-model="_filter"></ToDoFilter>
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
    </div>
</template>

<style scoped>
.project-container {
    max-width: 56rem;
    padding: 1rem;
    margin: 0 auto;
}
</style>