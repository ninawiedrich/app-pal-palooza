import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UsersProfileView from "@/views/UsersProfileView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/HomeView.vue") },
    { path: "/register", component: () => import("../views/RegisterView.vue") },
    { path: "/sign-in", component: () => import("../views/SignIn.vue") },

    {
      path: "/activity",
      component: () => import("../views/ActivityView.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/addActivity",
      component: () => import("../views/AddActivityView.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/usersProfile/:userId",
      name: "UsersProfile",
      component: UsersProfileView,
      props: true,
    },

    {
      path: "/postbox",
      component: () => import("../views/PostboxView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("you don`t have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
