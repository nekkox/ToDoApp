const service = {

    //Creating new item
    getDefaultItem(){
        return {
            id: new Date().valueOf(),
            text: "",
            status: "Not_started"
            
        }
    }

}

export default service