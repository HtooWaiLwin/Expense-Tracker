import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../views/Dashboard.vue"),
    },
    {
        path: "/transactions",
        component: () => import("../views/TransactionView.vue"),
    },
    {
        path: "/budget",
        component: () => import("../views/Budget.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

export default router;
