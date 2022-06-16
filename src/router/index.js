import { createRouter, createWebHistory } from "vue-router";
import Banner from "@/views/components/pages/Banner.vue";
import Dashboard from "@/views/components/pages/Dashboard.vue";
import User from "@/views/components/pages/User.vue";
import Config from "@/views/components/pages/Config.vue";
import Employees from "@/views/components/pages/Employees.vue";
import SignIn from "@/views/components/pages/SignIn.vue";
import ChangePassWord from "@/views/components/pages/ChangePassWord.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/sign-in",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/banner",
    name: "Banner",
    component: Banner,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },

  {
    path: "/config",
    name: "Config",
    component: Config,
  },

  {
    path: "/employees",
    name: "Employees",
    component: Employees,
  },

  {
    path: "/sign-in",
    name: "Sign In",
    component: SignIn,
  },
  {
    path: "/change-password",
    name: "Change PassWord",
    component: ChangePassWord,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {
  // chuyển đến trang login nếu chưa được login
  // console.log(from);
  const publicPages = ["/sign-in"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");

  if (authRequired && !loggedIn) {
    return next("/sign-in");
  }

  next();
});
export default router;
