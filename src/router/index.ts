import { createRouter, createWebHistory } from 'vue-router';
import { Ory } from '../plugins/ory';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/app',
      beforeEnter(to, from, next) {
        console.log('/');
        next();
      },
    },
    {
      // eventually change this to have children routes
      path: '/app',
      name: 'app',
      component: () => import('../views/app/HomeView.vue'),
      beforeEnter(to, from, next) {
        Ory.toSession()
          .then(() => {
            next();
          })
          .catch(() => next('/login'));
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: () => import('../views/RecoveryView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
    },
    {
      path: '/verification',
      name: 'verification',
      component: () => import('../views/VerificationView.vue'),
    },
  ],
});

export default router;
