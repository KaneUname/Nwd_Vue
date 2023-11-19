const state ={
    userInfo:(localStorage.getItem("loginData")&&JSON.parse(localStorage.getItem("loginData")))||{}
}


const mutations={
    setUserInfo(state, uInfo){
        state.userInfo = uInfo
    }
}

export default{
    namespaced: true,
    state,
    mutations
}