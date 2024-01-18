const service = {
  //Creating new item
  getDefaultItem() {
    return {
      id: new Date().valueOf(),
      text: "",
      status: "not_started",
    };
  },

  getNewItem(value) {
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

    // If it doesn"t exist, we create a default.otherwise, parse the string
    if (!projects) {
      projects = { next_id: 0, list: [] };
    } else {
      projects = JSON.parse(projects);
    }
    console.log(projects);
    return projects;
  },

  saveProjectsMain(projects = {}) {
    // Save the xx with a well known name
    localStorage.setItem("projects", JSON.stringify(projects));
  },

  createToDoProject(name = "") {
    let projects = this.loadProjectsMain();

     // Prepare the new project
    let project_id = projects.next_id;

    // Update the projects manifest
    projects.next_id++;
    projects.list.push({ id: project_id, name });

    // Create project entry in local storage
    localStorage.setItem(`project.${project_id}`, "[]");

    // Save the projects manifest
    this.saveProjectsMain(projects);
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
    let mainProject = this.loadProjectsMain()
    let project = mainProject.list.find(p=>{
        return p.id==project_id
    })
    if(project){
        return project.name
    }else{
        return ""
    }
  }

 
};

export default service;
