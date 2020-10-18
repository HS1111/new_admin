import request from "@/utils/request.js";

export const login = ((data1) => {
    return request({
        method: "POST",
        url: "/mp/v1_0/authorizations",
        data: data1
    })
})


export const getUseInfo = (() => {
    // const user = JSON.parse(window.localStorage.getItem('user'))
    return request({
        method: "GET",
        url: "/mp/v1_0/user/profile"
            // headers: {
            //     Authorization: 'Bearer ' + user.token
            // }

    })
})


export const updateUserPhoto = ((data1) => {
    return request({
        method: "PATCH",
        url: "/mp/v1_0/user/photo",
        data: data1
    })
})


//修改用户信息
export const updateUserProfile = ((data1) => {
    return request({
        method: "PATCH",
        url: "/mp/v1_0/user/profile",
        data: data1
    })
})