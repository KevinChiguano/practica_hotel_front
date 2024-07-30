import {createRouter, createWebHashHistory} from 'vue-router'


const routes = [
    {
        path: "/",
        component: () => import('../modules/hoteles/pages/HotelesPage') 
    },
    {
        path: "/habitacion",
        component: () => import('../modules/habitaciones/pages/HabitacionesPage') 
    },
    {
        path: "/:pathMatch(.*)*",
        //component: NoEncontradaPage
        component: () => import('../modules/NoEncontradoPage')
    }

]

const router=createRouter({
    history: createWebHashHistory(),
    routes
})

export default router