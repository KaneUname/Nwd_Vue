import axios from "axios";
import { ElLoading } from 'element-plus';
import { ElMessage } from 'element-plus'
// 使用create创建axios实例
let loadingObj = null
let accessToken =localStorage.getItem("accessToken")
console.log("获取token:"+localStorage.getItem("accessToken"))
const Service = axios.create({
    timeout:8000,
    baseURL:"http://127.0.0.1:8881/api",
    headers:{
        "Content-type":"application/json;charset=utf-8 "
    }
})

//请求拦截-增加loading,对请求做统一处理
Service.interceptors.request.use(config=>{
    console.log("发送请求token::"+localStorage.getItem("accessToken"))
    loadingObj = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
    if(localStorage.getItem("accessToken")!=null){
        config.headers.authorization = localStorage.getItem("accessToken");
    }
    console.log(config.headers.authorization)
    return config
    
})
//响应拦截-对返回值做统一处理
Service.interceptors.response.use(response=>{
    //0.1毫秒后关闭loading
    setTimeout(()=>{
        loadingObj.close()
    },100)
    const data = response.data
    if(data.status!="200"){
        ElMessage.error( data.message || "Server error")
        //请求出错
        return data
    }
    if(response.headers.authorization!=undefined){
        console.log("token:"+response.headers.authorization)
        localStorage.setItem("accessToken",response.headers.authorization)
    }
  
    return data
},error=>{
    loadingObj.close()
    ElMessage({
        message:"Unable to connect to the server, please contact the administrator",
        type:"error",
        duration:2000
    })
})

//post 请求
export const post = config=>{
    return Service({
        ...config,
        method:"post",
        data:config.data
    })
}
//get 请求
export const get=config=>{
    return Service({
        ...config,
        method:"get",
        params:config.data
    })
}

export const del=config=>{
    return Service({
        ...config,
        method:"delete"
    })
}


//post 请求
export const patch = config=>{
    return Service({
        ...config,
        method:"patch",
        data:config.data
    })
}