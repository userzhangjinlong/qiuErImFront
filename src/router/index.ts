import { createRouter, createWebHistory, Router } from 'vue-router'

const routes = [
  { path: '/login', name: 'login', component: () => import('../pages/login/login.vue'), meta: { isLogin: false } },
  { path: '/', name: 'chat', component: () => import('../pages/chat/chat.vue'), meta: { isLogin: true } },
  { path: '/chat/to-chat', name: 'go-to-chat', component: () => import('../pages/chat/to-chat.vue'), meta: { isLogin: true } },
  { path: '/friend', name: 'friend', component: () => import('../pages/friend/friend-list.vue'), meta: { isLogin: true } },
  { path: '/my', name: 'my', component: () => import('../pages/my/my.vue'), meta: { isLogin: true } },
  { path: '/hole', name: 'hole', component: () => import('../pages/tree/hole.vue'), meta: { isLogin: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

function RouterStack(router: Router) {
  // const stack = [];
  var loginInfo = localStorage.getItem("userInfo"),
    userInfo = JSON.parse(loginInfo)
  router.afterEach((to, from) => {
    if (to.meta.isLogin) {
      if (userInfo == null) {
        router.push("/login")
      }
      if (userInfo.userId == 0) {
        router.push("/login")
      }
    }
  });
  return router;
}

RouterStack(router);

export default router