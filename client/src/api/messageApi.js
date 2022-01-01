import axiosClient from "./axiosClient"

const messageApi = {
    getAll: (params) => {
        return axiosClient.get('/message', { params })
    },

    get: (id) => {
        return axiosClient.get(`/message/${id}`)
    },

    add: (data) => {
        return axiosClient.post(`/message/store`, data )
    },

    edit: (id, data) => {
        return axiosClient.put(`/message/${id}`, data )
    },

    delete: (id) => {
        return axiosClient.delete(`/message/${id}`)
    },
}

export default messageApi