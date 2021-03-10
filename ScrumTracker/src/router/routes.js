const routes = [
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Home.vue'),
        meta: { requiresAuth: true, requiresAdmin: false }
      },
      {
        path: '/profile',
        component: () => import('pages/Profile.vue'),
        meta: { requiresAuth: true, requiresAdmin: false }
      },
      {
        path: '/users',
        component: () => import('pages/Users.vue'),
        meta: { requiresAuth: true, requiresAdmin: true }
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('layouts/Login.vue'),
    meta: { requiresAuth: false, requiresAdmin: false }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]
export default routes
