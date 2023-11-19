import {post,get,del,patch} from "./service"

export const loginApi=data=>{
    return post({
        url:"/v2/login",
        data
    })
}


export const userAddApi=data=>{
    return post({
        url:"/v1/saveUser",
        data
    })
}

export const userListApi=data=>{
    return get({
        url:"/v1/findAll",
        data
    })
}


export const deleteUerApi=data=>{
    return del({
        url:'/v1/deleteByid/'+(data.id)
    })
}

export const updateUerApi=data=>{
    return patch({
        url:"/v1/updateUser",
        data
    })
}


export const queryUerApi=data=>{
    return get({
        url:'/v1/findByUser/'+(data)
    })
}