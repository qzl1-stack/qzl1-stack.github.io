import { createRouter, createWebHistory } from 'vue-router'
import SiteLayout from '../layouts/SiteLayout.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: SiteLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../pages/HomePage.vue'),
        },
        {
          path: 'notes',
          name: 'notes',
          component: () => import('../pages/NotesPage.vue'),
        },
        {
          path: 'notes/:slug',
          name: 'note_detail',
          component: () => import('../pages/NoteDetailPage.vue'),
        },
        {
          path: 'moments',
          name: 'moments',
          component: () => import('../pages/MomentsPage.vue'),
        },
        {
          path: 'moments/:slug',
          name: 'moment_detail',
          component: () => import('../pages/MomentDetailPage.vue'),
        },
        {
          path: 'resume',
          name: 'resume',
          component: () => import('../pages/ResumePage.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not_found',
      component: () => import('../pages/NotFoundPage.vue'),
    },
  ],
})
