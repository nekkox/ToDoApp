const service = {

    //Creating new item
    getDefaultItem(){
        return {
            id: new Date().valueOf(),
            text: "zzz",
            status: "Not_started"
            
        }
    },

    makeCopy(item){
        return JSON.parse(JSON.stringify(item))
    }

}

export default service