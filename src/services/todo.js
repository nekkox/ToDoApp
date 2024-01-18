const service = {

    //Creating new item
    getDefaultItem(){
        return {
            id: new Date().valueOf(),
            text: "",
            status: "not_started"
            
        }
    },

    getNewItem(value){
        return {
            id: new Date().valueOf(),
            text: value,
            status: "not_started"
            
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

    toggleStatus(status){

        switch (status) {
            case "completed":
                return "not_started"
                break;
                case "not_started":
                return "in_progress"
                break;
                case "in_progress":
                return "completed"
                break;
        
            default:
                break;
        }
    }

}

export default service