import { Toast } from "vant"
import {createRouter,createWebHashHistory} from "vue-router"

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:()=>import('../pages/myHome/MyHome')
        },
        {
            path:'/home',
            component:()=>import('../pages/myHome/MyHome')
        },
        {
            path:'/cart',
            component:()=>import('../pages/myCart/MyCart'),
            meta:{
                isAuth:true,
            }
        },
        {
            path:'/order',
            component:()=>import('../pages/myOrder/MyOrder'),
            meta:{
                isAuth:true,
            }
        },
        {
            path:'/mine',
            component:()=>import('../pages/myMine/MyMine'),
            meta:{
                isAuth:true,
            }
        },
        {
            path:'/store',
            component:()=>import('../pages/store/MyStore'),
        },
        {
            path:'/createorder',
            component:()=>import('../pages/createOrder/CreateOrder'),
            meta:{
                isAuth:true,
            }
        },
        {
            path:'/address',
            component:()=>import('../pages/address/MyAddress'),
            meta:{
                isAuth:true,
            }
        },
        {
            path:'/addressedit',
            component:()=>import('../pages/addressEdit/AddressEdit'),
            meta:{
                isAuth:true,
            }
        },
        {
            path:'/login',
            component:()=>import('../pages/login/MyLogin'),
        },
        {
            path:'/login',
            component:()=>import('../pages/login/MyLogin'),
        },
        {
            path:'/register',
            component:()=>import('../pages/register/MyRegister'),
        },
        {
            path:'/userinfordit',
            component:()=>import('../pages/userinfordit/UserInfordit'), 
        },
    ]
})

router.beforeEach((to,from,next)=>{
    if(to.meta.isAuth){
        if(localStorage.isLogin==='1'){
            next()
        }else{
            Toast('请先登录')
            router.push('/login')
        }
    }else{
        next()
    }
})

export default router;