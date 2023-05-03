import { createRouter, createWebHashHistory } from 'vue-router'
import passage from "@/views/passage/passage.vue";
import repository from "@/views/repository/repository.vue";
import skeleton from "@/components/skeleton.vue";
import page from "@/views/page/page.vue";
const routes = [
    {
        path: '/skeleton',
        component: skeleton,
        children: [
            {
                path: '/skeleton/repository',
                name:'repository',
                component: repository,
                children:[
                    {
                        path: '/skeleton/repository/passage',
                        name:'passage',
                        component: passage
                    },
                ]
            },
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
