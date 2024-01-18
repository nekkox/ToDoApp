import { createRouter, createWebHistory } from "vue-router"; //1
import Landing from "../views/Landing.vue"; //2
const routes = [
    { path: "/", name: "landing", component: Landing },
    {
      path: "/project/:id",
      name: "project",
      component: () => import("../views/ToDoProject.vue"), //3
      props: true,
    },
  ],
  router = createRouter({
    //4
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      return { top: 0 };
    },
  });
export default router;
