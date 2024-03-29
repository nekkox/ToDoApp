const service = {
  //Creating new item
  getDefaultItem() {
    return {
      id: new Date().valueOf(),
      text: "",
      status: "not_started",
    };
  },

  getNewItem(value, description) {
    return {
      id: new Date().valueOf(),
      text: value,
      status: "not_started",
    };
  },

  makeCopy(item) {
    return JSON.parse(JSON.stringify(item));
  },

  getStatusList() {
    return [
      { id: "not_started", label: "Not started" },
      { id: "in_progress", label: "In progress" },
      { id: "completed", label: "Completed" },
    ];
  },

  toggleStatus(status) {
    switch (status) {
      case "completed":
        return "not_started";
        break;
      case "not_started":
        return "in_progress";
        break;
      case "in_progress":
        return "completed";
        break;
      default:
        break;
    }
  },

  loadProjectsMain() {
    // Check if the master project list exists in localStorage
    let projects = localStorage.getItem("projects");

    // If it doesn"t exist, we create a default. Otherwise, parse the string
    if (!projects) {
      projects = { next_id: 0, list: [] };
      console.log("Main Projects Array Created");
    } else {
      projects = JSON.parse(projects);
    }
    
    return projects;
  },

  saveProjectsMain(projects = {}) {
    // Save the xx with a well known name
    localStorage.setItem("projects", JSON.stringify(projects));
  },

  createToDoProject(name = "", description="") {
    let projects = service.loadProjectsMain();

     // Prepare the new project
    let project_id = projects.next_id;
    

    // Update the projects manifest
    projects.next_id++;
    projects.list.push({ id: project_id, name,description });

    // Create project entry in local storage
    localStorage.setItem(`project.${project_id}`, "[]");

    // Save the projects manifest
    service.saveProjectsMain(projects);
  },

  loadProject(project_id){
    // Retrieve the project from localStorage and parse it to JSON
    return JSON.parse(localStorage.getItem(`project.${project_id}`))
  },

  saveProject(project_id, data){
    // Store the item as string in localStorage
    localStorage.setItem(`project.${project_id}`, JSON.stringify(data))
  },

  getProjectName(project_id){
    // Retrieve the project from the manifest and return the name
    let mainProject = service.loadProjectsMain()
    let project = mainProject.list.find(p=>{
        return p.id==project_id
    })
    if(project){
        console.log("project found: " + project.name);
        return project.name
    }else{
        return ""
    }
  },

  getProjectId(project_name){
    // Retrieve the project from the manifest and return the id
    let mainProject = service.loadProjectsMain()
    let project = mainProject.list.find(p=>{
        return p.name==project_name
    })
    if(project){
        console.log("project found: " + project.id);
        return project.id
    }else{
        return ""
    }
  },

  deleteProject(project_id){
        // Retrieve the manifes, and the index of the project in the list
        let mainProject=service.loadProjectsMain()
        let project_index=mainProject.list.findIndex(p=>{
                return p.id==project_id
            })

        // If the project is found...
        if(project_index >-1 ){
        
            // Remove project from the manifest
            mainProject.list.splice(project_index, 1)
            service.saveProjectsMain(mainProject)

            // Delete localStorage
            localStorage.removeItem(`project.${project_id}`)
            
        }
    

  }

 
};

export default service;
