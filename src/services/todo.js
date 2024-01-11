const service = {

    //Creating new item
    getDefaultItem(){
        return {
            id: new Date().valueOf(),
            text: "",
            status: "Not_started"
            
        }
    },

    getNewItem(value){
        return {
            id: new Date().valueOf(),
            text: value,
            status: "Not_started"
            
        }
    },

    makeCopy(item){
        return JSON.parse(JSON.stringify(item))
    },

    getStatusList() {
        return [
            { id: "not_started", label: "Not started" },
            { id: "in_progress", label: "In progress" },
            { id: "completed", label: "Completed" }
        ]
    },

}

export default service