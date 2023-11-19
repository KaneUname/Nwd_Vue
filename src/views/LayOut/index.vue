<template>
    <div class="common-layout">
        <el-container>
        <el-header class="common-header flex-flaot">
            <div class="flex">
                <img class="logo" src="../../assets/logo.png" alt="">
                <h1 class="title">网盘系统</h1>
            </div>

            <el-dropdown>
                

                <span class="el-dropdown-link"><el-icon><User /></el-icon>
                    {{ username }}
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>

                <template #dropdown>
                    <el-dropdown-menu>
                    <el-dropdown-item @click="settingDrawe"><el-icon><Setting /></el-icon>设置</el-dropdown-item>
                    <el-dropdown-item @click="loginOut"><el-icon><SwitchButton /></el-icon>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
                
            </el-dropdown>

            

            <!-- <el-button type="danger" round @click="loginOut">Danger</el-button> -->
        </el-header>
        <el-container>
            <el-aside width="200px" class="common-aside">
                    <el-menu class="el-menu-vertical" 
                        :default-openeds="openeds"
                        background-color="none"
                        text-color="#fff"
                        :router="true"
                    >
                        <el-sub-menu index="1" 
                        :unique-opened="true"
                        >
                            <template #title>
                                
                                <el-icon><House /></el-icon>
                                <span>我的文件</span>
                            </template>
                            <el-menu-item-group enable>
                                <el-menu-item index="/index">
                                    <el-icon><Reading /></el-icon>
                                    文件
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/index">
                                    <el-icon><PictureRounded /></el-icon>
                                    图片
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/index">
                                    <el-icon><Document /></el-icon>
                                    文档
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/index">
                                    <el-icon><VideoPlay /></el-icon>
                                    视频
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/index">
                                    <el-icon><Headset /></el-icon>
                                    音频
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="/index">
                                    <el-icon><MoreFilled /></el-icon>
                                    其他
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>


                        <el-menu-item index="/setting">
                            <template #title>
                                <el-icon><setting /></el-icon>
                                <span>用户设置</span>
                            </template>
                        </el-menu-item>
                            
                    </el-menu>
                    
            </el-aside>
            <el-main>
                <RouterView></RouterView>
            </el-main>
        </el-container>
        </el-container>
    </div>

    <el-drawer v-model="drawer" title="个人信息设置" :with-header="false">
            <el-form 
                :model="formData" 
                :label-position="labelPosition">
                <el-input v-model="formData.id" style="display: none;"/>
                <el-form-item label="用户名:" prop="username" >
                    <el-input v-model="formData.username" placeholder="请输入用户名" disabled />
                </el-form-item>
                <el-form-item label="姓名:" prop="fullname">
                    <el-input   v-model="formData.fullname"  placeholder="请输入姓名"/>
                </el-form-item>
                <el-form-item label="手机号:" prop="mobile">
                    <el-input  v-model="formData.mobile"   placeholder="请输入手机号"/>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input  v-model="formData.email"   placeholder="请输入邮箱"/>
                </el-form-item>
            </el-form>
    </el-drawer>

</template>

<script>
import {reactive,toRefs,ref } from "vue"
import { useStore } from "vuex"
import { useRouter } from 'vue-router';
import { queryUerApi } from '@/util/request';
export default{
    name: "LayOut",
    setup () {
        
        // const menu = ref([]);
        // const mainMenu = ref(null);
        const router = useRouter()
        const store =useStore()
        const loginData = JSON.parse(localStorage.getItem('loginData'));
        const data=reactive({
            username:loginData.username,
            userListdata:[],
            drawer:false,
            formData:{
                id:"",
                username:"",
                fullname:"",
                password:"",
                mobile:"",
                email:""
            },
        })
        
        const loginOut=()=>{
            localStorage.removeItem("loginData");
            localStorage.removeItem("tokenStartTime");
            localStorage.removeItem("accessToken");
            store.commit('uInfo/setUserInfo',{});
            router.push({
                    path:"/login"
                })
        }
        const settingDrawe =()=>{
            queryUerApi(loginData.username).then(res=>{
                console.log("设置");
                if(res.status=="200"){
                    data.formData=res.data
                    data.drawer=true
                }
                
            })
            
        }
        // const drawer = ref(false)
        const labelPosition = ref('top')
        return {
            openeds: ['1'],
            uniqueOpened: false,
            loginOut,
            ...toRefs(data),
            // drawer,
            labelPosition,
            settingDrawe
        }
    }
}
</script>

<style>
.el-container{
    height: 100vh;
    overflow: hidden;
}
.common-header{
    background: rgb(22, 25, 49);
    display: flex;
}
.common-aside{
    background: rgb(47, 49, 66);
}
.logo{
    width: 65px;
}
.title{
    color: #fcfbfb;
}
.el-main{
    background: #efefef;
}
</style>