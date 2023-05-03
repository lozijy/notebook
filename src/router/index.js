import { createRouter, createWebHashHistory } from 'vue-router'
import skeleton from "@/components/skeleton.vue";
import page from "@/views/page/page.vue";
const routes = [
    {path:"/",redirect:"/page"},
    {
        path: '/skeleton',
        component: skeleton,
        children: [
            {
                path: '/page',
                name:'page',
                component: page,
            },

        ]
    },


]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
