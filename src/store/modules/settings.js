const state= {
    count:1
}

const getters={
    countStatus(state){
        return state.count>=1
    }
}

const mutations={
    setCount(state,num){
        state.count=num
    }
}

const actions={
    setCountPromise(context,num){
        return new Promise((resolve,reject)=>{
            if(num>100){
            reject("值不能大于100")
            }else{
            context.commit('setCount',num)
            resolve()
            }
        })

    }
}


export default{
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}