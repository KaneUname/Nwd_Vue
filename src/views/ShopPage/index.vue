<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb  separator="/" >
            <el-breadcrumb-item >全部文件</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <el-table :data="userListdata" style="width: 100%">
                <el-table-column prop="username" label="姓名"  />
                <el-table-column prop="password" label="密码"  />
                <el-table-column prop="mg_state" label="状态" >
                    <template #default="scope">
                        <el-switch v-model="scope.row.mg_state" />
                    </template>
                </el-table-column>
            </el-table>
        </div>        
    </div>
</template>

<script>
import {reactive,toRefs} from "vue"
// import { userListApi } from '@/util/request';
export default {
    name : "roles",
    setup(){
        const data=reactive({
            userListdata:[]
        })

        const userList=()=>{
            // userListApi().then(res=>{
            //     if(res.status=="200"){
            //         data.userListdata = res.data
            //     }
               
            // })
        }
        userList()

        return{
            ...toRefs(data)
        }
    }
}

       
</script>