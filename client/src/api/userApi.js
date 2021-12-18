import axiosClient from "./axiosClient"

const userApi = {
    load: () => {
        return axiosClient.get('user/load')
    },

    login: (data) => {
        return axiosClient.post(`user/login`, data)
    },

    register: (data) => {
        return axiosClient.post(`user/register`, data )
    },

    changePass: (data) => {
        return axiosClient.post(`user/changePass`, data)
    },

    changeInfor: (data) => {
        return axiosClient.post(`user/changeInfor`, data)
    }
}

export default userApi