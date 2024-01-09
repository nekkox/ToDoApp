<script setup>
import ToDoService from '@/services/todo'
import { inject, ref } from 'vue';


const _item = ref(ToDoService.getDefaultItem())
const _items = ref([])
const $modal = inject("$modals")

//Show a modal to create new item or edit existed one
function showModal(new_item = true, itemForEdit = {}) {
    if (new_item) {
        //Prepare a new item
        _item.value = ToDoService.getDefaultItem()
        console.log("New Item added");
    } else {
        // Make a copy of the item for editing
        _item.value = ToDoService.makeCopy(itemForEdit);
    }
    //Open "New_or_Edit_Item" modal;
    $modal.show("New_or_Edit_Item").then(() => {
        //If new_item then add it to _items
        if (new_item) {
            _items.value.push(_item.value)
            console.log("New item added to array _items");
            console.log(_items);
        } else {
            //Replace item
            console.log("Edit existing item");
            let index = getIndex(itemForEdit)
            if (index >= 0) {
                _items.value[index] = _item.value
            } else {
                alert("Error updating the item")
            }
        }
    }, () => {
        console.log("Adding new item or editing canceled");
    }
    )
}

//Finding index of an item in array of items _items
function getIndex(item) {
    let index = _items.value.findIndex((element) => {
        return element.id == item.id
    })

    if (index == -1) {
        console.log("ddd");
        return false
    } else {
        console.log(_items.value[index]);
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


</script>

<template>
    <p>hello</p>
    <Modal name="New_or_Edit_Item" title="To Do Item">
    </Modal>
    <Modal name="deleteItem" title="Delete To-Do Item"></Modal>
    <p>{{ _item.text }}</p>
    <input type="text" v-model="_item.text">
    <button @click="showModal(true)">Add new item</button>
    <button @click="getIndex(_item)">get index</button>
    <button @click="deleteItem(_item)">Delete</button>
    {{ console.log(_item) }}
</template>