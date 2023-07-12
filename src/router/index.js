import {createRouter,createWebHashHistory} from "vue-router";
import userlgn from '../components/userlgn.vue'
import yingxun from '../components/yingxun.vue'
import topguide from '@/components/topguide.vue'
import test from '@/components/test.vue'
import resetpassword from '../components/resetpassword.vue'
import moviechart from '@/components/moviechart.vue'
import moviecomments from '@/components/moviecomments.vue'
import annualchart from '@/components/annualchart.vue'
import videonews from '../components/videonews.vue'
import regist from '../components/regist.vue'
import home from '../components/home.vue'
import detail from '../components/detail.vue'
import searchresult from "@/components/searchresult.vue"
import detailinfo from '../components/detailinfo.vue'
const router = createRouter({
    history: createWebHashHistory(),
    routes:[
        {
            path:'/',
            name:'home',
            component:home,
        },
        {
            path: '/detailinfo',
            name: 'detailinfo',
            component: detailinfo,
            props: true
        },
        {
            name:'searchresult',
            path:'/searchresult',
            component:searchresult,
            props:true,
        },
        {
          path:'/test',
            name:'test',
          component:test,
            props:true,
        },
        {
          path:'/detail',
          component:detail
        },
        {
        path:'/userlgn',
        component:userlgn
        },
        {
            path:'/yingxun',
            component:yingxun
        },
        {
            path:'/topguide',
            component:topguide,
        },
        {
            path:"/resetpassword",
            component:resetpassword,
        },
        {
            path:"/annualchart",
            component: annualchart,
        },
        {
            path:"/moviechart",
            component:moviechart ,
        },
        {
            path:"/moviecomments",
            component: moviecomments,
        },
        {
            path:"/regist",
            component: regist,
        },
        {
            path:"/videonews",
            component: videonews,
        }
        ]
})

export default router