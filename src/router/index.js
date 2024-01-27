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
      path: "/todo",
      name: "landing",
      component: () => import("../views/Landing.vue"), 
      props: false,
    },
    {
      path: "/alltodo",
      name: "alltodo",
      component: () => import("../views/Alltodo.vue"), 
      props: false,
    },
    {
      path: "/project/:id",
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
