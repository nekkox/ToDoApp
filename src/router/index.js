import { createRouter, createWebHistory } from "vue-router"; 
import Landing from "../views/Landing.vue"; 
const routes = [
    { path: "/", name: "landing", component: Landing },
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
