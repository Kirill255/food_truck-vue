import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import { store } from "./store";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "register" */ "./views/Register.vue")
    },
    {
      path: "/account/me",
      name: "me",
      component: () =>
        import(/* webpackChunkName: "me" */ "./components/account/Me.vue"),
      meta: { requiredAuth: true }
    },
    {
      path: "/foodtruck",
      name: "foodtruck",
      component: () =>
        import(/* webpackChunkName: "foodtruck" */ "./views/Foodtruck.vue")
    },
    {
      path: "/foodtruck/add",
      name: "addFoodtruck",
      component: () =>
        import(/* webpackChunkName: "newFoodtruck" */ "./views/AddFoodtruck.vue"),
      meta: { requiredAuth: true }
    },
    {
      path: "/foodtruck/:id",
      name: "oneFoodtruck",
      component: () =>
        import(/* webpackChunkName: "oneFoodtruck" */ "./views/OneFoodtruck.vue"),
      meta: { requiredAuth: true },
      props: true
    },
    {
      path: "/foodtruck/:id/reviews",
      name: "reviews",
      component: () =>
        import(/* webpackChunkName: "reviews" */ "./views/Reviews.vue"),
      meta: { requiredAuth: true },
      props: true
    },
    {
      path: "/foodtruck/edit/:id",
      name: "editFoodtruck",
      component: () =>
        import(/* webpackChunkName: "newFoodtruck" */ "./views/EditFoodtruck.vue"),
      meta: { requiredAuth: true }
    },
    {
      path: "*",
      name: "e404",
      component: () =>
        import(/* webpackChunkName: "E404notfound" */ "./views/E404.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (store.getters["auth"]) {
      next();
    } else {
      // router.push('/login')
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
