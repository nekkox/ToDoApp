<script setup>
import ToDoService from '@/services/todo'
import { inject, reactive, ref } from 'vue';
import TodoItemForm from '@/components/TodoItemForm.vue'
import ToDoFilter from '@/components/ToDoFilter.vue'
import ToDoList from '@/components/ToDoList.vue'
import ToDoSummary from '@/components/ToDoSummary.vue'

const _item = ref(ToDoService.getDefaultItem())
const _items = ref([])
const $modal = inject("$modals")
const _filter = ref("")


//Show a modal to create new item or edit existed one
function showModal(new_item = true, itemForEdit = {}) {
    if (new_item) {
        //Prepare a new item
        _item.value = ToDoService.getDefaultItem()
        console.log("New Item to be added ");
    } else {
        // Make a copy of the item for editing
        _item.value = ToDoService.makeCopy(itemForEdit);
        console.log("Item to edit: ");
        console.log(_item.value);
    }
    //Open "New_or_Edit_Item" modal;
    $modal.show("New_or_Edit_Item").then(() => {
        //If new_item then add it to _items
        if (new_item) {

            _items.value.push(_item.value)
            console.log(_item.value.text);
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
    let index = _items.value.findIndex((it) => {
        return it.id == item.id
    })
    if (index == -1) {
        console.log("No such index");
        return false
    } else {
        console.log("Found index: " + _items.value[index].text);
        console.log(index);
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
    <ToDoSummary></ToDoSummary>
    <ToDoFilter></ToDoFilter>

    <ToDoList>
        <button @click="showModal(true)" class="w3-button w3-blue w3-round-xxlarge">
            <i class="fa-solid fa-square-plus"></i>
            New item
        </button>
    </ToDoList>


    <br><br><br><br>
    <hr>
    <Modal name="New_or_Edit_Item" title="To Do Item">
        <TodoItemForm v-model="_item"></TodoItemForm>
    </Modal>
    <Modal name="deleteItem" title="Delete To-Do Item">
        <p>
            This action will delete the item:<br>
            <strong>{{ _item.text }}</strong>
        </p>
        <p>
            This action cannot be undone.
        </p>
    </Modal>
</template>