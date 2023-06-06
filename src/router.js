import { createRouter, createWebHashHistory } from "vue-router";
import IndexPage from "./pages/IndexPage.vue";
import TodosPage from "./pages/todos/TodosPage.vue";
import { useUserStore } from "./store/userStore.js";
import ROUTES, {PUBLIC_PAGES} from "./constans/routes.js";
import {inject} from "vue";
import PROVIDE from "@/constans/PROVICE_PB.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: ROUTES.INDEX,
      component: ()=>  import("./pages/IndexPage.vue")
    },
    {
      path:ROUTES.TODOS,
      component: () => import("./pages/todos/TodosPage.vue")
    },
    {
      path:ROUTES.TODOS_ID,
      component: () => import("./pages/todos/TodoEditPage.vue")
    },
    {
      path:ROUTES.SIGNIN,
      component: () => import("./pages/SignInPage.vue")
    },
    {
      path:ROUTES.SIGNUP,
      component: () => import("./pages/SignUpPage.vue")
    },
    {
      path:ROUTES.BOOKS,
      component: () => import("./pages/BooksPage.vue")
    }
  ],
});
router.beforeEach((to,from, next) => {
  const pb = inject(PROVIDE.PB);
  const userLoggedId = pb.authStore.model?.id;

  if (userLoggedId) {
    checkNavigation([ROUTES.SIGNUP], to.path,from,next, true);
  }else {
    checkNavigation([PUBLIC_PAGES], to.path,{path: ROUTES.SIGNIN},next );
  }
});
function checkNavigation(routes, path, gotoRoute, next, isPathIncluded= false) {
  const pathIndex= routes.indexOf(path);
  const notAllowedNavigation = isPathIncluded?
    pathIndex >-1 : pathIndex < 0;
  console.log("> router -> beforeEach", path, {notAllowedNavigation});
  if (notAllowedNavigation) {
    next(gotoRoute);
  }else
    next();
}
export default router;