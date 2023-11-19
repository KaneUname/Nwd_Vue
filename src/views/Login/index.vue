<template>
    <div class="login_warp">
        <div class="form_warp" >
            <el-form
                ref="formRef"
                :model="loginData"
                class="demo-dynamic"
            >
            <div >
                <h3 class="title">Login Form</h3>
            </div>
                <el-form-item>
                    <el-input v-model="loginData.username"  placeholder="Please input Username"  size="large" prefix-icon="UserFilled" />
                </el-form-item>

                <el-form-item>
                    <el-input  v-model="loginData.password"  type="password"  placeholder="Please input Password"  show-password prefix-icon="Lock" />
                </el-form-item>
            </el-form>
            <el-button type="primary" class="login_btn" @click="handleLogin">login</el-button>
        </div>
    </div>
</template>

<script>
import { reactive,toRefs,ref  } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';
import { loginApi } from '@/util/request';
export default {
    name: "login",
    setup(){
        const store = useStore();
        const router= useRouter();
        const count=store.state.settings.count;
        const data=reactive({
            loginData:{
                username:"admin",
                password:"123456"
            },
            num:count
        })
        //登录
        
        const handleLogin=()=>{
            //后台请求接口
            loginApi(data.loginData).then(res=>{
                if(res.status=="200"){
                    store.commit('uInfo/setUserInfo', data.loginData);
                    localStorage.setItem("loginData",JSON.stringify(data.loginData))
                    let date= new Date().getTime();
                    localStorage.setItem("tokenStartTime",date)
                    //跳转页面
                    router.push({
                        path:"/index"
                    })
                }
            })
        }


        const input = ref('')

        return{
            ...toRefs(data),
            handleLogin,
            input
        }
    }
}
</script>

<style>
    .login_warp{
        width: 100%;
        height: 100vh;
        background:#2d3a4b;
        position: relative;
    }
    .form_warp{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background:#2d3a4b;
        padding: 30px 50px;
        border-radius: 5px ;
        width: 450px;
    }
    .login_btn{
        display: block;
        margin: 10px auto;
        width:100%;
        height: 40px;
        margin-bottom:30px;
    }


</style>
