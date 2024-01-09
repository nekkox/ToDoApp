<script setup>
import ToDoService from '@/services/todo'
import { inject, ref } from 'vue';


const _item = ref({})
const _items = ref([])
const $modal = inject("$modals")

//Show a modal to create new item or edit existed one
function showModal(new_item = true, itemForEdit = {}) {
    if (new_item) {
        //Prepare a new item
        _item.value = ToDoService.getDefaultItem()
        console.log("New Item added");
    }
    //Open "New_or_Edit_Item" modal;
    $modal.show("New_or_Edit_Item").then(() => {
        //If new_item then add it to _items
        if (new_item) {
            _items.value.push(_item.value)
            console.log("New item added to array _items");
        } else {
            console.log("Edit item");
        }
    }, () => {
        console.log("Adding new item or editing canceled");
    }
    )
}

</script>

<template>
    <p>hello</p>
    <Modal name="New_or_Edit_Item" title="To Do Item">
    </Modal>
    <button @click="showModal(true)">Add new item</button>
</template>