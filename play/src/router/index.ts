import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/bar',
        name: 'Layout',
        component: () => import('@/views/Layout.vue'),
        children: [
            {
                path: '/bar',
                component: () => import('@/views/bar/Bar.vue')
            },
            {
                path: '/pie',
                component: () => import('@/views/pie/Pie.vue')
            }
        ]
    }
];

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes // `routes: routes` 的缩写
});

export default router;
