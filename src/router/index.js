import { createRouter, createWebHistory } from "vue-router"; 
//import Landing from "../views/Landing.vue"; 
const routes = [
  //  { path: "/home", name: "landing", component: Landing },
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"), 
      props: false,
    },
    {
      path: "/app/new",
      name: "landing",
      component: () => import("../views/Landing.vue"), 
      props: false,
    },
    {
      path: "/app/index",
      name: "index",
      component: () => import("../views/Index.vue"), 
      props: false,
    },
    {
      path: "/app/project/:id",
      name: "project",
      component: () => import("../views/ToDoProject.vue"), 
      props: true,
    },
    
  ],
  router = createRouter({
   
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return { top: 0 };
    },
  });
export default router;
