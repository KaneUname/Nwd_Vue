import { createRouter, createWebHashHistory } from 'vue-router'
import LayOut from '../views/LayOut/index'
import store from '../store/index'
import { ElMessage } from 'element-plus'
const routes = [
  //登录页面
  {
    path: '/login',
    name:'login',
    component:()=>import('../views/Login/index')
  },{
    path: '/',
    name: 'layout',
    component: LayOut,
    redirect:"/index",
    // 子路由
    children:[
      {
        path: '/index',
        name:'index',
        component: ()=>import('../views/ShopPage/index')
      },
      {
        path: '/setting',
        name:'setting',
        component: ()=>import('../views/Setting/index')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//路由守卫
router.beforeEach((to,form,next)=>{
  
  /**
   * to 从哪个页面来
   * form 到哪个页面
   * next 只有执行next页面才能跳转
   */
  // 获取token
  let token = localStorage.getItem('accessToken')

  // 获取存储token的开始时间
  const tokenStartTime = localStorage.getItem("tokenStartTime")
   // 后台给出的token有效时间，一天 单位 是秒
  const timeOver = 24 * 60 * 60 * 1000;
  // const timeOver = 10 * 1000;
  let date = new Date().getTime();
  // 如果大于说明是登录过期了
  if(tokenStartTime!=null && date - tokenStartTime > timeOver) {
    localStorage.removeItem("loginData");
    localStorage.removeItem("tokenStartTime");
    localStorage.removeItem("accessToken");
    ElMessage.error("登录状态过期，请重新登录")
  }
  // const uInfo = store.state.uInfo.userInfo
  // if(!uInfo.username){
  //判断是否登录
  if(token==null){
    //未登录,跳转登录页面
    if(to.path==="/login"){
      
      next()
      return
    }
    next("/login")
  }else{
    next()
  }
 
})
export default router
