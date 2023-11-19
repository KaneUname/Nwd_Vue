<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb  separator="/" >
            <el-breadcrumb-item >全部文件</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">

            <div class="flex">
                <div class="input_box">
                    <el-input v-model="keywords" placeholder="Please enter key words"> 
                        <template #append>
                            <el-button @click="searchList"><el-icon><Search /></el-icon></el-button>
                        </template>
                    </el-input>
                </div>
                <el-button type="primary" @click="addUer"> 添加用户</el-button>
            </div>

            <!-- 用户列表  -->
            <el-table :data="userListdata" style="width: 100%">   
                <el-table-column label="用户名(姓名)"  >  
                    <template #default="scope">
                        <!-- <el-image style="width: 15px; height: 15px" :src="require('@/assets/tx1.jpg')" /> -->
                        <el-image v-if="scope.row.imgurl" style="width: 15px; height: 15px" :src="require('@/assets/'+scope.row.imgurl)" />
                        {{ scope.row.username }}({{ scope.row.fullname }})
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号"  />
                <el-table-column prop="email" label="邮箱"  />
                <el-table-column prop="memorySize" label="存储空间（G）"  />
                <el-table-column label="状态"   >
                    <template #default="scope">
                        <el-switch v-model="scope.row.mg_state " 
                        class="switch-color"
                        @click="editType(scope.row)"
                        />
                    </template>
                </el-table-column>

                <el-table-column label="操作"   >
                    <template #default="scope">
                        <el-button type="primary"  circle @click="editUer(scope.row)" ><el-icon><Edit /></el-icon></el-button>
                        <el-button type="danger" circle @click="deleteUer(scope.row)" ><el-icon><Delete /></el-icon></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>    
        
        <!-- 弹出框-->

        <el-dialog v-model="dialogFormVisible" :title=dialogTitle>

            <el-form 
                :model="formData" 
                :label-position="labelPosition"
                :rules="rules"
                ref="userForm"
                
                >
                <el-form-item label="ID:" prop="id">
                    <el-input v-model="formData.id" placeholder="请输入id"/>
                </el-form-item>
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="用户密码:" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入用户密码"  type="password"    show-password prefix-icon="Lock"  />
                </el-form-item>
                <el-form-item label="姓名:" prop="fullname">
                    <el-input v-model="formData.fullname"  placeholder="请输入姓名"/>
                </el-form-item>
                <el-form-item label="手机号:" prop="mobile">
                    <el-input v-model="formData.mobile"  placeholder="请输入手机号"/>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="formData.email" placeholder="请输入邮箱"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="flex" style="justify-content: center;">
                    <el-button  type="primary" round @click="submitForm(userForm)">确认</el-button>
                    <el-button  type="danger" round  @click="cancelAddUer">取消</el-button>
                </div>
            </template>
                   
                    
           
        </el-dialog>

    </div>
</template>

<script>
import {reactive,toRefs,ref } from "vue"
import {userListApi,userAddApi,deleteUerApi,updateUerApi } from '@/util/request';
import { ElMessage } from 'element-plus'
export default {
    name : "roles",
    setup(){
        const data=reactive({
            keywords:"",
            userListdata:[],
            dialogFormVisible:false,
            dialogTitle:"添加用户",
            formData:{
                id:"",
                username:"",
                fullname:"",
                password:"",
                mobile:"",
                email:""
            },
            rules:{
                username:[{
                    required:true,
                    message:"用户账号不能为空",
                    trigger:"blur"
                }],
                password:[{
                    required:true,
                    message:"用户密码不能为空",
                    trigger:"blur"
                }],
                fullname:[{
                    required:true,
                    message:"用户姓名不能为空",
                    trigger:"blur"
                }],
                ///^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
                mobile:[{
                    pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
                    message:"请输入正确的手机号",
                    trigger:"blur" 
                }],
                email:[{
                    pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                    message:"请输入正确的邮箱地址",
                    trigger:"blur" 
                }]
            }
        })
        // 用户列表查询
        const userList=()=>{
            userListApi().then(res=>{
                if(res.status=="200"){
                    console.log(res.data);
                    for(var ms in res.data){
                        res.data[ms].mg_state=res.data[ms].mg_state === 0 ? true:false
                    }
                    data.userListdata = res.data
                }
               
            })
        }
        //初始化
        userList()
        // 查询信息
        const searchList=()=>{
        }
        // 新增用户
        const addUer=()=>{
            data.formData={};
            data.dialogFormVisible=true;
        }

        // 修改用户
        const editUer=row=>{
            data.dialogTitle="编辑用户"
            data.formData=row;
            data.dialogFormVisible=true;
        }
        //  删除用户
        const deleteUer=row=>{
             deleteUerApi(row).then(res=>{
                if(res.status=="200"){
                    ElMessage.success('删除数据成功')
                    userList();
                }
             })
        }
        const editType=row=>{
            row.mg_state=row.mg_state==true?0:1
            updateUerApi(row).then(res=>{
                if(res.status=="200"){
                    ElMessage.success('更新状态信息成功')
                    userList();
                }
             
            })
        }
        // 取消新增用户
        const cancelAddUer=()=>{
            data.dialogFormVisible=false;
            data.formData={};
        }

        // 确认新增用户
        const submitForm=(formEl)=>{
            formEl.validate(res=>{
                if(!res){
                   return
                }
                userAddApi(data.formData).then(res=>{
                        userList();
                        ElMessage.success('数据提交成功')
                        cancelAddUer();
                    })

               
                
                
            })
        }
        const userForm = ref()
        const labelPosition = ref('top')
        //返回
        return{
            ...toRefs(data),
            searchList,
            addUer,
            editUer,
            deleteUer,
            editType,
            labelPosition,
            cancelAddUer,
            userForm,
            submitForm
        }
    }
}

       
</script>
<style scoped>
.switch-color{
    --el-switch-on-color: #13ce66;
     --el-switch-off-color: #ff4949
}

.input_box{
    width: 300px;
    margin-right: 15px;
}
</style>